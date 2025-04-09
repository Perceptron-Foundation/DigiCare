import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PatientRegistration = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

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

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: e.target.multiple ? Array.from(files) : files[0]
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto p-8 bg-white shadow-2xl rounded-3xl mt-10 space-y-8">
      <h2 className="text-4xl font-extrabold text-center text-blue-800 mb-8 tracking-tight">Patient Registration</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-blue-50 p-6 rounded-2xl shadow-md">
        {/* Personal Info */}
        <div>
          <label className="block mb-2 text-sm font-semibold">Full Name</label>
          <input type="text" name="name" value={formData.name || ''} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-300" required />
        </div>
        <div>
          <label className="block mb-2 text-sm font-semibold">Email</label>
          <input type="email" name="email" value={formData.email || ''} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-300" required />
        </div>
        <div>
          <label className="block mb-2 text-sm font-semibold">Phone Number</label>
          <input type="tel" name="phone" value={formData.phone || ''} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-300" required />
        </div>
        <div>
          <label className="block mb-2 text-sm font-semibold">Date of Birth</label>
          <input type="date" name="dob" value={formData.dob || ''} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-300" required />
        </div>
        <div>
          <label className="block mb-2 text-sm font-semibold">Gender</label>
          <select name="gender" value={formData.gender || ''} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-300" required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label className="block mb-2 text-sm font-semibold">Blood Group</label>
          <select name="bloodGroup" value={formData.bloodGroup || ''} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-300" required>
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
          <label className="block mb-2 text-sm font-semibold">Address</label>
          <input type="text" name="address" value={formData.address || ''} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-300" required />
        </div>

        {/* Medical Info */}
        <div className="md:col-span-2">
          <label className="block mb-2 text-sm font-semibold">Medical History</label>
          <textarea name="medicalHistory" value={formData.medicalHistory || ''} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-300" rows="4" required></textarea>
        </div>
        <div className="md:col-span-2">
          <label className="block mb-2 text-sm font-semibold">Current Medications</label>
          <textarea name="currentMedications" value={formData.currentMedications || ''} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-300" rows="3" required></textarea>
        </div>
        <div className="md:col-span-2">
  <label className="block mb-2 text-sm font-semibold">Family Medical History</label>
  <textarea
    name="familyHistory"
    value={formData.familyHistory || ''}
    onChange={handleChange}
    className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-300"
    rows="4"
    placeholder="E.g., Father has diabetes, grandmother had hypertension..."
    required
  ></textarea>
</div>


        {/* Documents */}
        <div className="md:col-span-2">
          <label className="block mb-2 text-sm font-semibold">Upload Reports (PDFs)</label>
          <input type="file" name="documents" onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-300" multiple accept="application/pdf" required />
        </div>
      </div>

      <div className="flex justify-center pt-8">
        <button type="submit" className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-transform duration-300 shadow-xl transform hover:scale-105">
          Submit
        </button>
      </div>
    </form>
  );
};

export default PatientRegistration;
