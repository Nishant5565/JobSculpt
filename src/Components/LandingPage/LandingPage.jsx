import React, { useEffect, useState } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import { Link, useNavigate } from "react-router-dom";
import Lottie from 'react-lottie';
import animationData from '../../assets/Lottie/HomePage.json'; // Update with the path to your Lottie JSON file
import './LandingPage.css';
import Hero from "./Hero";

const LandingPage = () => {
  const [isLoggedIn, setIsloggedIn] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsloggedIn(true);
    }
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div className="landing-page text-gray-900">
      {/* Hero Section */}
      <section
        className="hero min-h-screen flex flex-col justify-center items-center text-center px-4 md:px-8 bg-cover bg-center max-xs:pt-40"
      >
        <div className="flex flex-col md:flex-row items-center justify-evenly w-full">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-7xl font-bold mb-6 heading1">
              Craft Your Career
            </h1>
            <h1 className="text-4xl md:text-7xl font-bold mb-6 heading2">
              Grow Your Business
            </h1>
            <p className="text-gray-700 font-semibold max-w-3xl mx-auto md:mx-0 text-center md:text-left mb-16 font-sans text-[20px] md:text-[18px]">
              Making it easier than ever to 
              <span
              className="text-teal-500 font-semibold max-w-3xl mx-auto md:mx-0 text-center md:text-left mb-16 font-sans text-[20px] md:text-[18px] pl-2"
              > find 
              </span> and 
              <span
              className="text-teal-500 font-semibold max-w-3xl mx-auto md:mx-0 text-center md:text-left mb-16 font-sans text-[20px] md:text-[18px] pl-2"
              > offer </span>
              the best job opportunities 

              
            </p>
          </div>
          <div className="mt-8 md:mt-0" data-aos="fade-up">
            <Lottie options={defaultOptions} height={400} width={370} />
          </div>
        </div>
        {!isLoggedIn && (
          <div className="flex justify-center w-full mt-8 md:mt-16">
            <button className="blob-btn" onClick={() => navigate('/signup')}>
              Get Started
              <span className="blob-btn__inner">
                <span className="blob-btn__blobs">
                  <span className="blob-btn__blob"></span>
                  <span className="blob-btn__blob"></span>
                  <span className="blob-btn__blob"></span>
                  <span className="blob-btn__blob"></span>
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