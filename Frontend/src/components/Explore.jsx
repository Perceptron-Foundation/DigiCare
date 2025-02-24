import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import medicalImage from './images/docnew.jpeg';
import patientHistory from './images/Analysis.jpg';
import symptomCorrelation from './images/docnew.jpeg';
import confidenceScore from './images/Confidence.jpg';
import erpPortal from './images/Erp.jpg';
import multiLingualChat from './images/Chatbot.jpg';

const FeatureCard = ({ icon, text, link, desc }) => {
  return (
    <div style={{ backgroundColor: 'white', padding: '20px', margin: '10px', textAlign: 'center', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', width: '250px', height: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <img src={icon} alt="Feature Icon" style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '5px' }} />
      <div>
        <p style={{ fontWeight: 'bold', margin: '10px 0' }}>{text}</p>
        <p>{desc}</p>
      </div>
      <Link to={link}>Explore</Link>
    </div>
  );
};

const Explore = () => {
  const features = [
    { icon: medicalImage, text: "AI Image Analysis", desc: "Unlock insights from X-rays, MRIs, and more with the power of AI. Fast, accurate, and insightful.", link: '/image-analysis' },
    { icon: patientHistory, text: "Smart History Scan", desc: "Weaving the story of your health. NLP extracts key insights from your patient history & symptoms.", link: '/history' },
    { icon: symptomCorrelation, text: "Symptom Matcher", desc: "Connecting the dots. Correlating image findings with your symptoms for a clearer picture.", link: '/symptom-correlation' },
    { icon: confidenceScore, text: "Diagnosis Confidence", desc: "Understand the 'why' behind our suggestions. Each diagnosis comes with a probability score & reasoning.", link: '/confidence' },
    { icon: erpPortal, text: "Patient & Doctor Portal", desc: "Seamless care, connected experience. Your central hub for appointments, records, and communication.", link: '/portal' },
    { icon: multiLingualChat, text: "Global Health Assistant", desc: "Your health ally in 17+ languages. Chatbot support that understands you, wherever you are.", link: '/chatbot' }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? features.length - 3 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= features.length - 3 ? 0 : prev + 1));
  };

  return (
    <section className="component" id='explore' style={{ backgroundColor: '#d1f0ed', padding: '20px' }}>
      <div style={{ marginTop: '5%' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Explore the Features</h2>
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <FaChevronLeft onClick={prevSlide} style={{ cursor: 'pointer', fontSize: '2rem', position: 'absolute', left: '10px' }} />
          <div style={{ display: 'flex', overflow: 'hidden', width: '820px' }}>
            {features.slice(currentIndex, currentIndex + 3).map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
          <FaChevronRight onClick={nextSlide} style={{ cursor: 'pointer', fontSize: '2rem', position: 'absolute', right: '10px' }} />
        </div>
      </div>
    </section>
  );
};

export default Explore;
