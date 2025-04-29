import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from '../../Pages/ThemeContext';

const Footer = () => {
  const { theme } = useContext(ThemeContext);
  const backgroundColor = theme === 'light' ? 'bg-white' : 'bg-gray-900';
  const textColor = theme === 'light' ? 'text-gray-800' : 'text-white';
  const linkHoverColor = theme === 'light' ? 'hover:text-red-500' : 'hover:text-teal-500';

  
  return (
    <footer className={`${backgroundColor} ${textColor} py-8 rounded-t-lg shadow-lg transition-all duration-300`}>
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6">
        {/* Company Info */}
        <div className="text-center md:text-left mb-6 md:mb-0">
          <h1 className="text-3xl font-bold mb-2 animate__animated animate__fadeIn animate__delay-1s">JobSculpt</h1>
          <p className="text-sm mb-4 animate__animated animate__fadeIn animate__delay-2s">
            Crafting careers and building teams with precision and passion.
          </p>
          <p className="text-xs">© {new Date().getFullYear()} JobSculpt. All rights reserved.</p>
        </div>

        {/* Navigation Links */}
        <div className="text-center md:text-right space-y-2 md:space-y-0 md:space-x-6 md:flex md:items-center">
          <Link to="/" className={`transition duration-300 animate__animated animate__fadeIn animate__delay-3s ${linkHoverColor}`}>Home</Link>
          <Link to="/about" className={`transition duration-300 animate__animated animate__fadeIn animate__delay-4s ${linkHoverColor}`}>About</Link>
          <Link to="/services" className={`transition duration-300 animate__animated animate__fadeIn animate__delay-5s ${linkHoverColor}`}>Services</Link>
          <Link to="/contact" className={`transition duration-300 animate__animated animate__fadeIn animate__delay-6s ${linkHoverColor}`}>Contact</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
