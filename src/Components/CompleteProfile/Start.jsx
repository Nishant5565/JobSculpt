import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Role from './role';

import { updateProfileCompleteStatus } from '../../Functions/CompleteProfile';

const Start = ({ user, setStep, theme }) => {
  const [isRoleConfirmed, setIsRoleConfirmed] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [showRoleComponent, setShowRoleComponent] = useState(false);

  const handleNext = () => {
    if (isRoleConfirmed && isTermsAccepted) {
      updateProfileCompleteStatus('UploadImage');
      setMessage(true);
      setStep('UploadImage'); 
    }
  };

  const handleRoleChange = () => {
    setShowRoleComponent(true); // Show the Role component
  };

  if (showRoleComponent) {
    return (

     <>
      <Role back = {true}  user = {user} setShowRoleComponent = {setShowRoleComponent} />
     </>
    )
  }

  return (
    <div className={`${theme === 'dark' ? 'bg-[#131313]' : 'bg-[#e7e7e7]'} rounded-[25px] p-6 mb-10 min-h-screen flex items-center justify-center `}>
      <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} container mx-auto max-w-4xl p-10 sm:p-20 rounded-3xl shadow-2xl transition-all duration-500`}>
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
                className="form-checkbox h-5 w-5 text-indigo-600"
                checked={isRoleConfirmed}
                onChange={() => setIsRoleConfirmed(!isRoleConfirmed)}
              />
              <span className={`ml-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                I am sure that I want to sign up as a/an <b>{user?.role}</b>. Afterwards, I can't change my role.
              </span>
            </label>
            <div className='flex gap-10 mt-2'>
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
                I accept the terms and conditions
              </span>
            </label>
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <button
            onClick={handleNext}
            className={`px-6 py-3 rounded-full text-white text-lg ${
              isRoleConfirmed && isTermsAccepted
                ? 'bg-indigo-600 hover:bg-indigo-500'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
            disabled={!isRoleConfirmed || !isTermsAccepted}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Start;
