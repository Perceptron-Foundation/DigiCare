import React from 'react';
import { Link } from 'react-router-dom';
import docnew from './images/docnew.jpeg';
// import Appointment from './Appointment'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Route

const Description = () => {
  return (
    <section className="component" id='description' style={{ backgroundColor: '#d1f0ed' }}>
     <div className="flex flex-col items-center justify-center text-center flex-grow px-6">
         
          <h1 className="text-5xl font-bold leading-tight mb-4">
          From Symptoms to Solutions-<br />
         DigiCare Got You Covered!
        </h1>
        <p className="text-gray-400 max-w-xl mb-6">
                    An AI-powered diagnostic assistant designed to help healthcare professionals make faster,more accurate diagnosis.Analyze medical images ,patient data and symptoms with unparalleled efficiency.</p>
                 <Link to="/appointments"><button>Book Now</button></Link>
        </div>
        {/* <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap'}}>
          <img src={docnew} alt="Doctor Image" style={{maxwidth : '100%', width : '680px'}} />
        </div>  */}
     
    </section>
  ); 
};

export default Description;


