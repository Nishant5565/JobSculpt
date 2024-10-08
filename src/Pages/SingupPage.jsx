import React, { useContext } from 'react';
import { Link , useNavigate , useParams} from 'react-router-dom';
import { ThemeContext } from './ThemeContext';
import MinFooter from '../Components/Footer/MinFooter';
import JobSculptLogo from '../Functions/JobSculptLogo';

const Signup = () => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  return (
    <>
    <div className={`min-h-screen flex items-center justify-center transition-colors duration-500 ${theme === 'dark' ? 'bg-black text-white' : 'bg-gray-100 text-gray-800'} p-2`}>
    <JobSculptLogo />
      
      <div className={`container mx-auto max-w-3xl p-8 rounded-3xl border-2  shadow-2xl transition-all duration-500 ${theme == 'dark' && 'bg-[#131313] '} `}>
      <h1 className={`text-3xl  transition-all duration-500 font-bold text-center mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
          Join Us Today !
        </h1>
        
        <p className= {`text-center  transition-all duration-500 mb-8 text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>
          Choose your path and start your journey with us. Whether you're a freelancer or looking to hire talent, we've got you covered!
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10" >
          <div className="p-6 bg-black text-white rounded-3xl shadow-lg transform transition-transform duration-300 hover:scale-105 cursor-pointer hover:shadow-xl"
          onClick = {() => navigate('/signup/freelancer')}
          >
            <h2 className="text-2xl font-semibold mb-4">Sign Up as Freelancer</h2>
            <p className="mb-6">
              Discover endless job opportunities and grow your freelance career.
            </p>
            <Link to="/signup/freelancer">
            <button className={`w-full mt-10 py-3 px-4 rounded-full shadow-md  bg-white text-black transition-all duration-500 `}>
                Get Started
              </button>
            </Link>
          </div>

          <div className="p-6 bg-white text-black rounded-3xl shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl  duration-300 cursor-pointer"
          onClick = {() => navigate('/signup/employer')}
          >
            <h2 className="text-2xl font-semibold mb-4">Sign Up to Hire People</h2>
            <p className="mb-6">
              Post jobs and find talented freelancers for your projects.
            </p>
            <Link to="/signup/employer">
            <button className={`w-full mt-10 py-3 px-4 rounded-full shadow-md bg-black text-white transition-all duration-500 `}>
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
      <MinFooter />

    </>
  );
};

export default Signup;