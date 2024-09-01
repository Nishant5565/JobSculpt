import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className=" bg-aesthetic-black text-white py-8">
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
          <Link to="/" className="hover:text-yellow-500 transition duration-300 animate__animated animate__fadeIn animate__delay-3s">Home</Link>
          <Link to="/about" className="hover:text-yellow-500 transition duration-300 animate__animated animate__fadeIn animate__delay-4s">About</Link>
          <Link to="/services" className="hover:text-yellow-500 transition duration-300 animate__animated animate__fadeIn animate__delay-5s">Services</Link>
          <Link to="/contact" className="hover:text-yellow-500 transition duration-300 animate__animated animate__fadeIn animate__delay-6s">Contact</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
