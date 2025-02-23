

const Footer = () => {
    return (
      <footer id ='footer' style={{ backgroundColor: '#182c44', color: '#fff', padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <h4>DigiCare</h4>
            <hr style={{ backgroundColor: '#fff', margin: '10px 0' }} />
            <a className = 'a2' href="#">Facebook</a> <br />
            <a className = 'a2' href="#">Twitter</a> <br />
            <a className = 'a2' href="#">Instagram</a> <br />
          </div>
          <div>
            <h4>Quick Links</h4>
            <hr style={{ backgroundColor: '#fff', margin: '10px 0' }} />
            <a className = 'a2'  href="#description">Home</a> <br />
            <a className = 'a2'  href="#explore">Explore</a> <br />
            <a className = 'a2'  href="#services">Our Services</a> <br />
            <a className = 'a2'  href="#book">Appointment</a> <br />
          </div>
          <div>
            <h4>Our Services</h4>
            <hr style={{ backgroundColor: '#fff', margin: '10px 0' }} />
            <a className = 'a2'  href="#services">AI Image Analysis</a> <br />
            <a className = 'a2'  href="#services">Smart History Scan</a> <br />
            <a className = 'a2'  href="#services">Disease Prediction</a> <br />
            <a className = 'a2'  href="#services">ChatBots</a> <br />
          </div>
          <div>
            <h4>Contact Us</h4>
            <hr style={{ backgroundColor: '#fff', margin: '10px 0' }} />
            <p>Phone: 999999999</p>
            <p>Email: mehak.ec.22@nitj.ac.in</p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;