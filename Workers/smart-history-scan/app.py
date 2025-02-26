import cloudinary
import cloudinary.api
import cloudinary.uploader
import streamlit as st
import requests
import pdfplumber
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings, GoogleGenerativeAI
from langchain_community.vectorstores import Chroma
from langchain_community.document_loaders import TextLoader
from langchain.prompts import PromptTemplate
from langchain.chains import ConversationalRetrievalChain
from langchain.memory import ConversationBufferMemory
from langchain.chains import LLMChain
import os
import uuid 
from dotenv import load_dotenv
import time
import base64
load_dotenv()




api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    st.error("Gemini API key not found. Please set the GEMINI_API_KEY environment variable.")
    st.stop()




cloudinary.config( 
  cloud_name = os.getenv('CLOUDINARY_CLOUD_NAME'), 
  api_key = os.getenv('CLOUDINARY_API_KEY'), 
  api_secret = os.getenv('CLOUDINARY_API_SECRET') 
)


CUSTOM_PROMPT_TEMPLATE = """You are an AI medical assistant that answers queries based on the given documents and relevant medical knowledge. 
Here are some guidelines:
- Prioritize information from the provided documents but supplement with general medical knowledge when necessary.
- Ensure accuracy, citing sources from the document where applicable.
- Provide confidence scoring based on probability and reasoning.
- Be concise, informative, and avoid speculation.

Chat History:
{chat_history}

Question:
{question}

Answer:
- **Response:** {answer}
- **Confidence Score:** {probability_score} (based on available document references and medical reasoning)
- **Reasoning:** {reasoning} (explain why this answer is correct and any potential limitations)
"""

custom_prompt = PromptTemplate(
    input_variables=["chat_history", "question"], 
    template=CUSTOM_PROMPT_TEMPLATE
)

def generate_signed_pdf_url(public_id, expiration=3600):
    """Generate a signed URL for a private Cloudinary PDF."""
    expires_at = int(time.time()) + expiration  # Expiration timestamp

    signed_url, options = cloudinary.utils.cloudinary_url(
        public_id,
        resource_type="raw",
        sign_url=True,
        expires_at=expires_at
    )

    print(f" Generated Signed URL: {signed_url}")
    print(f" Expiration Time: {expires_at} (Unix Timestamp)")
    print(f" Signing Options: {options}")

    return signed_url

def list_pdfs_in_folder(folder_name):
    """Fetch signed URLs of PDFs from Cloudinary using API authentication."""
    try:
        response = cloudinary.api.resources(
            type="upload",
            prefix=folder_name,
            resource_type="raw",
            max_results=10
        )

        pdf_urls = [
            generate_signed_pdf_url(res["public_id"]) for res in response.get("resources", [])
        ]

        print(pdf_urls)
        return pdf_urls
    except cloudinary.exceptions.Error as e:
        print(f"Cloudinary API Error: {e}")
        return []

# def extract_text_from_pdf(pdf_url):
#     """Download PDF from a signed URL & extract text securely."""
#     try:
#         response = requests.get(pdf_url, stream=True, timeout=10)

#         if response.status_code != 200:
#             st.error(f" Failed to download PDF: {pdf_url} (Status Code: {response.status_code})")
#             return ""

#         temp_filename = f"temp_{uuid.uuid4().hex}.pdf"
#         try:
#             with open(temp_filename, "wb") as f:
#                 for chunk in response.iter_content(chunk_size=1024):
#                     f.write(chunk)

#             with pdfplumber.open(temp_filename) as pdf:
#                 text = "\n".join([page.extract_text() or "" for page in pdf.pages])

#             if not text.strip():
#                 st.warning(f"⚠️ Warning: No text extracted from {pdf_url}. Check if it's a scanned PDF.")
#                 return ""

#             return text
#         finally:
#             os.remove(temp_filename)
#     except requests.exceptions.RequestException as e:
#         st.error(f"⚠️ Network error while downloading {pdf_url}: {str(e)}")
#     except Exception as e:
#         st.error(f" Unexpected error processing {pdf_url}: {str(e)}")
#     return ""
def extract_text_from_pdf(pdf_path):
    """
    Extracts text from a locally stored PDF file using pdfplumber.

    :param pdf_path: Path to the PDF file.
    :return: Extracted text as a string.
    """
    extracted_text = ""
    try:
        with pdfplumber.open(pdf_path) as pdf:
            for page in pdf.pages:
                extracted_text += page.extract_text() + "\n"
    except Exception as e:
        print(f"Error extracting text: {e}")
        return None
    
    return extracted_text.strip()
 

def process_documents():
    """Extract text, generate embeddings, and initialize RAG with error handling."""
    try:
        # texts = [extract_text_from_pdf(url) for url in pdf_urls]
        # texts = [t for t in texts if t.strip()]  # Filter out empty texts
        pdf_file_path = "./Report-test.pdf"
        texts = extract_text_from_pdf(pdf_file_path)
        if not texts:
            st.error(" No valid text extracted from any PDF. Cannot proceed.")
            return None
        
        combined_text = "\n".join(texts)

        # Split documents into chunks
        splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
        docs = splitter.create_documents([combined_text])

        # Generate embeddings
        embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001", google_api_key=api_key)
        persist_directory = "./chroma_db"
        vectorstore = Chroma.from_documents(docs, embeddings, persist_directory=persist_directory)

        retriever = vectorstore.as_retriever()
        memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)

        llm = GoogleGenerativeAI(model="models/gemini-2.0-flash", google_api_key=api_key)

        # RAG Chain
        qa_chain = ConversationalRetrievalChain.from_llm(
            retriever=retriever,
            memory=memory,
            llm=llm
        )

        return qa_chain

    except ValueError as e:
        st.error(f"⚠️ Embedding error: {str(e)}. Ensure documents are not empty.")
    except Exception as e:
        st.error(f" Error in processing documents: {str(e)}")
    return None

def main():
    st.set_page_config(page_title="Smart History Scan", layout="wide")
    st.title("📜 Smart History Scan")
    st.write("Load and analyze documents from a specified folder.")
    
    st.markdown(
        """
        <style>
            .input-box {
                background-color: #f8f9fa;
                padding: 15px;
                border-radius: 10px;
                border: 1px solid #ddd;
                box-shadow: 2px 2px 10px rgba(0,0,0,0.1);
                margin-bottom: 20px;
            }
            .stButton>button {
                background-color: #4CAF50;
                color: white;
                border-radius: 5px;
                padding: 10px 24px;
            }
        </style>
        """, unsafe_allow_html=True)
    
    folder = st.text_input("📂 Enter Folder Name:")
    
    if st.button("📄 Load Documents"):
        # pdf_urls = list_pdfs_in_folder(folder)

        # if not pdf_urls:
        #     st.error("❌ No PDFs found in the specified folder.")
        #     return

        # st.success(f"✅ Loaded {len(pdf_urls)} PDFs successfully!")
        # qa_chain = process_documents(pdf_urls)
        qa_chain = process_documents()

        if qa_chain:
            st.session_state["qa_chain"] = qa_chain
        else:
            st.error("❌ Failed to initialize document processing. Please check logs.")

    if "qa_chain" in st.session_state:
        st.markdown('<div class="input-box">', unsafe_allow_html=True)
        query = st.text_input("🔍 Ask something about the documents:")
        st.markdown('</div>', unsafe_allow_html=True)

        if query:
            try:
                response = st.session_state["qa_chain"]({"question": query})
                st.subheader("📝 Response:")
                st.write(response.get("answer", "⚠️ No valid response generated."))
            except Exception as e:
                st.error(f"❌ Error querying documents: {str(e)}")

if __name__ == "__main__":
    main()