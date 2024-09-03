import React, { useEffect, useState } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaUsers,
  FaRegHandshake,
  FaBriefcase,
  FaBell,
  FaPaperPlane,
} from "react-icons/fa";


const LandingPage = () => {

  const [isLoggedIn, setIsloggedIn] = useState(null);
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);


  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token){
      setIsloggedIn(true);
    }
  }
  ,[])


  return (
    <div className="landing-page bg-white text-[#4E6E5D]">
      {/* Hero Section */}
      <section
        className="hero min-h-screen flex flex-col justify-center items-center text-center px-4 md:px-8 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://source.unsplash.com/featured/?career')",
        }}
      >
        <div
          className="bg-white bg-opacity-80 p-6 rounded-lg "
          data-aos="fade-up"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to <span className="text-[#4E6E5D]">JubSculpt</span>
          </h1>
          <p className="text-lg md:text-2xl text-gray-700 mb-6">
            Craft your Career, Build your Business
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/find-jobs"
              className="bg-[#4E6E5D] text-white px-6 py-3 rounded-full shadow-md hover:bg-[#3C5A4A] transition duration-300"
            >
              Find Jobs
            </Link>
            <Link
              to="/hire"
              className="bg-transparent border-2 border-[#4E6E5D] text-[#4E6E5D] px-6 py-3 rounded-full shadow-md hover:bg-[#4E6E5D] hover:text-white transition duration-300"
            >
              Hire Talent
            </Link>
          </div>
        </div>
      </section>

      {/* Find Jobs Section */}
      <section
        id="find-jobs"
        className="py-16 px-4 md:px-8 bg-[#f8f8f8]"
        data-aos="fade-right"
      >
        <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-center">
          Find Your Dream Job
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-center mb-12">
          Explore a wide range of job opportunities tailored to your skills and
          experience. JubSculpt connects you with top employers looking for
          talents like you.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<FaSearch size={40} />}
            title="Advanced Search"
            description="Use our powerful search tools to find jobs that match your skills and preferences."
          />
          <FeatureCard
            icon={<FaBell size={40} />}
            title="Job Alerts"
            description="Stay updated with real-time notifications about new job postings."
          />
          <FeatureCard
            icon={<FaPaperPlane size={40} />}
            title="Easy Application"
            description="Apply to multiple jobs quickly with our streamlined application process."
          />
        </div>
      </section>

      {/* Hire Talent Section */}
      <section
        id="hire"
        className="py-16 px-4 md:px-8 bg-white "
        data-aos="fade-up"
        
      >
        <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-center">
          Hire the Best Talent
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-center mb-12">
          Find the perfect candidates for your business. JubSculpt offers a
          streamlined hiring process to connect you with top professionals.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<FaUsers size={40} />}
            title="Vast Talent Pool"
            description="Access a large database of qualified candidates across various industries."
          />
          <FeatureCard
            icon={<FaRegHandshake size={40} />}
            title="Seamless Communication"
            description="Connect and communicate with potential hires effortlessly."
          />
          <FeatureCard
            icon={<FaBriefcase size={40} />}
            title="Efficient Hiring"
            description="Manage your recruitment process effectively with our intuitive tools."
          />
        </div>
      </section>

      {/* Call to Action Section */}
     {
      
      !isLoggedIn && (
        <section
        className="py-16 px-4 md:px-8 bg-[#4E6E5D] text-white text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-semibold mb-6">
          Ready to Get Started?
        </h2>
        <p className="text-lg md:text-xl mb-8">
          Join JubSculpt today and take the next step towards achieving your
          career or business goals.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/signup"
            className="bg-white text-[#4E6E5D] px-6 py-3 rounded-full shadow-md hover:bg-gray-200 transition duration-300"
          >
            Sign Up as Job Seeker
          </Link>
          <Link
            to="/signup"
            className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-full shadow-md hover:bg-white hover:text-[#4E6E5D] transition duration-300"
          >
            Sign Up as Employer
          </Link>
        </div>
      </section>
      )
     }
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div
    className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300"
    data-aos="fade-up"
  >
    <div className="text-[#4E6E5D] mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default LandingPage;
