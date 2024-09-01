import React, { useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import "./LandingPage.css"; // Make sure to include custom styles if needed
import JobSearch from "../../assets/Images/job-search-icon_files.jpg"
import Notification from "../../assets/Images/notifications-icon.png"
import CandidateSearch from "../../assets/Images/candidate-search-icon.png"
import Interview from "../../assets/Images/interview-icon.png"
import Management from "../../assets/Images/management-icon.png"


const LandingPage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="landing-page bg-white text-[#4E6E5D]">
      {/* Hero Section */}
      <section
        className="hero h-screen flex flex-col justify-center items-center text-center"
        data-aos="fade-up"
      >
        <h1 className="text-4xl font-bold mb-4 text-[#4E6E5D]">
          Welcome to JubSculpt
        </h1>
        <p className="text-xl text-gray-700 mb-6">
          Craft your Career, Build your Business
        </p>
        <div className="flex gap-4">
          <a
            href="#find-jobs"
            className="bg-[#4E6E5D] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#3C5A4A] transition duration-300"
          >
            Find Jobs
          </a>
          <a
            href="#hire"
            className="bg-white border-2 border-[#4E6E5D] text-[#4E6E5D] px-6 py-3 rounded-lg shadow-md hover:bg-[#4E6E5D] hover:text-white transition duration-300"
          >
            Hire Talents
          </a>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="find-jobs"
        className="find-jobs py-16 bg-[#f8f8f8] text-center"
        data-aos="fade-right"
      >
        <h2 className="text-3xl font-semibold mb-8 text-[#4E6E5D]">
          Find Your Dream Job
        </h2>
        <p className="text-lg text-gray-600 max-w-xl mx-auto mb-12">
          Explore a wide range of job opportunities tailored to your skills and
          experience. JubSculpt connects you with top employers looking for
          talents like you.
        </p>
        <div className="flex justify-center gap-10">
          <div className="feature-card bg-white shadow-lg p-6 rounded-lg" data-aos="zoom-in">
            <img
              src={JobSearch}
              alt="Job Search"
              className="w-16 h-16 mx-auto mb-4"
            />
            <h3 className="text-xl font-bold text-[#4E6E5D] mb-2">Job Search</h3>
            <p className="text-gray-600">
              Use our advanced search to find the perfect job match.
            </p>
          </div>
          <div className="feature-card bg-white shadow-lg p-6 rounded-lg" data-aos="zoom-in">
            <img
              src={Notification}
              alt="Notifications"
              className="w-16 h-16 mx-auto mb-4"
            />
            <h3 className="text-xl font-bold text-[#4E6E5D] mb-2">Job Alerts</h3>
            <p className="text-gray-600">
              Get notified of new job postings directly in your inbox.
            </p>
          </div>
          <div className="feature-card bg-white shadow-lg p-6 rounded-lg" data-aos="zoom-in">
            <img
              src="path/to/application-icon.png"
              alt="Application"
              className="w-16 h-16 mx-auto mb-4"
            />
            <h3 className="text-xl font-bold text-[#4E6E5D] mb-2">Apply Fast</h3>
            <p className="text-gray-600">
              Submit your application with a single click.
            </p>
          </div>
        </div>
      </section>

      {/* Hiring Section */}
      <section
        id="hire"
        className="hire-talent py-16 bg-white text-center"
        data-aos="fade-left"
      >
        <h2 className="text-3xl font-semibold mb-8 text-[#4E6E5D]">
          Hire the Best Talent
        </h2>
        <p className="text-lg text-gray-600 max-w-xl mx-auto mb-12">
          Find the perfect candidates for your business. JubSculpt offers a
          streamlined hiring process to connect you with the best talent.
        </p>
        <div className="flex justify-center gap-10">
          <div className="feature-card bg-[#f8f8f8] shadow-lg p-6 rounded-lg" data-aos="zoom-in">
            <img
              src={CandidateSearch}
              alt="Candidate Search"
              className="w-16 h-16 mx-auto mb-4"
            />
            <h3 className="text-xl font-bold text-[#4E6E5D] mb-2">Candidate Search</h3>
            <p className="text-gray-600">
              Filter and find the best candidates for your needs.
            </p>
          </div>
          <div className="feature-card bg-[#f8f8f8] shadow-lg p-6 rounded-lg" data-aos="zoom-in">
            <img
              src={Interview}
              alt="Interviews"
              className="w-16 h-16 mx-auto mb-4"
            />
            <h3 className="text-xl font-bold text-[#4E6E5D] mb-2">Easy Interviews</h3>
            <p className="text-gray-600">
              Schedule and manage interviews effortlessly.
            </p>
          </div>
          <div className="feature-card bg-[#f8f8f8] shadow-lg p-6 rounded-lg" data-aos="zoom-in">
            <img
              src={Management}
              alt="Management"
              className="w-16 h-16 mx-auto mb-4"
            />
            <h3 className="text-xl font-bold text-[#4E6E5D] mb-2">Talent Management</h3>
            <p className="text-gray-600">
              Keep track of your talent pool with our management tools.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
