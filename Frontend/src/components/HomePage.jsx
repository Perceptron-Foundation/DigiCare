
import Description from './Description'
// import Book2 from './Book2'
import Explore from './Explore'
// import OurServicesSection from './OurServices'
// import MeetOurDoc from './MeetOurDoc'
 import AboutUsSection from './AboutUs'
 import ChatComponent from './ChatComponent'
 import AIAssistant from './AiAssistant'
// import PatientsSaySection from './PatientsSaySection'
 import Footer from './Footer'
import Navbar from './Navbar';

function HomePage() {
  return (
    // <>
        <div className="app-container">
            <div className='navbar'>
            <Navbar />
            </div>
            <div className='content'>
                <Description/>
                <Explore/>
                <AboutUsSection/>
                <Footer/>
                {/* <ChatComponent/> */}
                <AIAssistant/>
                {/* <Book2/>
                <Explore/>
                <OurServicesSection/>
                <MeetOurDoc/>
                <AboutUsSection/>
                <PatientsSaySection/>
                <Footer/> */}
            </div>
        </div>
    // </>
    
 
  );
}

export default HomePage