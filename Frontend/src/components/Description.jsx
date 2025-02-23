import React from 'react';
import { Link } from 'react-router-dom';
import docnew from './images/docnew.jpeg';
// import Appointment from './Appointment'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Route

const Description = () => {
  return (
    <section className="component" id='description' style={{ backgroundColor: '#d1f0ed' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div style={{textAlign : 'left', marginLeft : '2%', display: 'flex', gap: '20px', flexWrap: 'wrap' , marginRight : '2%'}}>
          <div className='flex items-center justify-center'><h2>From Symptons to Solutions-</h2></div>
          <h2>DigiCare Got You Covered!</h2>
          <p> An AI-powered diagnostic assistant designed to help healthcare professionals make faster,more accurate diagnosis.Analyze medical images ,patient data and symptoms with unparalleled efficiency.</p>
          <Link to="/appointments"><button>Book Now</button></Link>
        </div>
        {/* <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap'}}>
          <img src={docnew} alt="Doctor Image" style={{maxwidth : '100%', width : '680px'}} />
        </div>  */}
      </div>
    </section>
  ); 
};

export default Description;


