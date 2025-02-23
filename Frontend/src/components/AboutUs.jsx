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
          <p>
          Learn more about HealthFirst and our vision for the future of healthcare. As pioneers in the field of digital health, we are driven by a passion for innovation, accessibility, and patient-centered care. Our platform represents a paradigm shift in healthcare delivery, offering a holistic approach that prioritizes the individual needs of each patient.
          </p>
          <Link to="/about-us-details"><button>Know More</button></Link>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;