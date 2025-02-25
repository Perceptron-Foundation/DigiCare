import React from 'react';
import { Link } from 'react-router-dom';
import docnew from './images/docnew.jpeg';
// import Appointment from './Appointment'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Route

const Description = () => {
  return (
    <section className="relative component bg-cover bg-center text-white" id='description'>
  <div className="absolute inset-0 bg-cover bg-center opacity-90" style={{ backgroundImage: `url(${docnew})` }}></div>
  <div className="flex flex-col items-center justify-center text-center flex-grow px-6 min-h-screen relative z-10">
    <h1 className="text-6xl font-bold leading-tight mb-4 text-black">
      From Symptoms to Solutions-<br />
      DigiCare Got You Covered!
    </h1>
    <p className="text-white font-semibold text-lg max-w-xl mb-6">
      An AI-powered diagnostic assistant designed to help healthcare professionals make faster, more accurate diagnoses. Analyze medical images, patient data, and symptoms with unparalleled efficiency.
    </p>
  </div>
</section>

  ); 
};

export default Description;


