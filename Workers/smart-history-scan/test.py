# import google.generativeai as genai
# import os
# from dotenv import load_dotenv

# load_dotenv()
# api_key = os.getenv("GEMINI_API_KEY")
# genai.configure(api_key=api_key)

# models = genai.list_models()
# for model in models:
#     print(model)

import cloudinary

cloudinary.config( 
  cloud_name="",  
  api_key="",  
  api_secret=""  
)

print(cloudinary.config())  # Check if credentials are set properly
import cloudinary.api

# import cloudinary.uploader

# response = cloudinary.uploader.upload(
#     "Report-test.pdf", folder="patient_reports", resource_type="raw"
# )
# print(" Uploaded:", response["secure_url"])

def list_pdfs_in_folder(folder_name):
    try:
        resources = cloudinary.api.resources(type="upload", prefix=folder_name, resource_type="raw")
        pdf_urls = [res["secure_url"] for res in resources.get("resources", [])]

        if not pdf_urls:
            print("⚠️ No PDFs found in the Cloudinary folder.")
        else:
            print(f" {len(pdf_urls)} PDFs found:")
            for url in pdf_urls:
                print(url)
        
        return pdf_urls
    except Exception as e:
        print(f" Error fetching PDFs: {str(e)}")
        return []

folder_name = "patient_reports"  # Replace with actual folder name
pdfs = list_pdfs_in_folder(folder_name)
# import cloudinary.utils

# signed_url = cloudinary.utils.cloudinary_url(
#     "patient_reports/qzok4qkfak1ac1lstwv2.pdf",
#     resource_type="raw",
#     sign_url=True
# )

# print(signed_url)
import cloudinary.api

response = cloudinary.api.resource("patient_reports/qzok4qkfak1ac1lstwv2.pdf", resource_type="raw")
print(response)