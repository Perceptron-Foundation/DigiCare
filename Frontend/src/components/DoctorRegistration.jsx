import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DoctorRegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    dob: "",
    email: "",
    phone: "",
    profilePhoto: null,
    clinicAddress: "",
    city: "",
    state: "",
    country: "",
    availableHours: "",
    registrationNumber: "",
    specialization: "",
    experience: "",
    degrees: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Check user type on component mount
  useEffect(() => {
    const userType = localStorage.getItem('userType');
    if (userType !== 'doctor') {
      navigate('/');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
    // Clear any previous errors when user makes changes
    setError(null);
  };

  const validateForm = () => {
    // Basic validation
    if (!formData.fullName || !formData.email || !formData.phone || !formData.registrationNumber) {
      setError("Please fill in all required fields");
      return false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }

    // Phone validation (basic)
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!phoneRegex.test(formData.phone)) {
      setError("Please enter a valid phone number");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        if (formData[key] !== null) {
          formDataToSend.append(key, formData[key]);
          console.log(`Adding to FormData - ${key}:`, formData[key]);
        }
      }

      // Log the actual FormData entries
      console.log('FormData entries:');
      for (const pair of formDataToSend.entries()) {
        console.log(pair[0] + ':', pair[1]);
      }

      const response = await fetch('http://localhost:5000/api/doctors/register', {
        method: 'POST',
        body: formDataToSend
      });

      console.log('Response status:', response.status);
      const responseText = await response.text();
      console.log('Raw response:', responseText);

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('JSON Parse Error:', parseError);
        throw new Error('Invalid response from server');
      }

      if (!response.ok) {
        throw new Error(data.error || 'Failed to register doctor');
      }

      // Show success message
      alert('Registration successful! Redirecting to dashboard...');
      navigate('/doctor-dashboard');
    } catch (error) {
      console.error('Error:', error);
      setError(error.message || 'There was an error submitting the form. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-[#f4f8ff] rounded-2xl shadow-md mt-10 mb-10">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">Doctor Registration</h2>
      
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block font-semibold mb-1">Full Name</label>
          <input
            type="text"
            name="fullName"
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Email</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Phone Number</label>
          <input
            type="tel"
            name="phone"
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Date of Birth</label>
          <input
            type="date"
            name="dob"
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Gender</label>
          <select
            name="gender"
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1">Profile Photo</label>
          <input
            type="file"
            name="profilePhoto"
            accept="image/*"
            onChange={handleChange}
            className="w-full p-2 rounded-lg border border-gray-300 bg-white"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block font-semibold mb-1">Clinic/Hospital Address</label>
          <input
            type="text"
            name="clinicAddress"
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">City</label>
          <input
            type="text"
            name="city"
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">State</label>
          <input
            type="text"
            name="state"
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Country</label>
          <input
            type="text"
            name="country"
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Available Hours</label>
          <input
            type="text"
            name="availableHours"
            placeholder="e.g., 10AM - 5PM"
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Medical Reg. Number</label>
          <input
            type="text"
            name="registrationNumber"
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Specialization</label>
          <input
            type="text"
            name="specialization"
            onChange={handleChange}
            required
            placeholder="e.g., Cardiologist"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Experience (years)</label>
          <input
            type="number"
            name="experience"
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Degrees</label>
          <input
            type="text"
            name="degrees"
            onChange={handleChange}
            placeholder="e.g., MBBS, MD"
            required
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          />
        </div>

        <div className="md:col-span-2 flex justify-center mt-6">
          <button
            type="submit"
            disabled={isLoading}
            className={`${
              isLoading 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white font-semibold py-3 px-8 rounded-full shadow-sm transition duration-300 flex items-center`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Registering...
              </>
            ) : (
              'Register'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DoctorRegistrationForm;
