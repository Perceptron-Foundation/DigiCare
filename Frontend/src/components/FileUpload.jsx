import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import Footer from "./Footer"

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

const FileUpload = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [uploadedReports, setUploadedReports] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // ✅ Fetch Reports
//   const fetchReports = async () => {
//     if (!isAuthenticated) return;

//     try {
//       const token = await getAccessTokenSilently();
//       console.log("Fetching reports with Token:", token);

//       const response = await axios.get("http://localhost:3000/get_reports", {
//         headers: {
//           Authorization: `Bearer ${token}`, // ✅ Secure API request
//         },
//       });

//       console.log("Fetched Reports:", response.data);
//       setUploadedReports(response.data);
//     } catch (error) {
//       console.error("Error fetching reports:", error.response ? error.response.data : error.message);
//     }
//   };
const fetchReports = async () => {
    if (!isAuthenticated) return;
  
    try {
      const token = await getAccessTokenSilently();
      console.log("Fetched Auth0 Token:", token); // ✅ Log token for debugging
  
      if (!token) {
        console.error("❌ Token is missing!");
        return;
      }
      
      const response = await axios.get("http://localhost:3000/get_reports", {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Secure API request
        },
      });
  
      console.log("Fetched Reports:", response.data);
      setUploadedReports(response.data);
    } catch (error) {
      console.error("❌ Error fetching reports:", error.response ? error.response.data : error.message);
    }
  };
  

  useEffect(() => {
    fetchReports();
  }, [isAuthenticated]);

  // ✅ Upload File to Cloudinary & Save URL in Backend
  const uploadFile = async (event) => {
    event.preventDefault();
    if (!file) {
      setErrorMessage("Please select a file.");
      return;
    }
    console.log("Uploading file:", file);

    if (!(file instanceof File || file instanceof Blob)) {
      console.error("Invalid file type:", file);
      return setErrorMessage("Invalid file type.");
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "DigiCare");

      const cloudinaryResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/raw/upload`, 
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const fileUrl = cloudinaryResponse.data.secure_url;
      console.log("Upload successful:", fileUrl);

      // ✅ Save file URL to backend
      const token = await getAccessTokenSilently();
      await axios.post(
        "http://localhost:3000/upload_report",
        { title, fileUrl, userEmail: user.email },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUploadedReports([...uploadedReports, { title, fileUrl }]);
      setFile(null);
      setTitle("");
      setErrorMessage("");
      fetchReports();
    } catch (error) {
      console.error("Error uploading file:", error);
      setErrorMessage("Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="p-6 py-24 bg-gray-100 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Upload a Report</h2>
      {isAuthenticated ? (
        <>
          <input
            type="text"
            placeholder="Enter report title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />
          <button
            onClick={uploadFile}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
          {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}

          <h3 className="text-lg font-semibold mt-6">Uploaded Reports</h3>
          {uploadedReports.length > 0 ? (
            <ul className="mt-2">
              {uploadedReports.map((report, index) => (
                <li key={index} className="border p-2 rounded mt-2">
                  {report.title || "Unnamed Report"} -{" "}
                  <a href={report.fileUrl} target="_blank" rel="noopener noreferrer">View Report</a>
                </li>
              ))}
            </ul>
          ) : (
            <p>No reports uploaded yet.</p>
          )}
        </>
      ) : (
        <p>Please log in to upload and view reports.</p>
      )}
    
    </div>
    <Footer/>
    </>
  );
};

export default FileUpload;
