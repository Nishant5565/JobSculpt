import React , {useState, useEffect}from 'react'
import { Link } from 'react-router-dom'
import { ThemeContext } from '../Pages/ThemeContext'
import { Website } from './Website'
import { AiOutlineWarning } from 'react-icons/ai'


const JobSculptLogo = () => {
     const {theme} = React.useContext(ThemeContext);
     const [isBackendUp, setIsBackendUp] = useState(true);
     const checkBackend = async () => {
       const response = await Website();
       if (response.status === 200) {
         setIsBackendUp(true);
       } else {
         setIsBackendUp(false);
       }
     };
   
     useEffect(() => {
       checkBackend();
       let intervalId;
       if (!isBackendUp) {
         intervalId = setInterval(checkBackend, 10000); // 10 seconds
       }
       return () => {
         if (intervalId) {
           clearInterval(intervalId);
         }
       };
     }, [isBackendUp]);
   
     if (!isBackendUp) {
       return (
         <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 ">
         <div className="bg-white p-20 rounded-[50px]  shadow-lg text-center">
           <div className="flex justify-center items-center">
           <AiOutlineWarning className="text-red-500 text-6xl mb-4" />
           </div>
           <h1 className="font-bold text-3xl text-gray-800 mb-2">
             Due to Inactivity the Backend Server is Down 
           </h1>
           <p className="text-gray-600 mb-4">
            Don't Worry, wait for few seconds, the website will automatically refresh once the server is up.
           </p>
   
         </div>
       </div>
       );
     }

     return (
     <Link to={'/'} className={`text-xl font-bold JobSculpt  top-10 left-10 ${theme != 'dark'? ' text-blue-600':'text-red-600'} absolute`}>
          JobSculpt
     </Link>
     )
}

export default JobSculptLogo