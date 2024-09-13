import React, {useEffect, useState} from 'react'
import { API_URL } from './Constants';

const api_call = () => {
     const [user, setUser] = useState({});
     const authuser = async () => {
          const token = localStorage.getItem('token');
          if (!token) {
            navigate('/login');
            return;
          }
    
          try {
            const response = await fetch(API_URL + '/api/auth/auth-user', {
              method: 'POST',
              headers: {
                'x-auth-token': token,
              },
            });
            const data = await response.json();
            setUser(data);
            return data;

          } catch (error) {
            console.error('Error fetching user info:', error);
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