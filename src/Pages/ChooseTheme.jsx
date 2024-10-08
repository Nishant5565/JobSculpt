import React from 'react'
import { ThemeContext } from './ThemeContext'
import MinFooter from '../Components/Footer/MinFooter'
import { Link , useNavigate} from 'react-router-dom'
import { useContext , useState} from 'react'
import JobSculptLogo from '../Functions/JobSculptLogo'
import { updateTheme } from '../Functions/CompleteProfile'

const ChooseTheme = ({inPreview,setOpenSnackbar,setSnackbarMessage,setSnackbarSeverity,setPreviewOpenModal,setUpdatedUser}) => {
     const { theme, toggleTheme } = useContext(ThemeContext);
     const [loading, setLoading] = useState(false);
     const navigate = useNavigate();

     const handleUpdateTheme = (theme) => {
      if(inPreview){      
        setLoading(true);
        const token = localStorage.getItem('token');
        if(!token){
          navigate('/login');
        }
        updateTheme( theme).then((data) => {
          setLoading(false);
          setOpenSnackbar(true);
          setSnackbarMessage("Theme Updated Successfully");
          setSnackbarSeverity('success');
          setPreviewOpenModal(false);
          setUpdatedUser(data?.data?.user);
          
        });
        return;
       }
       else {
          navigate('/signup');
       }
      }
  return (
     <>
     <div className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-500 ${theme === 'dark' ? 'bg-black text-white' : 'bg-gray-100 text-gray-800'} p-2`}>
        {
          !inPreview && (
            <JobSculptLogo />
          )
        }       
       <div className={`container mx-auto max-w-3xl p-8 rounded-3xl border-2  shadow-2xl transition-all duration-500 ${theme == 'dark' && 'bg-[#131313] '} `}>

          {/* Select Your theme */}
          
          <h1 className={`text-3xl  transition-all duration-500 font-bold text-center mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>Choose Your Theme</h1>
          <p className={`text-center  transition-all duration-500 mb-8 text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>
          For a better user experience, choose a theme that suits you.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10" >
          <div className="p-6 bg-black text-white rounded-3xl shadow-lg transform transition-transform duration-300 hover:scale-105 cursor-pointer hover:shadow-xl"
          onClick = {() => theme == 'light' && toggleTheme('dark')}
          >
            <h2 className="text-2xl font-semibold mb-4">
                 Dark Theme
            </h2>
            <p className="mb-6">
                 Enable the dark mode for a more comfortable experience and reduced eye strain.
            </p>

          </div>

          <div className="p-6 bg-white rounded-3xl shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl  duration-300 cursor-pointer text-black"
          onClick = {() => theme== 'dark' && toggleTheme('light') }
          >
            <h2 className="text-2xl font-semibold mb-4">Light Theme</h2>
            <p className="mb-6">
                 Enable the light mode for a more vibrant experience and better readability.
            </p>
          </div>
        </div>   
        <Link to={!inPreview && '/signup' } >
              <button className={`w-full mt-10 py-3 px-4 rounded-full shadow-md ${theme === 'dark' ? 'text-black bg-white' : 'bg-black text-white'} transition-all duration-500 `}
              onClick = {() => {handleUpdateTheme(theme)}}
              >
               {
                  !inPreview ? 'Get Started' : 'Save Theme'
               }
              </button>
           </Link>       
          </div>

       </div>
       {
        !inPreview && (
          <MinFooter />
        )
       }

       
 
     </>
  )
}

export default ChooseTheme