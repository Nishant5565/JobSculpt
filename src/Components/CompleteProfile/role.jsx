import React from 'react';
import { changeRole } from '../../Functions/CompleteProfile';

const Role = ({  theme , back, setShowRoleComponent,setSnackbarMessage,setOpenSnackbar, setSnackbarSeverity ,setUser,setUserInfo, isStarting}) => {

     const changeUserRole = async (role) => {
          const data = await changeRole(role);
          if(data.status == 200){
            if(isStarting == 'true'){
              setUserInfo(data.data.user);
              return;
            }
            setSnackbarMessage(data.data.msg);
            setOpenSnackbar(true);
            setSnackbarSeverity('success');
            setUser(data.data.user);
            setShowRoleComponent(false);
          }
          else{
            setSnackbarSeverity('error');
          }
     }
  return (
    <>
      <h1 className={`text-3xl  transition-all duration-500 font-bold text-center mb-2 `}>
          Start Your Journey
        </h1>
        
        <p className={`text-center mb-8 text-lg `}>
          Choose your path and start your journey with us. Whether you're a freelancer or looking to hire talent, we've got you covered!
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10" >
        <div className="p-6 bg-black text-white rounded-3xl shadow-lg transform transition-transform duration-300 hover:scale-105 cursor-pointer hover:shadow-xl"
          onClick = {() =>changeUserRole('freelancer')}
          >
            <h2 className="text-2xl font-semibold mb-4 text-center">I want to be a Freelancer</h2>
            <p className="mb-6">
              Discover endless job opportunities and grow your freelance career.
            </p>
            <button className={`w-full mt-10 py-3 px-4 rounded-full shadow-md  bg-white text-black transition-all duration-500 `}>
                Get Started
              </button>
          </div>

          <div className="p-6 bg-white text-black rounded-3xl shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl  duration-300 cursor-pointer"
          onClick = {() => changeUserRole('employer')}
          >
            <h2 className="text-2xl font-semibold mb-4 text-center">I want to Hire People</h2>
            <p className="mb-6">
              Post jobs and find talented freelancers for your projects.
            </p>
            <button className={`w-full mt-10 py-3 px-4 rounded-full shadow-md bg-black text-white transition-all duration-500 `}>                Get Started
              </button>
          </div>
        </div>
        {
               back && (
                <div className={`w-[200px] mt-10 py-3 px-4 rounded-full shadow-md bg-black text-white transition-all duration-500 text-center cursor-pointer hover:scale-105 border-2`}
                onClick = {() => setShowRoleComponent(false)}>
                     <p className="text-lg">Cancel</p>
                  </div>
                )
          }
          
     </>
  );
};

export default Role;
