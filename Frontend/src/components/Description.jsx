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

// import React from 'react';
// import { Link } from 'react-router-dom';
// import docnew from './images/docnew.jpeg';

// const Description = () => {
//   return (
//     <section className="component" id='description' style={{ backgroundColor: '#d1f0ed' }}>
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
//         <div style={{ textAlign: 'left', marginLeft: '2%', display: 'flex', gap: '20px', flexWrap: 'wrap', marginRight: '2%' }}>
//           <h2>Multimodal Diagnostic Assistant: Revolutionizing Healthcare</h2>
//           <p>
//             Welcome to our cutting-edge healthcare platform, where advanced technology meets genuine care.
//             We are building a <strong>Multimodal Diagnostic Assistant</strong> that empowers healthcare professionals
//             and patients alike. Our solution not only stores and manages patient reports and family history through
//             an intuitive ERP portal but also leverages AI to analyze medical images like chest, knee, brain X-rays,
//             and ECGs, providing instant and accurate health predictions.
//           </p>
//           <p>
//             But we don’t stop there! Our platform integrates an <strong>Ayurvedic chatbot</strong> that offers first-hand
//             natural remedies based on your health data, bridging the gap between modern diagnostics and traditional care.
//           </p>
//           <p>
//             Our vision is to create a holistic healthcare ecosystem that simplifies diagnostics, enhances doctor-patient
//             interactions, and promotes well-being.
//           </p>
//           <Link to="/appointments"><button>Get Started</button></Link>
//         </div>
//         <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap'}}>
//           <img src={docnew} alt="Healthcare Innovation" style={{ maxWidth: '100%', width: '680px' }} />
//         </div> 
//       </div>
//     </section>
//   );
// };

// export default Description;
