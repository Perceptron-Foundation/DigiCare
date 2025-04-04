import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();
  const [userType, setUserType] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    // Patient specific fields
    bloodGroup: '',
    familyHistory: '',
    priorMedications: '',
    // Doctor specific fields
    qualifications: '',
    specialization: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!isAuthenticated) {
//       navigate('/');
//     }
//   }, [isAuthenticated, navigate]);

  const handleUserTypeSelect = (type) => {
    setUserType(type);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = await getAccessTokenSilently();
      
      // Prepare data based on user type
      const userData = {
        userId: user.sub,
        userType,
        ...formData
      };

      // Send data to backend
      const response = await axios.post('/api/user-profile', userData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log('Profile saved:', response.data);
      setIsSubmitted(true);
      
      // Redirect based on user type
      if (userType === 'doctor') {
        navigate('/doctor-dashboard');
      } else {
        navigate('/patient-dashboard');
      }
    } catch (err) {
      console.error('Error saving profile:', err);
      setError('Failed to save profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

//   if (!isAuthenticated) {
//     return <div>Please log in to access the dashboard.</div>;
//   }

//   if (isSubmitted) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
//         <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//           <h2 className="text-2xl font-bold mb-4 text-center text-green-600">Profile Saved Successfully!</h2>
//           <p className="text-center mb-4">Redirecting you to your dashboard...</p>
//         </div>
//       </div>
//     );
//   }

  return (
    <div className="pt-16 flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Welcome to DigiCare</h2>
        
        {!userType ? (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-center mb-6">Select your user type</h3>
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => handleUserTypeSelect('patient')}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
              >
                I am a Patient
              </button>
              <button
                onClick={() => handleUserTypeSelect('doctor')}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
              >
                I am a Doctor
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-xl font-semibold text-center mb-6">
              {userType === 'patient' ? 'Patient Information' : 'Doctor Information'}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              {userType === 'patient' ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
                    <select
                      name="bloodGroup"
                      value={formData.bloodGroup}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Blood Group</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Family History</label>
                    <textarea
                      name="familyHistory"
                      value={formData.familyHistory}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Prior Medications</label>
                    <textarea
                      name="priorMedications"
                      value={formData.priorMedications}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Qualifications</label>
                    <input
                      type="text"
                      name="qualifications"
                      value={formData.qualifications}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                    <input
                      type="text"
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </>
              )}
            </div>
            
            {error && (
              <div className="text-red-500 text-sm mt-2">{error}</div>
            )}
            
            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setUserType('')}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg transition duration-300"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Submit'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Dashboard;