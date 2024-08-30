import React, { useState, useEffect } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import Logo from '../assets/Images/LogoNoBg.png'; // Make sure the path is correct
import './Styling/Buttons.css';
import VerifyEmail from './EmailVerify/VerifyEmail';
import axios from 'axios';
import { API_URL } from '../Functions/Constants';
const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem('token');
    if (user) {
      setIsLoggedIn(true);
    }
  }, [navigate]);

  

  return (
    <nav className="bg-white text-gray-800 shadow-lg fixed w-full z-10 top-0 ">
      <div className="container flex items-center justify-between py-4 px-6">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold animate__animated animate__fadeIn animate__delay-2s text-clip bg-gradient-to-tr from-[#495bff] to-[#ff006e] bg-clip-text text-transparent mr-4 cursor-pointer">
            <span className="font-greatvibes ml-2">
              J
            </span>
            ob
            <span className=' font-greatvibes'>
              S
            </span>
            culpt
          </h1>

          <div className="space-x-10 text-lg flex items-center">
            <Link
              to="/"
              className="relative group hover:text-[#9000ff] nav-text font-"
            >
              Hire
            </Link>
            <Link
              to="/about"
              className="relative group hover:text-[#9000ff] nav-text font-"
            >
              About
            </Link>
            <Link
              to="/FindJobs"
              className="relative group hover:text-[#9000ff] nav-text font-"
            >
              Find Jobs
            </Link>
            <Link
              to="/contact"
              className="relative group hover:text-[#9000ff] nav-text font-"
            >
              Contact
            </Link>
          </div>
        </div>

        <div>
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="login">
                Login
              </Link>
              <Link to="/signup" className="signup">
                Signup
              </Link>
            </>
          ) : (
            <Link to="/profile" className="profile">
              Profile
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;