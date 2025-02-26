import streamlit as st
import google.generativeai as genai
from PIL import Image
import PyPDF2
import tempfile
import os
from google.api_core import exceptions
from dotenv import load_dotenv
import time

load_dotenv()



api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    st.error("Gemini API key not found. Please set the GEMINI_API_KEY environment variable.")
    st.stop()

genai.configure(api_key=api_key)
model = genai.GenerativeModel('gemini-1.5-flash')

MAX_RETRIES = 3
RETRY_DELAY = 2  # seconds

def analyze_medical_report(content, content_type):
    prompt = """You are an AI medical assistant that answers queries based on the given context and relevant medical knowledge. 
Here are some guidelines:
- Prioritize information from the provided documents but supplement with general medical knowledge when necessary.
- Ensure accuracy, citing sources from the document where applicable.
- Provide confidence scoring based on probability and reasoning.
- Be concise, informative, and avoid speculation.
YOU WILL ANALYSE ONLY MEDICAL DATA, if other CONTEXT is PASSED you will say "Provide Relevant Medical Data. Thanks"
Answer:
- **Response:** 
- **Confidence Score:** (based on available document references and medical reasoning)
- **Reasoning:** (explain why this answer is correct and any potential limitations)
"""
    
    for attempt in range(MAX_RETRIES):
        try:
            if content_type == "image":
                response = model.generate_content([prompt, content])
            else:  # text
                # Gemini 1.5 Flash can handle larger inputs, so we'll send the full text
                response = model.generate_content(f"{prompt}\n\n{content}")
            
            return response.text
        except exceptions.GoogleAPIError as e:
            if attempt < MAX_RETRIES - 1:
                st.warning(f"An error occurred. Retrying in {RETRY_DELAY} seconds... (Attempt {attempt + 1}/{MAX_RETRIES})")
                time.sleep(RETRY_DELAY)
            else:
                st.error(f"Failed to analyze the report after {MAX_RETRIES} attempts. Error: {str(e)}")
                return fallback_analysis(content, content_type)

def fallback_analysis(content, content_type):
    st.warning("Using fallback analysis method due to API issues.")
    if content_type == "image":
        return "Unable to analyze the image due to API issues. Please try again later or consult a medical professional for accurate interpretation."
    else:  # text
        word_count = len(content.split())
        return f"""
        Fallback Analysis:
        1. Document Type: Text-based medical report
        2. Word Count: Approximately {word_count} words
        3. Content: The document appears to contain medical information, but detailed analysis is unavailable due to technical issues.
        4. Recommendation: Please review the document manually or consult with a healthcare professional for accurate interpretation.
        5. Note: This is a simplified analysis due to temporary unavailability of the AI service. For a comprehensive analysis, please try again later.
        """

def extract_text_from_pdf(pdf_file):
    pdf_reader = PyPDF2.PdfReader(pdf_file)
    text = ""
    for page in pdf_reader.pages:
        text += page.extract_text()
    return text

def main():
    st.set_page_config(page_title="AI Medical Report Analyzer", layout="wide")
    st.title("🩺 AI-driven Medical Report Analyzer")
    st.write("Upload a medical report (Image/PDF) for AI-powered analysis.")
    
    st.markdown(
        """
        <style>
            .upload-box {
                background-color: #f8f9fa;
                padding: 20px;
                border-radius: 10px;
                border: 1px solid #ddd;
                box-shadow: 2px 2px 10px rgba(0,0,0,0.1);
                text-align: center;
                margin-bottom: 20px;
            }
            .stButton>button {
                background-color: #4CAF50;
                color: white;
                border-radius: 5px;
                padding: 10px 24px;
            }
            .stSpinner {
                color: #FF5733;
            }
        </style>
        """, unsafe_allow_html=True)
    
    file_type = st.radio("Select file type:", ("Image", "PDF"))
    st.markdown('<div class="upload-box">', unsafe_allow_html=True)
    
    if file_type == "Image":
        uploaded_file = st.file_uploader("Choose a medical report image", type=["jpg", "jpeg", "png"], key="image")
        st.markdown('</div>', unsafe_allow_html=True)
        
        if uploaded_file is not None:
            image = Image.open(uploaded_file)
            st.image(image, caption="Uploaded Medical Report", use_column_width=True)
            
            if st.button("🔍 Analyze Image Report"):
                with st.spinner("Analyzing the medical report image..."):
                    analysis = analyze_medical_report(image, "image")
                st.subheader("📊 Analysis Results:")
                st.write(analysis)
    
    else:
        uploaded_file = st.file_uploader("Choose a medical report PDF", type=["pdf"], key="pdf")
        st.markdown('</div>', unsafe_allow_html=True)
        
        if uploaded_file is not None:
            with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as tmp_file:
                tmp_file.write(uploaded_file.getvalue())
                tmp_file_path = tmp_file.name
            
            with open(tmp_file_path, 'rb') as pdf_file:
                pdf_text = extract_text_from_pdf(pdf_file)
            
            st.subheader("📄 Extracted Text Preview:")
            st.text_area("Extracted Report Text", pdf_text[:1000] + "...", height=200, disabled=True)
            
            if st.button("🔍 Analyze PDF Report"):
                with st.spinner("Analyzing the medical report PDF..."):
                    analysis = analyze_medical_report(pdf_text, "text")
                st.subheader("📊 Analysis Results:")
                st.write(analysis)
            
            os.unlink(tmp_file_path)
    
if __name__ == "__main__":
    main()