import React from 'react';
import { Link } from 'react-router-dom';
import AboutUs2 from './images/docnew.jpeg';

const AboutUsSection = () => {
  return (
    <section className="component" id = 'about' style={{ backgroundColor: 'white', padding: '20px' }}>
      <div style={{ display: 'flex' , alignItems: 'center' , margin : 'auto'}}>
        <div style={{ flex: '1' }}>
          <img src={AboutUs2} alt="About Us" style={{ maxWidth: '80%', height: 'auto' }} />
        </div>
        <div style={{ flex: '1', marginLeft: '20px' }}>
          <h2>About Us</h2>
          <h3 className='text-blue-500'>    Revolutionizing Healthcare, One Patient at a Time</h3>
          <p>
      

At DigiCare, we're not just imagining the future of healthcare — we're building it. Fueled by innovation and a deep commitment to patient-first solutions, we’re transforming the way care is delivered. Our intelligent platform bridges the gap between technology and compassion, offering seamless, personalized healthcare experiences. With DigiCare, it’s not just about treatment — it’s about empowering healthier lives.          </p>
          <Link to="/about-us-details"><button>Know More</button></Link>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;