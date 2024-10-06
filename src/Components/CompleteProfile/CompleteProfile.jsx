import React ,{useContext , useState, useEffect}from 'react'
import { ThemeContext } from '../../Pages/ThemeContext'
import api_call from '../../Functions/api_call'
import { checkUsername} from '../../Functions/SignupApi'
import UserDetail from './UserDetail'
import MinFooter from '../Footer/MinFooter'
import UploadImage from './UploadImage'
import Start from './Start'
import { Link } from 'react-router-dom'
import Role from './role'
import Navbar from '../Navbar/Navbar'
import ProfileLoading from './ProfileLoading'
import Education from './Education'

const CompleteProfile = () => {

     const {theme} = useContext(ThemeContext);
     const {authuser} = api_call();
     const [userInfo , setUserInfo] = useState(null);
     const [isLoggedIn , setIsLoggedIn] = useState(false);
     const[loading, setLoading] = useState(false);
     const [step, setStep] = useState(''); //  Steps : Start , UploadImage,  UserDetail , Education , Work , Skills , Finish
    //  Steps : Start , UploadImage,  UserDetail , Education , Work , Skills , Finish
     useEffect(() => {
      setLoading(true);
       const user = localStorage.getItem("token");
       if (user) {
        
         authuser().then((data) => {
          console.log(data);
           if (data) {
             setIsLoggedIn(true);
             setUserInfo(data);
             console.log(data);
             setStep(data?.profileCompleteStatus);
              setLoading(false); 
           }

         });  
       }
     }, []);


  if(loading){
    return (
    <>
    <Link to={'/'} className={`text-xl font-bold JobSculpt top-14 left-14 ${theme === 'dark' ? 'text-red-500' : ''}  absolute`}>
        JobSculpt
      </Link>
     <div className={`  ${theme === 'dark' ? 'bg-black' : 'bg-white'} p-10 mb-10 min-h-screen `}>

    <ProfileLoading theme = {theme} />

    </div>
    </>
    
    )
  }


  return (
     <>
     {/* <Navbar /> */}
     
    <Link to={'/'} className={`text-xl font-bold JobSculpt top-14 left-14 ${theme === 'dark' ? 'text-red-500' : ''}  absolute`}>
        JobSculpt
      </Link>
     <div className={`  ${theme === 'dark' ? 'bg-black' : 'bg-white'} p-10 mb-10`}>

    {
      step == "Incomplete" ? (
        userInfo?.role == 'user' ?  <Role setStep={setStep} theme = {theme} user = {userInfo}/> : <Start setStep={setStep} theme = {theme} user = {userInfo} />
      ): null
    }

    { step == 'UploadImage' && <UploadImage user={userInfo} setStep = {setStep} theme = {theme}/>}
    { step == 'UserDetail' && <UserDetail userInfo={userInfo} setStep = {setStep} theme = {theme}/>}
    { step == 'Education' && <Education user={userInfo} setStep = {setStep} theme = {theme} page ={ "education"}/>}
    { step == 'Work' && <Education user={userInfo} setStep = {setStep} theme = {theme} page ={ "workExperience"}/>}
     </div>
      <MinFooter />   

     </>
  )
}    

export default CompleteProfile