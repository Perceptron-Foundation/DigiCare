
import Description from './Description'
import Explore from './Explore'
 import AboutUsSection from './AboutUs'
 import ChatComponent from './ChatComponent'
 import Footer from './Footer'
import Navbar from './Navbar';
import FAQ from './Faq.jsx';


function HomePage() {
  return (
    // <>
        <div className="app-container">
            
            <div className='content'>
                <Description/>
                <Explore/>
                <AboutUsSection/>
                <FAQ/>
                <Footer/>
                
               
              
            </div>
        </div>
    // </>
    
 
  );
}

export default HomePage