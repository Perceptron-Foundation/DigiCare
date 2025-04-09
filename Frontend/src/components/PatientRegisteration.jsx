import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PatientRegistration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    age: "",
    maritalStatus: "",
    gender: "",
    bloodGroup: "",
    address: "",
    profileImage: null,
    medicalHistory: "",
    currentMedications: "",
    familyHistory: "",
    documents: []
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({
        ...formData,
        [name]: e.target.multiple ? Array.from(files) : files[0]
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        if (Array.isArray(formData[key])) {
          formData[key].forEach((file) => formDataToSend.append(key, file));
        } else {
          formDataToSend.append(key, formData[key]);
        }
      }

      const response = await fetch('/api/patients/register', {
        method: 'POST',
        body: formDataToSend
      });

      if (!response.ok) throw new Error('Failed to register patient');

      const data = await response.json();
      console.log('Patient registered:', data);
      navigate('/patient-dashboard');
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error submitting the form. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-[#f4f8ff] rounded-2xl shadow-md mt-10 mb-10">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">Patient Registration</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block font-semibold mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name || ''}
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
            value={formData.email || ''}
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
            value={formData.phone || ''}
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
            value={formData.dob || ''}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age || ''}
            onChange={handleChange}
            min={0}
            required
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Marital Status</label>
          <select
            name="maritalStatus"
            value={formData.maritalStatus || ''}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          >
            <option value="">Select Marital Status</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Divorced">Divorced</option>
            <option value="Widowed">Widowed</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1">Gender</label>
          <select
            name="gender"
            value={formData.gender || ''}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1">Blood Group</label>
          <select
            name="bloodGroup"
            value={formData.bloodGroup || ''}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
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

        <div className="md:col-span-2">
          <label className="block font-semibold mb-1">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address || ''}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block font-semibold mb-1">Upload Profile Image</label>
          <input
            type="file"
            name="profileImage"
            onChange={handleChange}
            accept="image/*"
            required
            className="w-full p-2 rounded-lg border border-gray-300 bg-white"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block font-semibold mb-1">Medical History</label>
          <textarea
            name="medicalHistory"
            value={formData.medicalHistory || ''}
            onChange={handleChange}
            rows="4"
            required
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          ></textarea>
        </div>

        <div className="md:col-span-2">
          <label className="block font-semibold mb-1">Current Medications</label>
          <textarea
            name="currentMedications"
            value={formData.currentMedications || ''}
            onChange={handleChange}
            rows="3"
            required
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          ></textarea>
        </div>

        <div className="md:col-span-2">
          <label className="block font-semibold mb-1">Family Medical History</label>
          <textarea
            name="familyHistory"
            value={formData.familyHistory || ''}
            onChange={handleChange}
            rows="4"
            placeholder="E.g., Father has diabetes, grandmother had hypertension..."
            required
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          ></textarea>
        </div>

        <div className="md:col-span-2">
          <label className="block font-semibold mb-1">Upload Reports (PDFs)</label>
          <input
            type="file"
            name="documents"
            onChange={handleChange}
            multiple
            accept="application/pdf"
            required
            className="w-full p-2 rounded-lg border border-gray-300 bg-white"
          />
        </div>

        <div className="md:col-span-2 flex justify-center mt-6">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-sm transition duration-300"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientRegistration;