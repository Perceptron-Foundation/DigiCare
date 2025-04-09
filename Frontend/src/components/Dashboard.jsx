import { useNavigate } from "react-router-dom";
import { User, Stethoscope } from "lucide-react";

export default function UserTypeSelection() {
  const navigate = useNavigate();

  const handleUserTypeSelection = (type) => {
    // Store user type in localStorage for persistence
    localStorage.setItem('userType', type);
    
    // Redirect based on user type
    if (type === 'patient') {
      navigate("/patient-registration");
    } else if (type === 'doctor') {
      navigate("/doctor-registration");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full text-center transition-all duration-500">
        <h1 className="text-3xl sm:text-4xl font-bold text-violet-700 mb-10">
          Welcome to DigiCare
        </h1>

        <div className="space-y-5">
          <button
            onClick={() => handleUserTypeSelection('patient')}
            className="w-full flex items-center justify-center gap-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-5 rounded-xl transition-transform transform hover:scale-105 shadow-md text-lg"
          >
            <User className="w-5 h-5" />
            I am a Patient
          </button>

          <button
            onClick={() => handleUserTypeSelection('doctor')}
            className="w-full flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-5 rounded-xl transition-transform transform hover:scale-105 shadow-md text-lg"
          >
            <Stethoscope className="w-5 h-5" />
            I am a Doctor
          </button>
        </div>
      </div>
    </div>
  );
}

