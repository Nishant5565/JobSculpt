import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai'; // Importing icons
import MinFooter from '../Footer/MinFooter';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';
import { API_URL } from '../../Functions/Constants';
import VerifyEmail from '../EmailVerify/VerifyEmail';
import Logo from '../../assets/Images/LogoNoBg.png';
const Login = () => {

  const [step, setStep] = useState(1);
  const navigate = useNavigate();


  // To check if the user is already logged in
  useEffect(() => {
    const user = localStorage.getItem('token');
    if (user) {
      navigate('/');
    }
  }, [navigate]);


  const emailFormik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
    }),
    onSubmit: values => {
      setStep(2);
    },
  });

  const sendEmailVerificationLink = async () => {
    try {
      const response = await axios.post(API_URL + '/api/auth/send-email-verification-link', {
      }, {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
      });
      if (response.data.msg === 'Email sent') {
        console.log('Email sent');
        navigate('/verify-email');
      }
    } catch (err) {
      console.error('Email verification failed:', err);
    }
  };


  const passwordFormik = useFormik({
    initialValues: {
      password: '',
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post( API_URL+ '/api/auth/login', {
          email: emailFormik.values.email,
          password: values.password,
        });
        if (!response.data.token) {
          console.error('Login failed:', response.data);
          return;
        }
        if (response.data.msg === 'Email is not Verified') { 
          localStorage.setItem('token', response.data.token);
          sendEmailVerificationLink();
          return;
        }
  
        localStorage.setItem('token', response.data.token);
        navigate('/');
      } catch (err) {
        console.error('Login failed:', err);
      }
    },
  });


  const handleGoogleSuccess = async (response) => {
    try {
      const data = {
        token: response.credential, // or response.tokenId depending on the library version
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
       <Link to={'/'} className="text-xl font-bold animate__animated animate__fadeIn animate__delay-2s text-clip bg-gradient-to-tr from-[#495bff] to-[#ff006e] bg-clip-text text-transparent ml-4 cursor-pointer absolute top-5 ">
            <span className="font-greatvibes ml-2">
              J
            </span>
            ob
            <span className=' font-greatvibes'>
              S
            </span>
            culpt
          </Link>
          
      <div className="flex items-center justify-center min-h-screen">
        <div className=" w-[500px] p-8 space-y-8 bg-gradient-to-t from-[#495bff] to-[#ffffff] bg-opacity-90 rounded-xl border-2">
          <div className="text-center">
            <h2 className="text-[28px] text-[#495bff]">
              {step ==1 && 'Log in to JobSculpt'}
              {step ==2 && 'Password'}
            </h2>
          </div>

          {step === 1 ? (
             <>

            <form onSubmit={emailFormik.handleSubmit} className="space-y-6 flex flex-col items-center  ">
              <div className="relative w-3/4 "> 
                <AiOutlineMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={emailFormik.handleChange}
                  onBlur={emailFormik.handleBlur}
                  value={emailFormik.values.email}
                  className="w-full px-10 py-2 mt-1 text-gray-900 placeholder-gray-400 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  placeholder="Email or Username"
                />
                {emailFormik.touched.email && emailFormik.errors.email ? (
                  <div className="absolute mt-1 text-xs text-[#495bff]">{emailFormik.errors.email}</div>
                ) : null}
              </div>
              <div className="w-3/4">
                <button
                  type="submit"
                  className="relative w-full px-4 py-2 text-white  text-whit rounded-lg bg-[#495bff] shadow-md hover:bg-[#6473f8]"
                >
                  Continue
                </button>
              </div>
            </form>

            <p className="text-white text-[14px] text-center after:content-[''] after:block after:w-1/2 after:mx-auto after:h-0.5 after:bg-gray-300 after:mt-4">
            Or
            </p>
            <div className=" flex items-center justify-center ">
            <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => console.log('Google Login Failed')} />
            </div>

            <div className="text-center flex flex-col gap-10 items-center">
            <p className="text-white text-[16px] after:content-[''] after:block after:w-1/2 after:mx-auto after:h-0.5 after:bg-gray-300">
              Don't have a JobSculpt account? 
            </p>
            < Link to={"/signup"} className="text-[#ffffff] border-2 w-48 py-2 border-[#ffffff] rounded-lg">
            Sign up
            </Link>
          </div>


           </>
          ) : null }

          {step === 2 ? (
            (
              <>
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
                    className="w-full px-10 py-2 mt-1 text-gray-900 placeholder-gray-400 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    placeholder="Enter your password"
                  />
                  {passwordFormik.touched.password && passwordFormik.errors.password ? (
                    <div className="absolute text-xs text-red-600">{passwordFormik.errors.password}</div>
                  ) : null}
                </div>
                <div className="w-3/4">
                  <button
                    type="submit"
                     className="relative w-full px-4 py-2 text-white  text-whit rounded-lg bg-[#495bff] shadow-md hover:bg-[#6473f8]"
                  >
                    Login
                  </button>
                </div>
              </form>
              <p className="text-white text-[14px] text-center after:content-[''] after:block after:w-1/2 after:mx-auto after:h-0.5 after:bg-gray-300 after:mt-4">
            Or
            </p>
            <div className=" flex items-center justify-center ">
            <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => console.log('Google Login Failed')} />
            </div>
            </>
            )
          ) : null}
        </div>        
      </div>

      <MinFooter />
    </>
  );
};

export default Login;