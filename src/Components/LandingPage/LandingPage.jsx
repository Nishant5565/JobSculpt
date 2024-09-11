import React, { useEffect, useState } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import { Link, useNavigate } from "react-router-dom";
import Lottie from 'react-lottie';
import animationData from '../../assets/Lottie/HomePage.json'; // Update with the path to your Lottie JSON file\
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
        className="hero min-h-screen flex flex-col justify-center items-center text-center px-4 md:px-8 bg-cover bg-center"

      >

        <div className="flex items-center justify-evenly w-screen">
        <div>
        <h1 className="text-4xl md:text-7xl font-bold mb-6 heading1 ">
           Craft Your Career 
          </h1>

          <h1 className="text-4xl md:text-7xl font-bold mb-6 heading2">
            Grow Your Business
          </h1>

          <p className="text-gray-700  font-semibold max-w-3xl mx-auto text-center mb-16 font-sans text-[20px] md:text-[18px]  translate-y-24 ">
          Making it easier than ever to find and offer work opportunities.  
        </p>
        </div>

        <div className="mt-8" data-aos="fade-left">
          <Lottie options={defaultOptions} height={400} width={400} />
        </div>
        </div>
        
      {
        !isLoggedIn ?        <div className="flex w-[70vw]">
        <button class="blob-btn" onClick={() => navigate('/signup')}>
            Get Started
            <span class="blob-btn__inner">
              <span class="blob-btn__blobs">
                <span class="blob-btn__blob"></span>
                <span class="blob-btn__blob"></span>
                <span class="blob-btn__blob"></span>
                <span class="blob-btn__blob"></span>
              </span>
            </span>
          </button>
        </div> : null
      }
      </section>


      <Hero />
    </div>
  );
};

export default LandingPage;