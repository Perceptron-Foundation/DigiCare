import React from 'react';
import docnew from './images/docnew.jpeg';

const Description = () => {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center text-white bg-cover bg-center"
      id="description"
      style={{ backgroundImage: `url(${docnew})` }}
    >
      {/* Semi-Transparent Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30"></div>

      <div className="relative z-10 text-center px-6">
        <h1 className="text-5xl sm:text-6xl font-bold leading-tight mb-4">
          From Symptoms to Solutions— <br className="hidden sm:block" />
          <span className="text-indigo-400">DigiCare Got You Covered!</span>
        </h1>
        <p className="text-lg sm:text-xl max-w-2xl mx-auto font-medium">
          An AI-powered diagnostic assistant designed to help healthcare professionals make 
          faster, more accurate diagnoses. Analyze medical images, patient data, and symptoms 
          with unparalleled efficiency.
        </p>
      </div>
    </section>
  );
};

export default Description;
