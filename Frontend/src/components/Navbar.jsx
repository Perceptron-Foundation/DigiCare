import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import PropTypes from 'prop-types';

const Navbar = ({ isLoggedIn, userEmail, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white fixed top-0 left-0 right-0 z-50 border-b border-gray-300 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-gray-900 hover:text-blue-500 transition duration-300">
          DigiCare
        </Link>

        {/* Hamburger Menu Button */}
        <button 
          className="lg:hidden text-gray-900 focus:outline-none" 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-6 text-gray-900 font-medium">
          <Link to="/" className="hover:text-blue-500 transition duration-300">Home</Link>
          <Link to="/explore" className="hover:text-blue-500 transition duration-300">Features</Link>
          <Link to="/about" className="hover:text-blue-500 transition duration-300">About Us</Link>
          <Link to="/Faq" className="hover:text-blue-500 transition duration-300">FAQs</Link>
          <Link to="/footer" className="hover:text-blue-500 transition duration-300">Contact Us</Link>
        </div>

        {/* Authentication Links */}
        <div className="hidden lg:flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <span className="text-gray-700">{userEmail}</span>
              <button
                onClick={onLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-4 py-2 text-gray-900 hover:text-blue-500 transition duration-300">Login</Link>
              <Link to="/register" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">Register</Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`lg:hidden fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMenuOpen(false)}
      ></div>

      <div 
        className={`lg:hidden fixed top-0 right-0 w-64 h-full bg-white shadow-lg transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button 
          className="absolute top-4 right-4 text-gray-900 focus:outline-none"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        >
          <FiX size={28} />
        </button>

        <div className="flex flex-col items-center space-y-6 pt-16">
          <Link to="/" className="text-gray-900 hover:text-blue-500 transition duration-300" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/explore" className="text-gray-900 hover:text-blue-500 transition duration-300" onClick={() => setMenuOpen(false)}>Features</Link>
          <Link to="/about" className="text-gray-900 hover:text-blue-500 transition duration-300" onClick={() => setMenuOpen(false)}>About Us</Link>
          <Link to="/Faq" className="text-gray-900 hover:text-blue-500 transition duration-300" onClick={() => setMenuOpen(false)}>FAQs</Link>
          <Link to="/footer" className="text-gray-900 hover:text-blue-500 transition duration-300" onClick={() => setMenuOpen(false)}>Contact Us</Link>

          {/* Auth Links */}
          <div className="flex flex-col space-y-4 pt-4">
            {isLoggedIn ? (
              <>
                <span className="text-gray-700 text-center">{userEmail}</span>
                <button
                  onClick={() => {
                    onLogout();
                    setMenuOpen(false);
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-900 hover:text-blue-500 transition duration-300" onClick={() => setMenuOpen(false)}>Login</Link>
                <Link to="/register" className="text-gray-900 hover:text-blue-500 transition duration-300" onClick={() => setMenuOpen(false)}>Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  userEmail: PropTypes.string,
  onLogout: PropTypes.func.isRequired
};

export default Navbar;
