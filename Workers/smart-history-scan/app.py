import cloudinary
import cloudinary.api
import cloudinary.uploader
import streamlit as st
import requests
import pdfplumber
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings, GoogleGenerativeAI
from langchain_community.vectorstores import Chroma
from langchain.document_loaders import TextLoader
from langchain.prompts import PromptTemplate
from langchain.chains import ConversationalRetrievalChain
from langchain.memory import ConversationBufferMemory
from langchain.chains import LLMChain
import os
import uuid 

api_key = st.secrets["GEMINI_API_KEY"]
if not api_key:
    st.error("Gemini API key not found. Please set the GEMINI_API_KEY environment variable.")
    st.stop()




cloudinary.config( 
  cloud_name = os.getenv('CLOUDINARY_CLOUD_NAME'), 
  api_key = os.getenv('CLOUDINARY_API_KEY'), 
  api_secret = os.getenv('CLOUDINARY_API_SECRET') 
)


CUSTOM_PROMPT_TEMPLATE = """You are an AI assistant that answers queries based on the given documents only. 
Here are some details:
- Be concise and informative.
- Stick strictly to the given documents.
- Avoid making up information.

Chat History:
{chat_history}

Question:
{question}

Answer:
"""
custom_prompt = PromptTemplate(
    input_variables=["chat_history", "question"], 
    template=CUSTOM_PROMPT_TEMPLATE
)

def list_pdfs_in_folder(folder_name):
    """Fetch all PDF URLs from a Cloudinary folder."""
    # resources = cloudinary.api.resources(type="upload", prefix=folder_name, resource_type="raw")
    # return [res["secure_url"] for res in resources.get("resources", [])]
    try:
        resources = cloudinary.api.resources(type="upload", prefix=folder_name, resource_type="raw")
        pdf_urls = [res["secure_url"] for res in resources.get("resources", [])]
        if not pdf_urls:
            st.error("No PDFs found in the given Cloudinary folder.")
        return pdf_urls
    except Exception as e:
        st.error(f"Error fetching PDFs: {str(e)}")
        return []

def extract_text_from_pdf(pdf_url):
    """Download PDF from URL and extract text."""
    response = requests.get(pdf_url)
    if response.status_code == 200:
        temp_filename = f"temp_{uuid.uuid4().hex}.pdf"
        with open(temp_filename, "wb") as f:
            f.write(response.content)
        with pdfplumber.open(temp_filename) as pdf:
            text = "\n".join([page.extract_text() for page in pdf.pages if page.extract_text()])
            os.remove(temp_filename)
        return text
    return ""



def process_documents(pdf_urls):
    """Extracts text, stores embeddings, and initializes RAG."""
    texts = [extract_text_from_pdf(url) for url in pdf_urls]
    combined_text = "\n".join(texts)

    splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
    docs = splitter.create_documents([combined_text])

    embeddings = GoogleGenerativeAIEmbeddings(model="models/text-embedding-004")
    persist_directory = "./chroma_db" 
    vectorstore = Chroma.from_documents(docs, embeddings, persist_directory=persist_directory)

    retriever = vectorstore.as_retriever()
    memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)

    llm = GoogleGenerativeAI(model="gemini-pro")
    qa_chain = ConversationalRetrievalChain.from_llm(
        retriever=retriever,
        memory=memory,
        llm=llm
    )
    # qa_chain.combine_docs_chain.llm_chain.prompt = custom_prompt

    return qa_chain


st.title("Smart History Scan")

folder = st.text_input("Enter Cloudinary Folder Name:")
if st.button("Load Documents"):
    pdf_urls = list_pdfs_in_folder(folder)
    st.write(f"Loaded {len(pdf_urls)} PDFs")
    qa_chain = process_documents(pdf_urls)
    st.session_state["qa_chain"] = qa_chain

if "qa_chain" in st.session_state:
    query = st.text_input("Ask something about the documents:")
    if query:
        response = st.session_state["qa_chain"]({"question": query})
        st.write(response["answer"])