import React from 'react';
import {  useNavigate, Link } from 'react-router-dom';
import { Container, Paper, Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import JobSculptLogo from '../../Functions/JobSculptLogo';
import { ThemeContext } from '../../Pages/ThemeContext';


const EmailVerified = () => {
  const navigate = useNavigate();
  const { theme } = React.useContext(ThemeContext);

  
  return (
     <>
      <JobSculptLogo />
      <div className={`${theme === 'dark' ? 'bg-[#131313]' : 'bg-[#f5f5f5]'} rounded-[25px] p-6 min-h-screen flex items-center justify-center`}>
      <div className={`${theme === 'dark' ? 'bg-[#222222]' : 'bg-white'} container mx-auto max-w-4xl p-10 sm:p-20 rounded-3xl shadow-2xl transition-all duration-500`}>

      <div className="flex flex-col  items-center gap-40 space-y-6 ">
          <div className="">
            <p className=" text-center text-navy-blue">
               Congratulations! Your email has been verified. Let's complete your profile.
            </p>
          </div>
        </div>

        < button className={`${theme === 'dark' ? 'bg-[#000000] text-white border-2' : 'bg-[#1e1e1e] text-white'} px-10 py-4  rounded-[10px] mt-10 `}
      onClick={() => 
        navigate('/complete-profile')
      }>
        Complete Profile
      </button>

      </div>
      </div>

    </>
  );
};

export default EmailVerified;