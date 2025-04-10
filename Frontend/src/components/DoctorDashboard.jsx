// import { useState, useEffect } from 'react';
// import { useAuth0 } from "@auth0/auth0-react";
// import axios from 'axios';

// const DoctorDashboard = () => {
//   const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
//   const [patients, setPatients] = useState([]);
//   const [selectedPatient, setSelectedPatient] = useState(null);
//   const [patientReports, setPatientReports] = useState([]);
//   const [prescriptionFile, setPrescriptionFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Dummy patient data
//   const dummyPatients = [
//     {
//       id: 1,
//       name: "John Smith",
//       age: 45,
//       gender: "Male",
//       lastVisit: "2024-03-15"
//     },
//     {
//       id: 2,
//       name: "Sarah Johnson",
//       age: 32,
//       gender: "Female",
//       lastVisit: "2024-03-14"
//     },
//     {
//       id: 3,
//       name: "Michael Brown",
//       age: 58,
//       gender: "Male",
//       lastVisit: "2024-03-13"
//     },
//     {
//       id: 4,
//       name: "Emily Davis",
//       age: 29,
//       gender: "Female",
//       lastVisit: "2024-03-12"
//     },
//     {
//       id: 5,
//       name: "David Wilson",
//       age: 41,
//       gender: "Male",
//       lastVisit: "2024-03-11"
//     }
//   ];

//   // Dummy reports data
//   const dummyReports = {
//     1: [
//       {
//         id: 1,
//         title: "Blood Test Report",
//         uploadDate: "2024-03-15",
//         url: "https://example.com/report1.pdf"
//       },
//       {
//         id: 2,
//         title: "X-Ray Results",
//         uploadDate: "2024-03-10",
//         url: "https://example.com/report2.pdf"
//       }
//     ],
//     2: [
//       {
//         id: 3,
//         title: "MRI Scan Report",
//         uploadDate: "2024-03-14",
//         url: "https://example.com/report3.pdf"
//       }
//     ],
//     3: [
//       {
//         id: 4,
//         title: "ECG Report",
//         uploadDate: "2024-03-13",
//         url: "https://example.com/report4.pdf"
//       },
//       {
//         id: 5,
//         title: "Blood Pressure Readings",
//         uploadDate: "2024-03-12",
//         url: "https://example.com/report5.pdf"
//       }
//     ],
//     4: [
//       {
//         id: 6,
//         title: "Ultrasound Report",
//         uploadDate: "2024-03-12",
//         url: "https://example.com/report6.pdf"
//       }
//     ],
//     5: [
//       {
//         id: 7,
//         title: "CT Scan Results",
//         uploadDate: "2024-03-11",
//         url: "https://example.com/report7.pdf"
//       }
//     ]
//   };

//   useEffect(() => {
//     setPatients(dummyPatients);
//   }, []);

//   const handlePatientSelect = async (patient) => {
//     setSelectedPatient(patient);
//     setPatientReports(dummyReports[patient.id] || []);
//   };

//   const handlePrescriptionUpload = async (event) => {
//     event.preventDefault();
//     if (!prescriptionFile || !selectedPatient) {
//       setError('Please select a patient and prescription file');
//       return;
//     }

//     setLoading(true);
//     try {
//       // Simulate API call delay
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       // Add new prescription to dummy reports
//       const newPrescription = {
//         id: Date.now(),
//         title: prescriptionFile.name,
//         uploadDate: new Date().toISOString(),
//         url: URL.createObjectURL(prescriptionFile)
//       };

//       setPatientReports(prev => [...prev, newPrescription]);
//       setPrescriptionFile(null);
//       setError(null);
//     } catch (error) {
//       console.error('Error uploading prescription:', error);
//       setError('Failed to upload prescription');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // if (!isAuthenticated) {
//   //   return (
//   //     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//   //       <div className="text-center">
//   //         <h2 className="text-2xl font-bold text-gray-800 mb-4">Please log in to access the dashboard</h2>
//   //       </div>
//   //     </div>
//   //   );
//   // }

//   return (
//     <div className="min-h-screen bg-gray-100 pt-24 pb-6">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
//           <h1 className="text-2xl font-bold text-gray-800 mb-4">Doctor Dashboard</h1>
//           <p className="text-gray-600">Welcome, Dr. {user?.name}</p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           <div className="bg-white rounded-lg shadow-lg p-4">
//             <h2 className="text-sm font-semibold text-gray-800 mb-3">Patients</h2>
//             <div className="space-y-1.5">
//               {patients.map((patient) => (
//                 <div
//                   key={patient.id}
//                   className={`p-2 rounded-lg cursor-pointer transition-colors ${
//                     selectedPatient?.id === patient.id
//                       ? 'bg-blue-100 border-blue-500'
//                       : 'bg-gray-50 hover:bg-gray-100'
//                   }`}
//                   onClick={() => handlePatientSelect(patient)}
//                 >
//                   <div className="text-xs text-gray-600">
//                     <p className="font-bold text-gray-800">{patient.name}</p>
//                     <p>Age: {patient.age}</p>
//                     <p>Gender: {patient.gender}</p>
//                     <p>Last Visit: {new Date(patient.lastVisit).toLocaleDateString()}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="bg-white rounded-lg shadow-lg p-6 lg:col-span-2">
//             {selectedPatient ? (
//               <>
//                 <div className="flex justify-between items-center mb-4">
//                   <h2 className="text-lg font-semibold text-gray-800">
//                     Reports for {selectedPatient.name}
//                   </h2>
//                   <div className="flex items-center space-x-2">
//                     <input
//                       type="file"
//                       accept=".pdf"
//                       onChange={(e) => setPrescriptionFile(e.target.files[0])}
//                       className="hidden"
//                       id="prescription-upload"
//                     />
//                     <label
//                       htmlFor="prescription-upload"
//                       className="bg-blue-500 text-white px-3 py-1.5 text-sm rounded-lg cursor-pointer hover:bg-blue-600 transition-colors"
//                     >
//                       Upload Prescription
//                     </label>
//                     {prescriptionFile && (
//                       <button
//                         onClick={handlePrescriptionUpload}
//                         disabled={loading}
//                         className="bg-green-500 text-white px-3 py-1.5 text-sm rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
//                       >
//                         {loading ? 'Uploading...' : 'Save'}
//                       </button>
//                     )}
//                   </div>
//                 </div>

//                 <div className="space-y-3">
//                   {patientReports.map((report, index) => (
//                     <div
//                       key={index}
//                       className="border rounded-lg p-3 hover:shadow-md transition-shadow"
//                     >
//                       <div className="flex justify-between items-center">
//                         <div>
//                           <p className="text-sm font-small text-gray-800">{report.title}</p>
//                           <p className="text-xs text-gray-600">
//                             {new Date(report.uploadDate).toLocaleDateString()}
//                           </p>
//                         </div>
//                         <a
//                           href={report.url}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-blue-500 hover:text-blue-600 text-sm"
//                         >
//                           View Report
//                         </a>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </>
//             ) : (
//               <div className="text-center text-gray-600 text-sm">
//                 Select a patient to view their reports
//               </div>
//             )}
//           </div>
//         </div>

//         {error && (
//           <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
//             {error}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DoctorDashboard;

import React, { useState } from 'react';

// Sample patient data
const patients = [
  {
    id: 1,
    name: 'Ananya Verma',
    age: 28,
    gender: 'Female',
    lastVisit: '2025-03-30',
  },
  {
    id: 2,
    name: 'Rohan Mehta',
    age: 45,
    gender: 'Male',
    lastVisit: '2025-04-02',
  },
  {
    id: 3,
    name: 'Priya Sharma',
    age: 33,
    gender: 'Female',
    lastVisit: '2025-03-25',
  },
];

const DoctorDashboard = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
  };

  return (
    <div className="flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white min-h-screen p-6">
        <h1 className="text-2xl font-bold mb-10">🩺 DigiCare</h1>
        <nav className="space-y-4">
          <a href="#" className="block px-3 py-2 rounded hover:bg-gray-700 transition">Dashboard</a>
          <a href="#" className="block px-3 py-2 rounded hover:bg-gray-700 transition">Patients</a>
          <a href="#" className="block px-3 py-2 rounded hover:bg-gray-700 transition">Reports</a>
          <a href="#" className="block px-3 py-2 rounded hover:bg-gray-700 transition">Appointments</a>
          <a href="#" className="block px-3 py-2 rounded hover:bg-gray-700 transition">Settings</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-8 overflow-y-auto">
        {/* Feature Highlight */}
        <section className="bg-blue-100 p-6 rounded-xl mb-8 shadow-md">
          <h2 className="text-xl font-bold text-gray-800">✨ New Feature: AI Image Analysis</h2>
          <p className="text-gray-700 mt-1">
            Upload X-rays or scans and get AI-powered insights for faster diagnosis.
          </p>
          <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
            Try Now
          </button>
        </section>

        {/* Patient Cards */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Recent Patients</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {patients.map((patient) => (
              <div
                key={patient.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl p-5 transition cursor-pointer border border-gray-200"
                onClick={() => handlePatientSelect(patient)}
              >
                <h3 className="text-lg font-semibold text-gray-900">{patient.name}</h3>
                <p className="text-gray-600">Age: {patient.age}</p>
                <p className="text-gray-600">Gender: {patient.gender}</p>
                <p className="text-gray-600">
                  Last Visit: {new Date(patient.lastVisit).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Selected Patient Details */}
        {selectedPatient && (
          <section className="mt-10 bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h2 className="text-xl font-bold mb-4 text-gray-800">🧾 Patient Details</h2>
            <p><strong>Name:</strong> {selectedPatient.name}</p>
            <p><strong>Age:</strong> {selectedPatient.age}</p>
            <p><strong>Gender:</strong> {selectedPatient.gender}</p>
            <p><strong>Last Visit:</strong> {new Date(selectedPatient.lastVisit).toLocaleDateString()}</p>
            {/* Add more patient info here if needed */}
          </section>
        )}
      </main>
    </div>
  );
};

export default DoctorDashboard;
