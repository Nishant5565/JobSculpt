import React, { useContext } from 'react';
import { Link , useNavigate , useParams} from 'react-router-dom';
import { ThemeContext } from './ThemeContext';
import MinFooter from '../Components/Footer/MinFooter';

const Signup = () => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  return (
    <>
    <div className={`min-h-screen flex items-center justify-center transition-colors duration-500 ${theme === 'dark' ? 'bg-black text-white' : 'bg-gray-100 text-gray-800'} p-2`}>
      <Link to="/" className={`text-xl font-bold fixed top-10 left-10 ${theme == 'dark' ? 'text-red-500' : 'text-teal-700'} transition-colors duration-500`}>
        JobSculpt
      </Link>
      
      <div className="container mx-auto max-w-3xl p-8 rounded-3xl shadow-2xl transition-all duration-500 bg-white dark:bg-[#131313]">
        <h1 className="text-center text-4xl font-bold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 dark:from-[#09ffff] dark:to-[#b854ff]">
          Join Us Today !
        </h1>
        
        <p className="text-center mb-8 text-lg text-gray-700 dark:text-gray-300">
          Choose your path and start your journey with us. Whether you're a freelancer or looking to hire talent, we've got you covered!
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10" >
          <div className="p-6 bg-gradient-to-br from-blue-500 to-green-400 dark:from-green-500 dark:to-blue-600 text-white rounded-3xl shadow-lg transform transition-transform duration-300 hover:scale-105 cursor-pointer hover:shadow-xl"
          onClick = {() => navigate('/signup/freelancer')}
          >
            <h2 className="text-2xl font-semibold mb-4">Sign Up as Freelancer</h2>
            <p className="mb-6">
              Discover endless job opportunities and grow your freelance career.
            </p>
            <Link to="/signup/freelancer">
              <button className="w-full py-3 bg-white text-blue-600 dark:text-blue-700 rounded-full shadow-md ">
                Get Started
              </button>
            </Link>
          </div>

          <div className="p-6 bg-gradient-to-br from-purple-500 to-pink-400 dark:from-pink-600 dark:to-purple-700 text-white rounded-3xl shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl  duration-300 cursor-pointer"
          onClick = {() => navigate('/signup/employer')}
          >
            <h2 className="text-2xl font-semibold mb-4">Sign Up to Hire People</h2>
            <p className="mb-6">
              Post jobs and find talented freelancers for your projects.
            </p>
            <Link to="/signup/employer">
              <button className="w-full py-3 bg-white text-purple-600 dark:text-purple-700 rounded-full shadow-md">
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