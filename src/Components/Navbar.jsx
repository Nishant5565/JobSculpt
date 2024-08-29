import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/Images/LogoNoBg.png'; // Make sure the path is correct
import './Styling/Buttons.css';

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white shadow-lg fixed w-full z-10 top-0">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <div className="flex items-center">
          <img
            src={Logo}
            alt="Company Logo"
            className="w-12 h-12 mr-3 animate__animated animate__fadeIn animate__delay-1s"
          />
          <h1 className="text-2xl font-bold animate__animated animate__fadeIn animate__delay-2s">
            JobSculpt
          </h1>
        </div>

        <div className="space-x-14 text-lg">
          <Link
            to="/"
            className="relative group hover:text-[#ff6a00] transition duration-300"
          >
            Home
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#ff6a00] scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </Link>
          <Link
            to="/about"
            className="relative group hover:text-[#ff6a00] transition duration-300"
          >
            About
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#ff6a00] scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </Link>
          <Link
            to="/FindJobs"
            className="relative group hover:text-[#ff6a00] transition duration-300"
          >
               Find Jobs
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#ff6a00] scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </Link>
          <Link
            to="/contact"
            className="relative group hover:text-[#ff6a00] transition duration-300"
          >
            Contact
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#ff6a00] scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </Link>

          <Link class="blob-btn">
               Login
               <span class="blob-btn__inner">
                    <span class="blob-btn__blobs">
                    <span class="blob-btn__blob"></span>
                    <span class="blob-btn__blob"></span>
                    <span class="blob-btn__blob"></span>
                    <span class="blob-btn__blob"></span>
                    </span>
               </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;