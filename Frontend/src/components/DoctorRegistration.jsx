import React, { useState } from "react";

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

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-[#f4f8ff] rounded-2xl shadow-md mt-10 mb-10">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">Doctor Registration</h2>
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
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-sm transition duration-300"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default DoctorRegistrationForm;
