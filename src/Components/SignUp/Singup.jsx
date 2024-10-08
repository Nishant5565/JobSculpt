import React, { useState, useEffect, useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import { GoogleLogin } from '@react-oauth/google';
import MinFooter from '../Footer/MinFooter';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa";
import VerifyEmail from '../EmailVerify/VerifyEmail';
import { IoMdArrowRoundBack } from "react-icons/io";
import './Signup.css';
import Spinner2 from '../ShimmerAndSpinner/Spinner2';
import { ThemeContext } from '../../Pages/ThemeContext';
import { debounce, handleGoogleSuccess } from '../../Functions/SignupApi';
import ShowMessage from '../ShowMessage/ShowMessage';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import { API_URL } from '../../Functions/Constants';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import JobSculptLogo from '../../Functions/JobSculptLogo';


const Signup = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useContext(ThemeContext);
  const { role } = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

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
  const registerUser = async (emailFormik, values, role, setIsLoading, navigate) => {
      try {
        setIsLoading(true);
        const response = await axios.post(API_URL + '/api/auth/register', {
          userName: emailFormik.values.userName,
          email: emailFormik.values.email,
          password: values.password,
          role: role,
          theme: theme
        });
        setIsLoading(false);
    
        if (response.status !== 200) {
          console.error('Registration failed:', response.data);
          setSnackbarMessage("Registration failed. Please try again later.");
          setSnackbarSeverity("error");
          setOpenSnackbar(true);
          setIsLoading(false);
          return error;
        } else if (response.data.msg === 'User already exists') {
          setSnackbarMessage(['User already exists']);
          setSnackbarSeverity('error');
          setOpenSnackbar(true);
          setIsLoading(false);
          return 'User already exists';
        } else {
          setSnackbarMessage('Registration successful! Redirecting to email verification page...');
          setSnackbarSeverity('success');
          setOpenSnackbar(true);
          navigate('/verify-email');
        }
        localStorage.setItem('token', response.data.token);
      } catch (err) {
        console.error('Registration failed:', err);
        setSnackbarMessage("Registration failed. Please try again later.");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
        setIsLoading(false);
      }
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
    onSubmit: values => registerUser(emailFormik, values, role, setIsLoading, navigate),
    
  });




  return (
    <>
    <JobSculptLogo />
      <div className={`flex items-center justify-center min-h-screen mt-20 transition-all duration-500`}>
        <div className={`w-[600px] p-8 min-h-[612.5px] space-y-8 bg-opacity-90 rounded-xl border-2 ${theme == "dark" ? "bg-[#0e0e0e] border-[#3f3f3f]" : "bg-[#ffffff] border-[#999999]"}`}>
          <div className="text-center">
          <div className="container">
            <div className="card">
              <div id="front" className={` text-[19px] pb-2 ${theme == 'dark'? 'text-white border-b-2 border-white':' text-aesthetic-black border-b-2 border-black'}`}>
                Sign Up To JobSculpt
              </div>
            </div>
          </div>
          </div>

          {step === 1 ? (
            <>
              <form onSubmit={emailFormik.handleSubmit} className={`space-y-6 flex flex-col items-center`}>
                <div className="relative w-3/4">
                  <AiOutlineMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={emailFormik.handleChange}
                    onBlur={emailFormik.handleBlur}
                    value={emailFormik.values.email}
                    className="w-full px-10 py-2 mt-1 text-gray-900 placeholder-gray-400 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                    placeholder="Email"
                  />
                  {emailFormik.touched.email && emailFormik.errors.email ? (
                    <div className="absolute text-xs text-red-600">{emailFormik.errors.email}</div>
                  ) : null}
                </div>
                <div className="w-3/4">
                  <button
                    type="submit"
                    className={` bg-black relative w-full px-4 py-2 text-white border-2 rounded-lg `}
                  >
                    Continue as a {role}
                  </button>
                </div>
              </form>
              <p className={` text-[14px] text-center after:content-[''] after:block after:w-1/2 after:mx-auto after:h-0.5 after:bg-gray-300 after:mt-4`}>
                Or
              </p>
              <div className="flex items-center justify-center">
                <GoogleLogin onSuccess={(response) => handleGoogleSuccess(response, role, navigate)} onError={() => console.log('Google Login Failed')} />
              </div>
              <p className="text-[16px] after:content-[''] after:block after:w-1/2 after:mx-auto after:h-0.5 after:bg-gray-300 text-center">
                Already have a JobSculpt account?
              </p>
              <div className="flex items-center justify-center">
                <Link to={"/login"} className="text-[#ffffff] border-2 w-48 py-2 bg-black rounded-lg text-center">
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
                  type={showPassword ? 'text' : 'password'}
                  onChange={passwordFormik.handleChange}
                  onBlur={passwordFormik.handleBlur}
                  value={passwordFormik.values.password}
                  className="w-full px-10 py-2 mt-1 text-gray-900 placeholder-gray-400 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:gray-blue-400 focus:border-transparent"
                  placeholder="Enter your password"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </div>
                {passwordFormik.touched.password && passwordFormik.errors.password ? (
                  <div className="absolute text-xs text-red-600">{passwordFormik.errors.password}</div>
                ) : null}
              </div>
              <div className="relative w-3/4">
                <AiOutlineLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  onChange={passwordFormik.handleChange}
                  onBlur={passwordFormik.handleBlur}
                  value={passwordFormik.values.confirmPassword}
                  className="w-full px-10 py-2 mt-1 text-gray-900 placeholder-gray-400 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:gray-blue-400 focus:border-transparent"
                  placeholder="Confirm your password"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </div>
                {passwordFormik.touched.confirmPassword && passwordFormik.errors.confirmPassword ? (
                  <div className="absolute text-xs text-red-600">{passwordFormik.errors.confirmPassword}</div>
                ) : null}
              </div>
              <div className="w-3/4">
                <button
                  disabled={isLoading}
                  type="submit"
                  className={` bg-black border-2 relative w-full px-4 py-2 text-white rounded-lg shadow-md ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  {isLoading ? (
                    <div className="flex justify-center items-baseline relative top-2">
                      <Spinner2 />
                    </div>
                  ) : 'Sign Up'}
                </button>
              </div>
              <p className="text-white text-[14px] after:content-[''] after:block after:w-1/2 after:mx-auto after:h-0.5 after:bg-gray-300 after:mt-20 pt-20">
                Note
                <ul className="text-white text-[14px] ml-4 mt-10">
                  <li>Password must be at least 6 characters</li>
                  <li>Password must contain at least one uppercase letter, one lowercase letter, one number and one special character</li>
                </ul>
              </p>
            </form>
          )}
        </div>
      </div>
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
      <MinFooter />
    </>
  );
};

export default Signup;