import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";



const FileUpload = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [uploadedReports, setUploadedReports] = useState([]);

  // Handle file change
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Handle form submission
  const handleUpload = async (event) => {
    event.preventDefault();

    if (!file) {
      alert('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/api/upload_report', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert('File uploaded successfully!');
      fetchReports(); // Refresh uploaded files list
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Upload failed.');
    }
  };

  // Fetch uploaded reports from Cloudinary
  const fetchReports = async () => {
    try {
      const response = await axios.get('/api/get_reports');
      setUploadedReports(response.data);
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  // Fetch reports on component mount
  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center">Upload PDF in React</h2>
        <form onSubmit={handleUpload} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Submit
          </button>
        </form>
      </div>

      {/* Display uploaded reports */}
      <div className="mt-6 w-full max-w-lg">
        <h3 className="text-xl font-semibold mb-2">Uploaded Reports</h3>
        {uploadedReports.length > 0 ? (
          <ul className="space-y-2">
            {uploadedReports.map((report, index) => (
              <li key={index} className="bg-white shadow p-2 rounded flex justify-between items-center">
                <span>{report.name}</span>
                <a href={report.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                  View PDF
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No reports uploaded yet.</p>
        )}
      </div>
    
    </div>
  );
};

export default FileUpload;



// // // import React, { useState, useEffect } from 'react';
// // // import axios from 'axios';
// // // import { useNavigate } from "react-router-dom";
// // // import { useAuth0 } from "@auth0/auth0-react";

// // // const FileUpload = () => {
// // //   const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
// // //   const navigate = useNavigate();
// // //   const [title, setTitle] = useState('');
// // //   const [file, setFile] = useState(null);
// // //   const [uploadedReports, setUploadedReports] = useState([]);

// // //   useEffect(() => {
// // //     if (isAuthenticated) {
// // //       fetchReports();
// // //     }
// // //   }, [isAuthenticated]);

// // //   // Handle file selection
// // //   const handleFileChange = (event) => {
// // //     setFile(event.target.files[0]);
// // //   };

// // //   // Upload file
// // //   const handleUpload = async (event) => {
// // //     event.preventDefault();
// // //     if (!file) {
// // //       alert('Please select a file');
// // //       return;
// // //     }

// // //     const formData = new FormData();
// // //     formData.append('file', file);

// // //     try {
// // //       const token = await getAccessTokenSilently();
// // //       await axios.post('/api/upload_report', formData, {
// // //         headers: {
// // //           'Content-Type': 'multipart/form-data',
// // //           Authorization: `Bearer ${token}`,
// // //         },
// // //       });

// // //       alert('File uploaded successfully!');
// // //       fetchReports();
// // //     } catch (error) {
// // //       console.error('Error uploading file:', error);
// // //       alert('Upload failed.');
// // //     }
// // //   };

// // //   // Fetch reports
// // //   const fetchReports = async () => {
// // //     try {
// // //       const token = await getAccessTokenSilently();
// // //       const response = await axios.get('/api/get_reports', {
// // //         headers: { Authorization: `Bearer ${token}` },
// // //       });

// // //       setUploadedReports(response.data);
// // //     } catch (error) {
// // //       console.error('Error fetching reports:', error);
// // //     }
// // //   };

// // //   return (
// // //     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
// // //       <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
// // //         <h2 className="text-2xl font-semibold mb-4 text-center">Upload PDF</h2>
// // //         <form onSubmit={handleUpload} className="space-y-4">
// // //           <input type="file" accept=".pdf" onChange={handleFileChange} className="w-full p-2 border border-gray-300 rounded" />
// // //           <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
// // //             Upload
// // //           </button>
// // //         </form>
// // //       </div>

// // //       {/* Display Uploaded Reports */}
// // //       <div className="mt-6 w-full max-w-lg">
// // //         <h3 className="text-xl font-semibold mb-2">Your Reports</h3>
// // //         {uploadedReports.length > 0 ? (
// // //           <ul className="space-y-2">
// // //             {uploadedReports.map((report, index) => (
// // //               <li key={index} className="bg-white shadow p-2 rounded flex justify-between items-center">
// // //                 <span>{report.name}</span>
// // //                 <a href={report.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">View PDF</a>
// // //               </li>
// // //             ))}
// // //           </ul>
// // //         ) : <p>No reports uploaded yet.</p>}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default FileUpload;

// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { useAuth0 } from "@auth0/auth0-react"; // Import Auth0
// // import { useNavigate } from "react-router-dom";

// // const FileUpload = () => {
// //   const navigate = useNavigate();
// //   const { getAccessTokenSilently, isAuthenticated, loginWithRedirect } = useAuth0();
// //   const [title, setTitle] = useState('');
// //   const [file, setFile] = useState(null);
// //   const [uploadedReports, setUploadedReports] = useState([]);

// //   if (!isAuthenticated) {
// //     return (
// //       <div className="flex flex-col items-center justify-center min-h-screen">
// //         <h2>Please log in to upload and view reports.</h2>
// //         <button onClick={() => loginWithRedirect()} className="bg-blue-500 text-white px-4 py-2 rounded">
// //           Login
// //         </button>
// //       </div>
// //     );
// //   }

// //   // Handle file change
// //   const handleFileChange = (event) => {
// //     setFile(event.target.files[0]);
// //   };

// //   // Handle form submission
// //   const handleUpload = async (event) => {
// //     event.preventDefault();

// //     if (!file) {
// //       alert('Please select a file');
// //       return;
// //     }

// //     const formData = new FormData();
// //     formData.append('file', file);

// //     try {
// //       const token = await getAccessTokenSilently();
// //       const response = await axios.post('/api/upload_report', formData, {
// //         headers: { 
// //           'Content-Type': 'multipart/form-data',
// //           Authorization: `Bearer ${token}`
// //         },
// //       });

// //       alert('File uploaded successfully!');
// //       fetchReports();
// //     } catch (error) {
// //       console.error('Error uploading file:', error);
// //       alert('Upload failed.');
// //     }
// //   };

// //   // Fetch uploaded reports from Cloudinary
// //   const fetchReports = async () => {
// //     try {
// //       const token = await getAccessTokenSilently();
// //       const response = await axios.get('/api/get_reports', {
// //         headers: { Authorization: `Bearer ${token}` }
// //       });
// //       setUploadedReports(response.data);
// //     } catch (error) {
// //       console.error('Error fetching reports:', error);
// //     }
// //   };

// //   // Fetch reports on component mount
// //   useEffect(() => {
// //     fetchReports();
// //   }, []);

// //   return (
// //     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
// //       <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
// //         <h2 className="text-2xl font-semibold mb-4 text-center">Upload PDF</h2>
// //         <form onSubmit={handleUpload} className="space-y-4">
// //           <input
// //             type="file"
// //             accept=".pdf"
// //             onChange={handleFileChange}
// //             className="w-full p-2 border border-gray-300 rounded"
// //           />
// //           <button
// //             type="submit"
// //             className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
// //           >
// //             Upload
// //           </button>
// //         </form>
// //       </div>

// //       {/* Display uploaded reports */}
// //       <div className="mt-6 w-full max-w-lg">
// //         <h3 className="text-xl font-semibold mb-2">Your Reports</h3>
// //         {uploadedReports.length > 0 ? (
// //           <ul className="space-y-2">
// //             {uploadedReports.map((report, index) => (
// //               <li key={index} className="bg-white shadow p-2 rounded flex justify-between items-center">
// //                 <a href={report.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
// //                   {report.name}
// //                 </a>
// //               </li>
// //             ))}
// //           </ul>
// //         ) : (
// //           <p>No reports uploaded yet.</p>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default FileUpload;




// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useAuth0 } from "@auth0/auth0-react";
// const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

// const FileUpload = () => {
//   const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
//   const [file, setFile] = useState(null);
//   const [title, setTitle] = useState("");
//   const [uploadedReports, setUploadedReports] = useState([]);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [loading, setLoading] = useState(false);

  
//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const fetchReports = async () => {
//     try {
//       const token = await getAccessTokenSilently();
//       console.log("Token being sent:", token);
      
//       await axios.post(
//         "http://localhost:3000/upload_report",
//         { title, fileUrl, userEmail: user.email },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`, // Ensure this is included
//           },
//         }
//       );
      
  
//       console.log("Fetched Reports:", response.data);
//       setUploadedReports(response.data);
//     } catch (error) {
//       console.error(
//         "Error fetching reports:",
//         error.response ? error.response.data : error.message
//       );
//     }
//   };
  


  

//   const uploadFile = async (event) => {
//     event.preventDefault();
//     if (!file) {
//       setErrorMessage("Please select a file.");
//       return;
//     }
//     console.log("Uploading file:", file);
// if (!(file instanceof File || file instanceof Blob)) {
//   console.error("Invalid file type:", file);
//   return setErrorMessage("Invalid file type.");
// }


//     try {
//       setLoading(true);
      
//       const formData = new FormData();
// formData.append("file", file);
// formData.append("upload_preset", "DigiCare");

// // Log FormData contents
// for (let pair of formData.entries()) {
//   console.log(pair[0], pair[1]);
// }

// const response = await axios.post(
//   `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/raw/upload`, 
//   formData,
//   {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   }
// );

//       const fileUrl = response.data.secure_url;
//       console.log("Upload successful:", fileUrl);
      
//       // Save the file URL in your backend (optional)
//       const token = await getAccessTokenSilently();
//       console.log("Auth Token:", token);


//       await axios.post(
//         "http://localhost:3000/upload_report",
//         { title, fileUrl, userEmail: user.email }, // Adjust payload as needed
//         {
//           headers: {
//             Authorization: `Bearer ${token}`, // Auth header for backend API
//           },
//         }
//       );

//       setUploadedReports([...uploadedReports, { title, fileUrl }]);
//       setFile(null);
//       setTitle("");
//       setErrorMessage("");
//       fetchReports();
//     } catch (error) {
//       console.error("Error uploading file:", error);
//       setErrorMessage("Upload failed.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-100 rounded-lg shadow-lg max-w-md mx-auto">
//       <h2 className="text-xl font-semibold mb-4">Upload a Report</h2>
//       {isAuthenticated ? (
//         <>
//           <input
//             type="text"
//             placeholder="Enter report title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded mb-2"
//           />
//           <input
//             type="file"
//             onChange={handleFileChange}
//             className="w-full p-2 border border-gray-300 rounded mb-2"
//           />
//           <button
//             onClick={uploadFile}
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
//             disabled={loading}
//           >
//             {loading ? "Uploading..." : "Upload"}
//           </button>
//           {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}

//           <h3 className="text-lg font-semibold mt-6">Uploaded Reports</h3>
//           {loading ? (
//             <p>Loading reports...</p>
//           ) : uploadedReports.length > 0 ? (
//             <ul className="mt-2">
//               {uploadedReports.map((report, index) => (
//                 <li key={index} className="border p-2 rounded mt-2">
//                   {report.title || "Unnamed Report"} -{" "}
//                   <a href={report.fileUrl} target="_blank" rel="noopener noreferrer">
//                     View Report
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No reports uploaded yet.</p>
//           )}
//         </>
//       ) : (
//         <p>Please log in to upload and view reports.</p>
//       )}
//     </div>
//   );
// };

// export default FileUpload;


