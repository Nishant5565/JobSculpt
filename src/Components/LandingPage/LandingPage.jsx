import React, { useEffect, useState , useContext} from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import { Link, useNavigate } from "react-router-dom";
import Lottie from 'react-lottie';
import animationDataDark from '../../assets/Lottie/HomePageDark.json';
import animationData from '../../assets/Lottie/HomePage.json';
import './LandingPage.css';
import Hero from "./Hero";
import { ThemeContext } from "../../Pages/ThemeContext";

const LandingPage = () => {
  const [isLoggedIn, setIsloggedIn] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsloggedIn(true);
    }
  }, []);




  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: theme == 'dark' ? animationDataDark : animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }, 
  };

  return (
    <div className="landing-page text-gray-900">
      {/* Hero Section */}
      <section
        className="hero min-h-screen flex flex-col justify-center items-center text-center px-4 md:px-8 bg-cover bg-center max-xs:pt-40"
      >
        <div className="flex flex-col md:flex-row items-center justify-evenly w-full">
          <div className="text-center md:text-left">
          <h1 className={`text-4xl md:text-7xl font-bold mb-6  themeTransition ${
              theme == "dark" ? "text-red-600 opacity-100 heading1Dark" : "heading1"
            }`}>
              Craft Your Career
            </h1>
            <h1 className={`text-4xl md:text-7xl font-bold mb-6 themeTransition ${
              theme == "dark" ? "text-white opacity-100 heading2Dark themeTransition" : "heading2 "
            }`}>
              Grow Your Business
            </h1>
            <p className={`${theme == "dark" ? 'text-white' : 'text-black'} font-semibold max-w-3xl mx-auto md:mx-0 text-center md:text-left mb-16 font-sans text-[20px] md:text-[18px] themeTransition`}>
              Making it easier than ever to 
              <span
              className={` font-semibold max-w-3xl mx-auto md:mx-0 text-center md:text-left mb-16 font-sans text-[20px] md:text-[18px] pl-2 themeTransition ${theme == "dark" ? 'text-red-600 ' : 'text-teal-500'}`}
              > find 
              </span> and 
              <span
              className={` font-semibold max-w-3xl mx-auto md:mx-0 text-center md:text-left mb-16 font-sans text-[20px] md:text-[18px] pl-2 themeTransition ${theme == "dark" ? 'text-red-600 ' : 'text-teal-500'}`}
              > offer </span>
              the best job opportunities 

              
            </p>
          </div>
          <div className={`mt-8 md:mt-0 ${theme == 'dark' ? '' : ''} `}  data-aos='fade-up'>
            <Lottie options={defaultOptions} height={400} width={370} />
          </div>
        </div>
        {!isLoggedIn && (
          <div className="flex justify-center w-full mt-8 md:mt-16">
            <button className={`blob-btn ${theme=="dark" ? 'text-red-600 before:border-red-600':' text-[#004d40] border-[#004d40]'} `} onClick={() => navigate('/signup')}>
              Get Started
              <span className="blob-btn__inner">
                <span className="blob-btn__blobs">
                  <span className={`blob-btn__blob ${theme == 'dark' ? 'bgDark':'bgLight'} `}></span>
                  <span className={`blob-btn__blob ${theme == 'dark' ? 'bgDark':'bgLight'} `}></span>
                  <span className={`blob-btn__blob ${theme == 'dark' ? 'bgDark':'bgLight'} `}></span>
                  <span className={`blob-btn__blob ${theme == 'dark' ? 'bgDark':'bgLight'} `}></span>
                </span>
              </span>
            </button>
          </div>
        )}
      </section>
      <Hero />
    </div>
  );
};

export default LandingPage;