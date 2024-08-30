import React ,{useEffect, useState}from 'react';
import { AiOutlineMail } from 'react-icons/ai'; // Importing icons
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../Functions/Constants';
import Logo from '../../assets/Images/LogoNoBg.png'

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [message , setMessage] = useState('')
  const checkEmailValidated = async () => {
    const Maintoken = localStorage.getItem('token');
    console.log(Maintoken);
    try {
      const response = await axios.post(
        `${API_URL}/api/auth/check-email-validated`,
        {},
        {
          headers: {
            'x-auth-token': Maintoken,
          },
        }
      );
      setMessage(response.data.msg)
      if (response.data.msg === 'Email is validated') {
        navigate('/');
      }
    } catch (err) {
      console.error('Email is not validated:', err);
    }
  };

  const sendEmailVerificationLink = async () => {
    const userToken = localStorage.getItem('token');
    try {
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
        console.log('Email sent');
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
    <h1 className="text-xl font-bold animate__animated animate__fadeIn animate__delay-2s text-clip bg-gradient-to-tr from-[#495bff] to-[#ff006e] bg-clip-text text-transparent ml-4 mt-4 top-0 left-0 cursor-pointer fixed">
    <span className="font-greatvibes ml-2">
      J
    </span>
    ob
    <span className=' font-greatvibes'>
      S
    </span>
    culpt 
    </h1>
    <img src={Logo} alt="" className='w-40 mx-auto  top-0 right-0 fixed' />

    <div className="border-2 border-light-blue flex flex-col items-center mx-96 rounded-lg my-20 py-10">
    <div className="flex items-center justify-center h-96">
      <div className="w-[500px] p-8 space-y-8 bg-white bg-opacity-90 rounded-xl ">
        <div className="flex flex-col items-center space-y-6">
          <div className="relative w-3/4">
            <p className=" text-center text-navy-blue">
               We have sent you an email. Please check your inbox and verify your email address.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div className="text-center flex flex-col gap-10 items-center">
      <p className="text-gray-500 text-[16px] after:content-[''] after:block after:w-1/2 after:mx-auto after:h-0.5 after:bg-gray-300">
        {
          message!=='' ? "Email not verified" : 'Verify your email to continue'
        }
      </p>
      < button className="text-[#495bff] border-2 w-48 py-2 border-[#495bff] rounded-lg" onClick={() => 
        checkEmailValidated()
      }>
        Continue 
      </button>
    </div>
    </div>
    </>
  );
};

export default VerifyEmail;
