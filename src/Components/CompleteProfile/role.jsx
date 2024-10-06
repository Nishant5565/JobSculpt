import React from 'react';
import { changeRole } from '../../Functions/CompleteProfile';

const Role = ({  theme , back, setShowRoleComponent}) => {

     const changeUserRole = async (role) => {
          await changeRole(role);
     }
  return (
     <div className={`  ${theme === 'dark' ? 'bg-[#131313]' : 'bg-[#e7e7e7]'} rounded-[25px] p-6 mb-10 min-h-screen flex items-center justify-center`}>
     <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} container mx-auto max-w-4xl p-20 rounded-3xl shadow-2xl transition-all duration-500 `}>


        <h1 className="text-center text-4xl font-bold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 dark:from-[#09ffff] dark:to-[#b854ff]">
          Start Your Journey
        </h1>
        
        <p className={`text-center mb-8 text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
          Choose your path and start your journey with us. Whether you're a freelancer or looking to hire talent, we've got you covered!
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10" >
          <div className="p-6 bg-gradient-to-br from-blue-500 to-green-400 dark:from-green-500 dark:to-blue-600 text-white rounded-3xl shadow-lg transform transition-transform duration-300 hover:scale-105 cursor-pointer hover:shadow-xl"
          onClick = {() =>changeUserRole('freelancer')}
          >
            <h2 className="text-2xl font-semibold mb-4 text-center">I want to be a Freelancer</h2>
            <p className="mb-6">
              Discover endless job opportunities and grow your freelance career.
            </p>
              <button className="w-full py-3 bg-white text-blue-600 dark:text-blue-700 rounded-full shadow-md ">
                Get Started
              </button>
          </div>

          <div className="p-6 bg-gradient-to-br from-purple-500 to-pink-400 dark:from-pink-600 dark:to-purple-700 text-white rounded-3xl shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl  duration-300 cursor-pointer"
          onClick = {() => changeUserRole('employer')}
          >
            <h2 className="text-2xl font-semibold mb-4 text-center">I want to Hire People</h2>
            <p className="mb-6">
              Post jobs and find talented freelancers for your projects.
            </p>
              <button className="w-full py-3 bg-white text-purple-600 dark:text-purple-700 rounded-full shadow-md">
                Get Started
              </button>
          </div>
        </div>
        {
               back && (
                     <div className="flex items-center mt-10 cursor-pointer" onClick = {() => setShowRoleComponent(false)}>
                     <p className="text-gray-500 text-lg">Cancel</p>
                     </div>
                )
          }
          
      </div>
     </div>
  );
};

export default Role;
