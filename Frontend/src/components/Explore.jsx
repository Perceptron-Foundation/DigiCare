import { Link } from 'react-router-dom';
import medicalImage from './images/docnew.jpeg';
import patientHistory from './images/Analysis.jpg';
import symptomCorrelation from './images/docnew.jpeg';
import confidenceScore from './images/Confidence.jpg';
import erpPortal from './images/Erp.jpg';
import multiLingualChat from './images/Chatbot.jpg';

const FeatureCard = ({ icon, text, link, desc }) => {
    return (
      <div id = 'explore' style={{ backgroundColor: 'white', padding: '20px', margin: '10px', textAlign: 'center', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', }}>
        <img src={icon} alt="Feature Icon" style={{ maxWidth: '100%', height: 'auto' }}/>
        <p id= 'name'>{text}</p>
        <p>{desc}</p>
        <Link to={link}>Explore</Link>
      </div>
    );
  };
  
  const Explore = () => {
    return (
      <section className="component" id = 'explore' style={{ backgroundColor: '#d1f0ed', padding: '20px'}}>
        <div style={{marginTop : '5%'}}>
        <h2>Explore the Features</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <FeatureCard icon={medicalImage} text="AI Image Analysis" desc = "Unlock insights from X-rays, MRIs, and more with the power of AI. Fast, accurate, and insightful." link= '/image-analysis' /> <FeatureCard icon={patientHistory} text="Smart History Scan" desc = "Weaving the story of your health. NLP extracts key insights from your patient history & symptoms." link= '/history' /> 
        <FeatureCard icon={symptomCorrelation} text="Symptom Matcher" desc = "Connecting the dots. Correlating image findings with your symptoms for a clearer picture." link= '/symptom-correlation' />
         <FeatureCard icon={confidenceScore} text="Diagnosis Confidence" desc = "Understand the 'why' behind our suggestions. Each diagnosis comes with a probability score & reasoning." link= '/confidence' />
          <FeatureCard icon={erpPortal} text="Patient & Doctor Portal" desc = "Seamless care, connected experience. Your central hub for appointments, records, and communication." link= '/portal' /> 
            <FeatureCard icon={multiLingualChat} text="Global Health Assistant" desc = "Your health ally in 17+ languages. Chatbot support that understands you, wherever you are." link= '/chatbot' />
        </div>
        </div>
      </section>
    );
  };

export default Explore;



