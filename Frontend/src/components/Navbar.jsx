// Navbar.jsx
import { Link } from 'react-router-dom';
// import icon from './images/logo.png';

const Navbar = () => {
  return (
    <div>
      <nav style={{ backgroundColor: 'white', padding: '10px', paddingLeft: '20px', paddingRight: '20px', position: 'fixed', top: 0, left: 0, right: 0, zIndex: '1', borderBottom: '1px solid #182c44' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
          {/* <img src={icon} alt="icon" style={{ marginRight: '10px', height: '30px', width: '30px', paddingBottom : '0'}} /> */}
            <Link className = 'a1'to="/" style={{ color: 'black' }}>DigiCare</Link>
          </div>
          <div style={{ color: 'black', display: 'flex', gap: '20px', flexWrap: 'wrap', marginRight: '20px' }}>
            <a className = 'a1' href="#description">Home</a>
            <a className = 'a1' href="#book">Appointment</a>
            <a className = 'a1' href="#explore">Explore</a>
            <a className = 'a1' href="#services">Our Services</a>
            <a className = 'a1' href="#doc">Meet Our Doc</a>
            <a className = 'a1' href="#about">About Us</a>
            <a className = 'a1' href="#footer"> Contact Us </a>

          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;