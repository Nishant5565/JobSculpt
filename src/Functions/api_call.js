import React, {useEffect, useState} from 'react'
import { API_URL } from './Constants';
import { useNavigate } from 'react-router-dom';
const api_call = () => {
     const [user, setUser] = useState({});
      const navigate = useNavigate();
     const authuser = async () => {
          const token = localStorage.getItem('token');
          if (!token) {
            console.log('No token found');
            return;
          }
    
          try {
            const response = await fetch(API_URL + '/api/auth/auth-user', {
              method: 'POST',
              headers: {
                'x-auth-token': token,
              },
            });
            if(response.status === 401){
              navigate('/login');
              localStorage.removeItem('token');
            }
            const data = await response.json();
            setUser(data);
            return data;

          } catch (error) {
            console.error('Error fetching user info:', error);
            navigate('/login');
            return error;
          }
        };
        useEffect(() => {
          authuser();
        }
     , []);
  return (
     {authuser, user}
  )
}

export default api_call