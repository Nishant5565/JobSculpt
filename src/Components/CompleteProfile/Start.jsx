import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Role from './role';
import { Snackbar, Alert } from '@mui/material';

import { updateProfileCompleteStatus } from '../../Functions/CompleteProfile';

const Start = ({ userInfo, setStep, theme }) => {
  const [isRoleConfirmed, setIsRoleConfirmed] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [showRoleComponent, setShowRoleComponent] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [user , setUser] = useState(userInfo);

  const handleNext = () => {
    if (isRoleConfirmed && isTermsAccepted) {
      updateProfileCompleteStatus('UploadImage');
      setStep('UploadImage'); 
    }
  };


  const handleRoleChange = () => {
    setShowRoleComponent(true); // Show the Role component
  };

  if (showRoleComponent) {
    return (

     <>
      <Role back = {true}  user = {user} setShowRoleComponent = {setShowRoleComponent} setSnackbarMessage = {setSnackbarMessage} setOpenSnackbar = {setOpenSnackbar} setSnackbarSeverity = {setSnackbarSeverity} setUser = {setUser} />
     </>
    )
  }

  return (
    <>
        <p className={`text-center mb-8 text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
          Now let's complete your profile to get started with JobSculpt
        </p>
        <p className={`text-center mb-8 text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
        Completing your profile gives you better visibility and helps others know more about you!
        </p>
        {/* Checkboxes for user agreement */}
        <div className=" flex flex-col gap-8 justify-center">
          <div>
            <label className=" flex items-center cursor-pointer">
            <input
                type="checkbox"
                className="h-5 w-5"
                style={
                  {
                    backgroundColor: theme === 'dark' ? '#4B5563' : '#F3F4F6',
                  }
                }
                checked={isRoleConfirmed}
                onChange={() => setIsRoleConfirmed(!isRoleConfirmed)}
              />
              <span className={`ml-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                I am sure that I want to sign up as a/an {user?.role}. Afterwards, I can't change my role.
              </span>
            </label>
            <div className='flex gap-2 mt-2'>
              <p className={` ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Want to change your role?
              </p>
            <button
              className="text-blue-500 underline text-center "
              onClick={handleRoleChange}
            >
              Change role
            </button>
            </div>
          </div>

          <div>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-indigo-600"
                checked={isTermsAccepted}
                onChange={() => setIsTermsAccepted(!isTermsAccepted)}
              />
              <span className={`ml-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                I accept the terms and conditions of JobSculpt  <a href="#" className="text-blue-500 underline">Terms of Service</a> and <a href="#" className="text-blue-500 underline">Privacy Policy</a>
              </span>
            </label>
          </div>
        </div>

        <div className="flex justify-end mt-10">
          <button
            onClick={handleNext}
            className={`px-10 py-3 rounded-full ${theme !== 'dark' ? 'bg-white text-black hover:bg-black hover:text-white border-2 border-black' : 'bg-black text-white hover:bg-white hover:text-black '} transition-all duration-300\
            hover:scale-105
            ${!isRoleConfirmed || !isTermsAccepted ? 'cursor-not-allowed' : 'cursor-pointer'}
            `}
            disabled={!isRoleConfirmed || !isTermsAccepted}
          >
            Next
          </button>
        </div>

        <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      </>
  );
};

export default Start;
