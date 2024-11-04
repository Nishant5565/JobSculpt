import React, { useEffect, useState } from "react";
import { FaSearch, FaBell, FaPaperPlane, FaUsers, FaRegHandshake, FaBriefcase, FaChartLine, FaLaptopCode, FaLightbulb } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = ({ theme }) => {
  const [isLoggedIn, setIsloggedIn] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsloggedIn(true);
    }
  }, []);

  useEffect(() => {
    gsap.from("#find-jobs", {
      scrollTrigger: {
        trigger: "#find-jobs",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      y: 50,
      duration: 1,
    });

    gsap.from("#hire", {
      scrollTrigger: {
        trigger: "#hire",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      y: 50,
      duration: 1,
    });

    gsap.from("#get-started", {
      scrollTrigger: {
        trigger: "#get-started",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      y: 50,
      duration: 1,
    });

    gsap.fromTo(".featureCard", 
      { 
        width: "70%",
        opacity: 0.8,
        margin : "0 auto",

       }
      , 
      { 
        width: "100%",
        opacity: 1,
        duration: 0.4, 
        ease: "none", 
        scrollTrigger: {
          trigger: ".featureCard",
          start: "top 90%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        }
      }
    );
  }, []);

  const primaryColor = theme == 'dark' ? 'text-red-500' : 'text-teal-700';

  return (
    <>
      <section
        id="find-jobs"
        className={`py-20 px-4 md:px-8 ${theme === 'light' ? 'bg-gray-50' : 'bg-black'}`}
      >
        <h2 className={`text-4xl md:text-5xl font-bold mb-10 text-center ${primaryColor}`}>
          Find Your Dream Job
        </h2>
        <p className= {` max-w-3xl mx-auto text-center mb-16 text-lg md:text-xl ${theme != 'dark' ? 'text-gray-700' : 'text-gray-300'}`}>
          Explore a wide range of job opportunities tailored to your skills and
          experience. JubSculpt connects you with top employers looking for
          talents like you.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <FeatureCard
            icon={<FaSearch size={40} />}
            title="Advanced Search"
            description="Use our powerful search tools to find jobs that match your skills and preferences."
            theme={theme}
          />
          <FeatureCard
            icon={<FaBell size={40} />}
            title="Job Alerts"
            description="Stay updated with real-time notifications about new job postings."
            theme={theme}
          />
          <FeatureCard
            icon={<FaPaperPlane size={40} />}
            title="Easy Application"
            description="Apply to multiple jobs quickly with our streamlined application process."
            theme={theme}
          />
          <FeatureCard
            icon={<FaChartLine size={40} />}
            title="Career Growth"
            description="Find opportunities that help you grow and advance in your career."
            theme={theme}
          />
          <FeatureCard
            icon={<FaLaptopCode size={40} />}
            title="Tech Jobs"
            description="Discover a variety of tech jobs in different industries."
            theme={theme}
          />
          <FeatureCard
            icon={<FaLightbulb size={40} />}
            title="Innovative Roles"
            description="Explore innovative roles that challenge and inspire you."
            theme={theme}
          />
        </div>
      </section>
      <section
        id="hire"
        className={`py-20 px-4 md:px-8 ${theme === 'light' ? 'bg-white' : 'bg-[#0f0f0f]'}`}
      >
        <h2 className={`text-4xl md:text-5xl font-bold mb-10 text-center ${primaryColor}`}>
          Hire the Best Talent
        </h2>
        <p className={`${theme =='dark'? 'text-white':'text-gray-700'} max-w-3xl mx-auto text-center mb-16 text-lg md:text-xl`}>
          Find the perfect candidates for your business. JubSculpt offers a
          streamlined hiring process to connect you with top professionals.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <FeatureCard
            icon={<FaUsers size={40} />}
            title="Vast Talent Pool"
            description="Access a large database of qualified candidates across various industries."
            theme={theme}
          />
          <FeatureCard
            icon={<FaRegHandshake size={40} />}
            title="Seamless Communication"
            description="Connect and communicate with potential hires effortlessly."
            theme={theme}
          />
          <FeatureCard
            icon={<FaBriefcase size={40} />}
            title="Efficient Hiring"
            description="Manage your recruitment process effectively with our intuitive tools."
            theme={theme}
          />
          <FeatureCard
            icon={<FaChartLine size={40} />}
            title="Performance Tracking"
            description="Track the performance of your hires and ensure they meet your expectations."
            theme={theme}
          />
          <FeatureCard
            icon={<FaLaptopCode size={40} />}
            title="Tech Recruitment"
            description="Hire top tech talent for your company's needs."
            theme={theme}
          />
          <FeatureCard
            icon={<FaLightbulb size={40} />}
            title="Innovative Solutions"
            description="Implement innovative hiring solutions to attract the best talent."
            theme={theme}
          />
        </div>
      </section>

      {!isLoggedIn && (
        <section id="get-started" className={`py-20 px-4 md:px-8 text-white text-center ${theme == "dark" ? 'bg-red-600' : 'bg-teal-700'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Ready to Get Started?
          </h2>
          <p className="text-xl md:text-2xl mb-10">
            Join JubSculpt today and take the next step towards achieving your
            career or business goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/signup"
              className={`bg-transparent border-2 border-white text-white px-8 py-4 rounded-full shadow-lg hover:bg-white hover:text-gray-700 transition duration-300`}
            >
              Sign Up as Job Seeker
            </Link>
            <Link
              to="/signup"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full shadow-lg hover:bg-white hover:text-gray-700 transition duration-300"
            >
              Sign Up as Employer
            </Link>
          </div>
        </section>
      )}
    </>
  );
};

const FeatureCard = ({ icon, title, description, theme }) => {
  const titleColor = theme == 'dark' ? 'text-white' : 'text-teal-700';
  return (
    <div className={`flex flex-col items-center text-center p-8 rounded-[20px]  ${theme == 'dark' ? 'bg-[#303030] featureCardDark' : 'bg-white featureCard'}`}>
      <div className={`${titleColor} mb-4`}>{icon}</div>
      <h3 className={`text-2xl font-semibold mb-3 ${titleColor}`}>{title}</h3>
      <p className={`${theme == 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
        
        {description}</p>
    </div>
  );
};

export default Hero;