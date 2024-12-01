import React, { useEffect , useState} from 'react'
import LandingPage from '../Components/LandingPage/LandingPage'
import api_call from '../Functions/api_call';
const HomePage = () => {
     const [user, setUser] = useState();
     const {authuser} = api_call();
     const token = localStorage.getItem('token');

     useEffect(() => {
          if (token) {
               authuser().then((data) => {
                    setUser(data);
               });
          }

     }, []);

  return (
    <div>
          {
               !token ? <LandingPage /> : "Hello"
          }
    </div>
  )
}

export default HomePage