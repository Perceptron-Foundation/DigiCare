import { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';

const PatientDashboard = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [patientData, setPatientData] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatientData = async () => {
      if (!isAuthenticated || !user) return;
      
      try {
        setLoading(true);
        const token = await getAccessTokenSilently();
        
        // Fetch patient profile
        const profileResponse = await axios.get(`/api/patient-profile/${user.sub}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        setPatientData(profileResponse.data);
        
        // Fetch appointments
        const appointmentsResponse = await axios.get(`/api/appointments/${user.sub}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        setAppointments(appointmentsResponse.data);
      } catch (err) {
        console.error('Error fetching patient data:', err);
        setError('Failed to load your profile. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPatientData();
  }, [isAuthenticated, user, getAccessTokenSilently]);

  if (!isAuthenticated) {
    return <div>Please log in to access your dashboard.</div>;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Patient Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Patient Profile Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Your Profile</h2>
          
          {patientData ? (
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="font-medium">Name:</span>
                <span>{patientData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Age:</span>
                <span>{patientData.age}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Blood Group:</span>
                <span>{patientData.bloodGroup}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Family History:</span>
                <span>{patientData.familyHistory}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Prior Medications:</span>
                <span>{patientData.priorMedications}</span>
              </div>
              
              <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                Edit Profile
              </button>
            </div>
          ) : (
            <p>No profile data available. Please complete your profile.</p>
          )}
        </div>
        
        {/* Appointments Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Your Appointments</h2>
          
          {appointments.length > 0 ? (
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="border-b pb-4">
                  <div className="flex justify-between">
                    <span className="font-medium">Doctor:</span>
                    <span>{appointment.doctorName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Date:</span>
                    <span>{new Date(appointment.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Time:</span>
                    <span>{appointment.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Status:</span>
                    <span className={`px-2 py-1 rounded text-sm ${
                      appointment.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 
                      appointment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {appointment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No appointments scheduled.</p>
          )}
          
          <button className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
            Book New Appointment
          </button>
        </div>
      </div>
      
      {/* Medical Records Section */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Medical Records</h2>
        <p>Your medical records and test results will appear here.</p>
        <button className="mt-4 bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded">
          View Medical Records
        </button>
      </div>
    </div>
  );
};

export default PatientDashboard; 