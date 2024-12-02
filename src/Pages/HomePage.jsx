import React, { useEffect , useState} from 'react'
import EmployerLandingPage from '../Components/LandingPage/EmployerLandingPage'
import FreelancerLandingPage from '../Components/LandingPage/FreelancerLandingPage'
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
                    !token ? <LandingPage /> : (
                         user?.role == 'employer' ? <EmployerLandingPage /> : <FreelancerLandingPage />
                    )
               }
          </div>
     )
}

export default HomePage