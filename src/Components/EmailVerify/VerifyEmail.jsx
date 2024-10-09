import React ,{useEffect, useState, useContext}from 'react';
import { AiOutlineMail } from 'react-icons/ai'; // Importing icons
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../Functions/Constants';
import Logo from '../../assets/Images/LogoNoBg.png'
import JobSculptLogo from '../../Functions/JobSculptLogo';
import { ThemeContext } from '../../Pages/ThemeContext';

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [message , setMessage] = useState('')
  const { theme } = useContext(ThemeContext);

  const checkEmailVerified = async () => {
    const Maintoken = localStorage.getItem('token');
    try {
      const response = await axios.post(
        `${API_URL()}/api/auth/check-email-verified`,
        {},
        {
          headers: {
            'x-auth-token': Maintoken,
          },
        }
      );
      setMessage(response.data.msg)
      if (response.data.msg === 'Email is Verified') {
        navigate('/email-verified');
      }
    } catch (err) {
      console.error('Email is not Verified:', err);
    }
  };

  const sendEmailVerificationLink = async () => {
    const userToken = localStorage.getItem('token');
    if(!userToken){
      navigate('/login')
    }
    try {
      checkEmailVerified()  
      const response = await axios.post(
        `${API_URL()}/api/auth/send-email-verification-link`,
        {},
        {
          headers: {
            'x-auth-token': userToken,
          },
        }
      );
      if (response.data.msg === 'Email sent') {
        setMessage('Email sent')
      }
    } catch (err) {
      console.error('Email verification failed:', err);
    }
  };

  useEffect(() => {
    sendEmailVerificationLink();
  }, []);



  return (
    <>
    <JobSculptLogo/>
    <div className={`${theme === 'dark' ? 'bg-[#131313]' : 'bg-[#f5f5f5]'} rounded-[25px] p-6 min-h-screen flex items-center justify-center`}>
    <div className={`${theme === 'dark' ? 'bg-[#222222]' : 'bg-white'} container mx-auto max-w-4xl p-10 sm:p-20 rounded-3xl shadow-2xl transition-all duration-500`}>
        <div className="flex flex-col  items-center gap-40 space-y-6 ">
          <div className=" w-3/4">
            <p className=" text-center text-navy-blue">
               We have sent you an email. Please check your inbox and verify your email address.
            </p>
          </div>
        </div>
      <div className="text-center flex flex-col gap-10  items-center">
      <p className=" text-[16px] mt-20 after:content-[''] after:block after:w-1/2 after:mx-auto after:h-0.5 after:bg-gray-300">
        {
          message!=='' ? message : 'Verify your email to continue'
        }
      </p>
      < button className={`${theme === 'dark' ? 'bg-[#000000] text-white border-2' : 'bg-[#1e1e1e] text-white'} px-10 py-4  rounded-[10px] mt-10 `}
      onClick={() => 
        checkEmailVerified()
      }>
        Continue 
      </button>
    </div>
      </div>
    </div>

    </>
  );
};

export default VerifyEmail;
