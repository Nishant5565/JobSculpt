import React, { useEffect, useState, useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai'; // Importing icons
import MinFooter from '../Footer/MinFooter';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';
import { API_URL } from '../../Functions/Constants';
import { IoMdArrowRoundBack } from 'react-icons/io';
import Spinner2 from '../ShimmerAndSpinner/Spinner2';
import { ThemeContext } from '../../Pages/ThemeContext';
import JobSculptLogo from '../../Functions/JobSculptLogo';
import { Snackbar } from '@mui/material';
import { Alert } from '@mui/material';
const Login = () => {

  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

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
        setIsLoading(true);
        const response = await axios.post( API_URL+ '/api/auth/login', {
          email: emailFormik.values.email,
          password: values.password,
        });
        setIsLoading(false);
        if (!response.data.token) {
          console.error('Login failed:', response.data);
          setSnackbarMessage("Login Failed! " + response.data.msg);
          setSnackbarSeverity("error");
          setOpenSnackbar(true);
          setIsLoading(false);
          return;
        }
        localStorage.setItem('token', response.data.token);
        if(theme != response.data.theme){
          toggleTheme();
        }

        if (response?.data?.profileCompleteStatus != 'Complete' && response.data.msg !== 'Email is not Verified') {
          navigate('/complete-profile');
          return;
        }
        if (response.data.msg === 'Email is not Verified') { 
          sendEmailVerificationLink();
          return;
        }
        navigate('/');
      } catch (err) {
        console.error('Login failed:', err);
        setSnackbarMessage("Login Failed! " + err.response.data.msg);
        setSnackbarSeverity("error"); 
        setOpenSnackbar(true);
        setIsLoading(false);
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
      localStorage.setItem('theme', res.data.theme);

      
      if (res?.data?.profileCompleteStatus != 'Complete') {
        navigate('/complete-profile');
        return;
      }
      navigate('/');
    } catch (err) {
      console.error('Login failed:', err);
      setSnackbarMessage("Login Failed! " + err.response.data.msg);
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      setIsLoading(false);
    }
  };
  

  return (
    <>

    <JobSculptLogo />
          
      <div className="flex items-center justify-center min-h-screen mt-20 p-2">
        <div className={`${theme =='dark' ?'bg-[#1e1e1e] border-[#3f3f3f]':'bg-[#ffffff] border-[#999999]'} w-[600px] h-[612.5px]  p-8 space-y-8 bg bg-opacity-90 rounded-xl border-2 `}>
          
          <div className="text-center">
          <div className="container">
            <div className="card flex items-center justify-center">
            <button onClick={() => setStep(1)} className=" text-[20px] relative -top-18 -left-52 hover:underline"
              style={{ color: theme == 'dark' ? 'white' : 'black' , visibility: step === 1 ? 'hidden' : 'visible' }}
              >
                <IoMdArrowRoundBack />
              </button>
              <div id="front" className={` text-[19px] ${theme == 'dark'? 'text-white':' text-aesthetic-black'}`}>
                Log in To JobSculpt
              </div>
            </div>
          </div>
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
                  className="w-full px-10 py-2 mt-1 text-gray-900 placeholder-gray-400 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                  placeholder="Email or Username"
                />
                {emailFormik.touched.email && emailFormik.errors.email ? (
                  <div className="absolute mt-1 text-xs text-red-500">{emailFormik.errors.email}</div>
                ) : null}
              </div>
              <div className="w-3/4">
                <button
                  type="submit"
                  className="relative w-full px-4 py-2 border-2 text-white text-whit rounded-lg bg-[#000000] "
                >
                  Continue
                </button>
              </div>
            </form>

            <p className={`${theme =='dark'? 'text-white':'text-black'} text-[14px] text-center after:content-[''] after:block after:w-1/2 after:mx-auto after:h-0.5 after:bg-gray-300 after:mt-4`}>
            Or
            </p>
            <div className=" flex items-center justify-center  ">
              <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => console.log('Google Login Failed')} />
            </div>

            <div className="text-center flex flex-col gap-10 items-center">
            <p className=" text-[16px] after:content-[''] after:block after:w-1/2 after:mx-auto after:h-0.5 after:bg-gray-300">
              Don't have a JobSculpt account? 
            </p>
            < Link to={"/choosetheme"} className=" border-2 w-48 py-2 bg-black text-white rounded-lg">
              Sign Up
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
                    disabled={isLoading}  
                    type="submit"
                     className={`relative w-full px-4 py-2 bg-black border-2 text-white rounded-lg  shadow-md 
                      ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}
                      `}
                  >
                    {
                      isLoading ? (
                        <div className="flex justify-center items-baseline  relative top-2">
                          <Spinner2 />
                        </div>
                      ): 'Log in'
                    }
                  </button>
                </div>
              </form>
              <p className="text-white text-[14px] text-center after:content-[''] after:block after:w-1/2 after:mx-auto after:h-0.5 after:bg-gray-300 after:mt-4">
            Or
            </p>
            {/* Google desgin */}
            <div className=" flex items-center justify-center" >

              <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => console.log('Google Login Failed')} />
            </div>
            </>
            )
          ) : null}
        </div>        
      </div>
      <MinFooter />
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Login;
