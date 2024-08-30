import React, { useState, useEffect } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import Logo from '../../assets/Images/LogoNoBg.png'; // Make sure the path is correct
import '../Styling/Buttons.css';
import VerifyEmail from '../EmailVerify/VerifyEmail';
import axios from 'axios';
import { API_URL } from '../../Functions/Constants';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import './Navbar.css';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [device , setDevice] = useState("Desktop");
  const [hamburger, setHamburger] = useState(false);
  const navigate = useNavigate();
  const [isOpened, setIsOpened] = useState(false);

  const handleClick = () => {
    setIsOpened(!isOpened);
  };
  useEffect(() => {
    const user = localStorage.getItem('token');
    if (user) {
      setIsLoggedIn(true);
    }
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  useEffect(() => {
    if (window.innerWidth < 900) {
      setDevice("Mobile");
    }
  }, []);

  const handleHamburger = () => {
    setHamburger(!hamburger);
  };


    // To check whether the token is valid or not 

  return (
    device== "Desktop" ? (
      <nav className="bg-white text-gray-800 shadow-md fixed w-full z-10 top-0 ">
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
            <>
            <Link className="login" onClick = {() => logout()} >
              Logot 
            </Link>
            <Link to="/profile" className="signup">
              Profile
            </Link>
            </>
          )}
        </div>
      </div>
    </nav>
    ):(
     <> 

{/* Hamburger */}

      <button
        className={`menu z-50 fixed right-0 ${isOpened ? 'opened' : ''}`}
        onClick={handleClick}
        aria-expanded={isOpened}
        aria-label="Main Menu"
        style={{ display: 'block', margin: '20px auto' }} // Ensure the button is visible
      >
        <svg width="50" height="50" viewBox="0 0 100 100">
          <path
            className="line line1"
            d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
          />
          <path className="line line2" d="M 20,50 H 80" />
          <path
            className="line line3"
            d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
          />
        </svg>
      </button>
    <nav className={`bg-white text-gray-800 shadow-md fixed w-full top-0 z-10 ${!isOpened ? "hidden":""}`}>
      <div className="container flex flex-col gap-10 h-screen items-center justify-center py-4 px-6">
        <div className="flex  flex-col justify-center gap-4">
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
        </div>

        <div className="text-lg gap-10 flex flex-col  items-center justify-center ">
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

        <div className="flex flex-col gap-10">
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
            <>
              <Link className="login" onClick={() => logout()}>
                Logout
              </Link>
              <Link to="/profile" className="signup">
                Profile
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>

    </>
    )
   
  );
};

export default Navbar;