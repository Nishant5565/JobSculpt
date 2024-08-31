import React ,{useEffect, useState}from 'react';
import { AiOutlineMail } from 'react-icons/ai'; // Importing icons
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../Functions/Constants';
import Logo from '../../assets/Images/LogoNoBg.png'

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [message , setMessage] = useState('')


  const checkEmailVerified = async () => {
    const Maintoken = localStorage.getItem('token');
    try {
      const response = await axios.post(
        `${API_URL}/api/auth/check-email-verified`,
        {},
        {
          headers: {
            'x-auth-token': Maintoken,
          },
        }
      );
      setMessage(response.data.msg)
      if (response.data.msg === 'Email is Verified') {
        navigate('/');
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
        `${API_URL}/api/auth/send-email-verification-link`,
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
      <Link to={'/'} className="text-xl font-bold text-aesthetic-green relative top-10 left-10">
          JobSculpt
      </Link>
    <div className="flex justify-center mt-40 ">
      <div className="w-[500px] p-8 space-y-8 bg-white bg-opacity-90 rounded-xl border-2 border-aesthetic-green h-96 ">
        <div className="flex flex-col  items-center gap-40 space-y-6 ">
          <div className=" w-3/4">
            <p className=" text-center text-navy-blue">
               We have sent you an email. Please check your inbox and verify your email address.
            </p>
          </div>
        </div>
      <div className="text-center flex flex-col gap-10  items-center">
      <p className="text-gray-500 text-[16px] mt-20 after:content-[''] after:block after:w-1/2 after:mx-auto after:h-0.5 after:bg-gray-300">
        {
          message!=='' ? message : 'Verify your email to continue'
        }
      </p>
      < button className=" text-aesthetic-green border-2 w-48 mt-10 py-2 border-aesthetic-green rounded-lg" onClick={() => 
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
