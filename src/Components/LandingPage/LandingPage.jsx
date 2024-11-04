import React, { useEffect, useState, useContext, useRef } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import { Link, useNavigate } from "react-router-dom";
import Lottie from 'react-lottie';
import animationDataDark from '../../assets/Lottie/HomePageDark.json';
import animationData from '../../assets/Lottie/HomePage.json';
import './LandingPage.css';
import Hero from "./Hero";
import { ThemeContext } from "../../Pages/ThemeContext";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LandingPage = () => {
  const [isLoggedIn, setIsloggedIn] = useState(null);
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const waveSectionRef = useRef(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });

    gsap.from(heroRef.current, {
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top center",
        end: "bottom center",
        scrub: true,
      },
    });

    gsap.from(waveSectionRef.current, {
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: waveSectionRef.current,
        start: "top center",
        end: "bottom center",
        scrub: true,
      },
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
    animationData: theme === 'dark' ? animationDataDark : animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }, 
  };

  return (
    <div className={`landing-page text-gray-900 ${theme === 'dark' ? 'bg-dark' : 'bg-light'}`}>
      {/* Hero Section */}
      <section ref={heroRef} className="hero min-h-screen flex flex-col justify-center items-center text-center px-4 md:px-8 bg-cover bg-center relative">
        {/* First wave background */}
        <div className="wave wave-top" />
        
        <div className="flex flex-col md:flex-row items-center justify-evenly w-full z-10">
          <div className="text-center md:text-left">
            <h1 className={`text-4xl md:text-7xl font-bold mb-6 themeTransition ${theme === "dark" ? "text-red-600 opacity-100 heading1Dark" : "heading1"}`}>
              Craft Your Career
            </h1>
            <h1 className={`text-4xl md:text-7xl font-bold mb-6 themeTransition ${theme === "dark" ? "text-white opacity-100 heading2Dark" : "heading2"}`}>
              Grow Your Business
            </h1>
            <p className={`${theme === "dark" ? 'text-white' : 'text-black'} font-semibold max-w-3xl mx-auto md:mx-0 text-center md:text-left mb-16 font-sans text-[20px] md:text-[18px] themeTransition`}>
              Making it easier than ever to 
              <span className={`pl-2 themeTransition ${theme === "dark" ? 'text-red-600' : 'text-teal-500'}`}> find </span> and 
              <span className={`pl-2 themeTransition ${theme === "dark" ? 'text-red-600' : 'text-teal-500'}`}> offer </span> the best job opportunities.
            </p>
          </div>
          <div className="mt-8 md:mt-0" data-aos="fade-up">
            <Lottie options={defaultOptions} height={400} width={370} />
          </div>
        </div>
        {!isLoggedIn && (
          <div className="flex justify-center w-full mt-8 md:mt-16">
            <button className={`blob-btn ${theme === "dark" ? 'text-red-600 before:border-red-600' : 'text-[#004d40] border-[#004d40]'}`} onClick={() => navigate('/signup')}>
              Get Started
              <span className="blob-btn__inner">
                <span className="blob-btn__blobs">
                  <span className={`blob-btn__blob ${theme === 'dark' ? 'bgDark' : 'bgLight'}`} />
                  <span className={`blob-btn__blob ${theme === 'dark' ? 'bgDark' : 'bgLight'}`} />
                  <span className={`blob-btn__blob ${theme === 'dark' ? 'bgDark' : 'bgLight'}`} />
                  <span className={`blob-btn__blob ${theme === 'dark' ? 'bgDark' : 'bgLight'}`} />
                </span>
              </span>
            </button>
          </div>
        )}
        
        {/* Second wave background */}
        <div className="wave wave-bottom" />
      </section>
      
      {/* Additional Section with Waves */}
      <section ref={waveSectionRef} className={`wave-section ${theme === 'dark' ? 'bg-dark' : 'bg-light'} py-12`}>
        <div className="text-center max-w-3xl mx-auto">
          <h2 className={`text-3xl md:text-5xl font-bold ${theme === "dark" ? 'text-red-600' : 'text-teal-500'} mb-8`}>
            Explore Endless Possibilities
          </h2>
          <p className={`${theme === 'dark' ? 'text-white' : 'text-gray-700'} text-lg mb-12`}>
            Start your journey with the best tools and resources at your fingertips.
          </p>
          <button className={`blob-btn ${theme === "dark" ? 'text-white before:border-white' : 'text-teal-500 border-teal-500'}`} onClick={() => navigate('/explore')}>
            Explore Now
            <span className="blob-btn__inner">
              <span className="blob-btn__blobs">
                <span className={`blob-btn__blob ${theme === 'dark' ? 'bgDark' : 'bgLight'}`} />
                <span className={`blob-btn__blob ${theme === 'dark' ? 'bgDark' : 'bgLight'}`} />
                <span className={`blob-btn__blob ${theme === 'dark' ? 'bgDark' : 'bgLight'}`} />
                <span className={`blob-btn__blob ${theme === 'dark' ? 'bgDark' : 'bgLight'}`} />
              </span>
            </span>
          </button>
        </div>
      </section>

      {/* Hero component */}
      <Hero theme={theme} />
    </div>
  );
};

export default LandingPage;
