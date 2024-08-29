import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import MinFooter from '../Footer/MinFooter';
import { useNavigate, Link } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa";

const Signup = () => {
  const [step, setStep] = useState(1);
  const [usernameAvailable, setUsernameAvailable] = useState('Input a username to check availability');
  const navigate = useNavigate();

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
     //  thier should be no white space in username
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
        const response = await axios.post('http://localhost:5000/api/auth/register', {
          userName: emailFormik.values.userName,
          email: emailFormik.values.email,
          password: values.password,
        });

        if (response.status !== 200) {
          console.error('Registration failed:', response.data);
          return;
        }
        localStorage.setItem('token', response.data.token);
        navigate('/');
      } catch (err) {
        console.error('Registration failed:', err);
      }
    },
  });

  const checkUsername = async (userName) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/check-username', {
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

  return (
    <>
      <h1 className="text-xl font-bold animate__animated animate__fadeIn animate__delay-2s text-clip bg-gradient-to-tr from-[#495bff] to-[#ff006e] bg-clip-text text-transparent ml-4 mt-4 cursor-pointer">
        <span className="font-greatvibes ml-2">
          J
        </span>
        ob
        <span className=' font-greatvibes'>
          S
        </span>
        culpt
      </h1>

      <div className="flex items-center justify-center min-h-screen mt-20">
        <div className="w-[500px] p-8 space-y-8 bg-white bg-opacity-90 rounded-xl border-2">
          <div className="text-center">
            <h2 className="text-[28px] text-gray-900">
              {step === 1 ? 'Register for JobSculpt' : 'Choose a Password'}
            </h2>
          </div>

          {step === 1 ? (
            <form onSubmit={emailFormik.handleSubmit} className="space-y-6 flex flex-col items-center">
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
                <div className={`absolute text-xs ${ usernameAvailable === 'Username already exists' ? 'text-red-600' : 'text-green-600'}`}>
                    {usernameAvailable}</div>
              </div>
                </>
                }
              </div>

              <div className="w-3/4">
                <button
                  type="submit"
                  className="relative w-full px-4 py-2 text-white rounded-lg bg-[#495bff] shadow-md hover:bg-[#6473f8]"
                >
                  Continue
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={passwordFormik.handleSubmit} className="space-y-6 flex flex-col items-center">
              <div className="relative w-3/4">
                <AiOutlineLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={passwordFormik.handleChange}
                  onBlur={passwordFormik.handleBlur}
                  value={passwordFormik.values.password}
                  className="w-full px-10 py-3 mt-1 text-gray-900 placeholder-gray-400 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
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
                  className="w-full px-10 py-3 mt-1 text-gray-900 placeholder-gray-400 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  placeholder="Confirm your password"
                />
                {passwordFormik.touched.confirmPassword && passwordFormik.errors.confirmPassword ? (
                  <div className="absolute text-xs text-red-600">{passwordFormik.errors.confirmPassword}</div>
                ) : null}
              </div>
              <div className="w-3/4">
                <button
                  type="submit"
                  className="relative w-full px-4 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-md hover:bg-gradient-to-l hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
                >
                  Register
                </button>
              </div>
            </form>
          )}
          <p className="text-gray-900 text-[14px] text-center">
            Or
          </p>
          <div className="flex items-center justify-center">
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                const { credential } = credentialResponse;
                const decoded = jwtDecode(credential);

                try {
                  const response = await axios.post('http://localhost:5000/api/auth/google', {
                    token: credential,
                  });

                  localStorage.setItem('token', response.data.token);

                  window.location.href = '/';
                } catch (err) {
                  console.error('Google registration failed:', err);
                }
              }}
              onError={() => {
                console.log('Google Login Failed');
              }}
            />
          </div>
          
          <div className="flex items-center justify-center">
            <Link to={"/login"} className="text-[#495bff] border-2 w-48 py-2 border-[#495bff] rounded-lg text-center">
              Log in
            </Link>
          </div>
        </div>
      </div>

      <MinFooter />
    </>
  );
};

export default Signup;