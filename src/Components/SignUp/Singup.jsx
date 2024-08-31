import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import MinFooter from '../Footer/MinFooter';
import { useNavigate, Link } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa";
import { API_URL } from '../../Functions/Constants';
import VerifyEmail from '../EmailVerify/VerifyEmail';
import { IoMdArrowRoundBack } from "react-icons/io";
import './Signup.css';

const Signup = () => {
  const [step, setStep] = useState(1);
  const [usernameAvailable, setUsernameAvailable] = useState('Input a username to check availability');
  const navigate = useNavigate();
  const [role , setRole] = useState('Job');

  // To check if the user is already logged in
  useEffect(() => {
    const user = localStorage.getItem('token');
    if (user) {
      navigate('/');
    }
  }, [navigate]);


  const changeRole = (e) => {
    const prevRole = role;
    setRole(e);
    const front = document.getElementById('front');
    const back = document.getElementById('back');

    if (e !== prevRole) {
      front.classList.toggle('flipped');
      back.classList.toggle('flipped');
    }
  };

  const emailFormik = useFormik({
    initialValues: {
      email: '',
      userName: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
      userName: Yup.string()
        .min(6, 'Username must be at least 6 characters')
            .matches(/^\S*$/, 'Username cannot contain white spaces')
        .required('Required'),
    }),
    onSubmit: values => {
      setStep(2);
    },
  });

  
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

  const passwordFormik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required'),
    }),

    onSubmit: async (values) => {
      try {
        const response = await axios.post( API_URL+'/api/auth/register', {
          userName: emailFormik.values.userName,
          email: emailFormik.values.email,
          password: values.password,
        });

        if (response.status !== 200) {
          console.error('Registration failed:', response.data);
          return;
        }
        else if (response.data.msg === 'User already exists') {
          alert('User already exists');
          return;
        }
        else{
          alert('Registration successful');
          navigate('/verify-email');
        }
        localStorage.setItem('token', response.data.token);
      } catch (err) {
        console.error('Registration failed:', err);
      }
    },
  });

  const checkUsername = async (userName) => {
    try {
      const response = await axios.post( API_URL+ '/api/auth/check-username', {
        userName,
      });

      if (response.status !== 200) {
        console.error('Username check failed:', response.data);
        return;
      }
      setUsernameAvailable(response.data.msg);
    } catch (err) {
      console.error('Username check failed:', err);
    }
  };

  const debouncedCheckUsername = debounce(checkUsername, 500);

  useEffect(() => {
    if (emailFormik.values.userName) {
      debouncedCheckUsername(emailFormik.values.userName);
    }
  }, [emailFormik.values.userName]);

  const handleGoogleSuccess = async (response) => {
    try {
      const data = {
        token: response.credential, // or response.tokenId depending on the library version
        role : role
      };
      const res = await axios.post(API_URL + '/api/auth/google', data);
      if (!res.data.token) {
        console.error('Login failed:', res.data);
        return;
      }
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };
  

  return (
    <>
       <Link to={'/'} className="text-xl font-bold animate__animated animate__fadeIn animate__delay-2s text-clip bg-gradient-to-tr from-[#124E66] to-[#ff006e] bg-clip-text text-transparent ml-4 cursor-pointer absolute top-5  ">
            <span className="font-greatvibes ml-2">
              J
            </span>
            ob
            <span className=' font-greatvibes'>
              S
            </span>
            culpt
          </Link>
      <div className={`flex items-center justify-center  min-h-screen mt-20 transition-all duration-500  `}>

        <div className={`w-[500px] p-8 min-h-[612.5px] space-y-8 bg-opacity-90 rounded-xl border-2 ${role !="Job"?" bg-gradient-to-t from-[#124E66] to-[#ffffff] ":" bg-gradient-to-t from-[#4E6E5D] to-[#ffffff] "} `}>
          <div className="text-center">
            <h2 className={` text-[28px] transition-colors duration-700 ${role != "Job"?" fade-in text-[#124E66]":" text-[#4E6E5D] fade-in1"} `}>
              {step === 1 ? (
                <>
                  <div class="container">
                    <div class="card">
                      <div id="back" class="cardBack">
                      Build Your Business 
                        </div>
                      <div id="front" class="cardFront">
                        Craft Your Career

                      </div>
                    </div>
                  </div>
                </>
              ) : 'Choose a Password'}
            </h2>
          </div>
          
          {step === 1 ? (
            <>
        <div className="flex items-center justify-center ">
          <div className="button-container">
            <div className={`button-wrapper ${role}`}>
              <button
                className={`button ${role === 'Job' ? 'active' : ''}`}
                onClick={() => changeRole('Job')}
              >
                Job
              </button>
              <button
                className={`button ${role === 'Hire' ? 'active' : ''}`}
                onClick={() => changeRole('Hire')}
              >
                Hire
              </button>
            </div>
          </div>
        </div>
            <form onSubmit={emailFormik.handleSubmit} className={`space-y-6 flex flex-col items-center `}>
              <div className="relative w-3/4">
                <AiOutlineMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={emailFormik.handleChange}
                  onBlur={emailFormik.handleBlur}
                  value={emailFormik.values.email}
                  className="w-full px-10 py-2 mt-1 text-gray-900 placeholder-gray-400 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  placeholder="Email"
                />
                {emailFormik.touched.email && emailFormik.errors.email ? (
                  <div className="absolute text-xs text-red-600">{emailFormik.errors.email}</div>
                ) : null}
              </div>
              <div className="relative w-3/4">
                <FaRegUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  id="userName"
                  name="userName"
                  type="text"
                  onChange={emailFormik.handleChange}
                  onBlur={emailFormik.handleBlur}
                  value={emailFormik.values.userName}
                  className="w-full px-10 py-2 mt-1 text-gray-900 placeholder-gray-400 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  placeholder="Username"
                />
                {emailFormik.touched.userName && emailFormik.errors.userName ? (
                  <div className="absolute text-xs text-red-600">{emailFormik.errors.userName}</div>
                ) : <>
               <div className="relative w-3/4">
                <div className={`absolute text-xs ${ usernameAvailable === 'Username already exists' ? 'text-red-600' : 'text-white'}`}>
                    {usernameAvailable}</div>
              </div>
                </>
                }
              </div>

              <div className="w-3/4">
                <button
                  type="submit"
                  className={`${role != "Job"?" bg-[#124E66] text-white": " bg-[#4E6E5D] text-white"} relative w-full px-4 py-2 text-white rounded-lg shadow-md `}
                >
                  Continue
                </button>
              </div>
            </form>
          <p className="text-white text-[14px] text-center">
          Or
        </p>
        <div className="flex items-center justify-center">
        <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => console.log('Google Login Failed')} />
        </div>
        <p className="text-white text-[16px] after:content-[''] after:block after:w-1/2 after:mx-auto after:h-0.5 after:bg-gray-300 text-center">
            Already have a JobSculpt account? 
          </p>

        <div className="flex items-center justify-center">
          
          <Link to={"/login"} className="text-[#ffffff] border-2 w-48 py-2 border-[#ffffff] rounded-lg text-center">
            Log in
          </Link>
        </div>

            </>
          ) : (
            <form onSubmit={passwordFormik.handleSubmit} className="space-y-6 flex flex-col items-center h-96">
              <button onClick={() => setStep(1)} className="text-black text-[20px] relative -top-16 -left-52 hover:underline">
                <IoMdArrowRoundBack />
              </button>
              <div className="relative w-3/4">
                <AiOutlineLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={passwordFormik.handleChange}
                  onBlur={passwordFormik.handleBlur}
                  value={passwordFormik.values.password}
                  className="w-full px-10 py-2 mt-1 text-gray-900 placeholder-gray-400 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  placeholder="Enter your password"
                />
                {passwordFormik.touched.password && passwordFormik.errors.password ? (
                  <div className="absolute text-xs text-red-600">{passwordFormik.errors.password}</div>
                ) : null}
              </div>
              <div className="relative w-3/4">
                <AiOutlineLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  onChange={passwordFormik.handleChange}
                  onBlur={passwordFormik.handleBlur}
                  value={passwordFormik.values.confirmPassword}
                  className="w-full px-10 py-2 mt-1 text-gray-900 placeholder-gray-400 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  placeholder="Confirm your password"
                />
                {passwordFormik.touched.confirmPassword && passwordFormik.errors.confirmPassword ? (
                  <div className="absolute text-xs text-red-600">{passwordFormik.errors.confirmPassword}</div>
                ) : null}
              </div>
              <div className="w-3/4">
                <button
                  type="submit"
                  className={`${role != "Job"?" bg-[#124E66] text-white": " bg-[#4E6E5D] text-white"} relative w-full px-4 py-2 text-white rounded-lg shadow-md `}
                >
                  Register
                </button>
              </div>
              <p className="text-white text-[14px]  after:content-[''] after:block after:w-1/2 after:mx-auto after:h-0.5 after:bg-gray-300 after:mt-20 pt-20 ">
                Note 
                <ul className="text-white text-[14px] ml-4 mt-10" >
                  <li> Password must be at least 6 characters</li>
                  <li> Password must contain at least one uppercase letter, one lowercase letter, one number and one special character</li>

                </ul>
              </p>
            </form>
          )}
        </div>
      </div>

      <MinFooter />
    </>
  );
};

export default Signup;