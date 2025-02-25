import { Link } from 'react-router-dom';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi'; // Import icons for menu toggle

const Navbar = () => {
  const { isAuthenticated } = useAuth0();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white fixed top-0 left-0 right-0 z-50 border-b border-gray-300 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-gray-900">DigiCare</Link>

        {/* Hamburger Menu Button - Visible only on small screens */}
        <button className="lg:hidden text-gray-900" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-6 text-gray-900 font-medium">
          <a href="#description" className="hover:text-blue-500">Home</a>
          <a href="#book" className="hover:text-blue-500">Appointment</a>
          <a href="#explore" className="hover:text-blue-500">Explore</a>
          <a href="#services" className="hover:text-blue-500">Our Services</a>
          <a href="#about" className="hover:text-blue-500">About Us</a>
          <a href="#footer" className="hover:text-blue-500">Contact Us</a>
        </div>

        {/* Auth Buttons */}
        <div className="hidden lg:block">
          {!isAuthenticated ? <LoginButton /> : <LogoutButton />}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-md">
          <div className="flex flex-col items-center space-y-4 py-4">
            <a href="#description" className="text-gray-900 hover:text-blue-500" onClick={() => setMenuOpen(false)}>Home</a>
            <a href="#book" className="text-gray-900 hover:text-blue-500" onClick={() => setMenuOpen(false)}>Appointment</a>
            <a href="#explore" className="text-gray-900 hover:text-blue-500" onClick={() => setMenuOpen(false)}>Explore</a>
            <a href="#services" className="text-gray-900 hover:text-blue-500" onClick={() => setMenuOpen(false)}>Our Services</a>
            <a href="#about" className="text-gray-900 hover:text-blue-500" onClick={() => setMenuOpen(false)}>About Us</a>
            <a href="#footer" className="text-gray-900 hover:text-blue-500" onClick={() => setMenuOpen(false)}>Contact Us</a>
            <div className="pt-2">
              {!isAuthenticated ? <LoginButton /> : <LogoutButton />}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
