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
          <h2>HealthFirst : Your one-stop healthcare solution!</h2>
          <p>At HealthFirst, we're dedicated to providing comprehensive healthcare solutions. From uploading your medical images for real-time disease predictions to having a chat with our friendly chatbots for general or sexual health queries or to book an appointment with a doctor, we do it all.</p>
          <Link to="/appointments"><button>Book Now</button></Link>
        </div>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap'}}>
          <img src={docnew} alt="Doctor Image" style={{maxwidth : '100%', width : '680px'}} />
        </div> 
      </div>
    </section>
  ); 
};

export default Description;


