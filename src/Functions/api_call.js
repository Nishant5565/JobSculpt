import React, {useEffect, useState} from 'react'
import { API_URL } from './Constants';
import { useNavigate } from 'react-router-dom';
const api_call = () => {
     const [user, setUser] = useState({});
      const navigate = useNavigate();

      const checkTokenValidity = async (token) => {

        if (!token) {
          return 'No token found';
        }

        try {
          const response = await fetch(API_URL() + '/api/auth/check-token', {
            method: 'POST',
            headers: {
              'x-auth-token': token,
            },

          });
          const data = await response.json();
          if (data.msg === 'Token is not valid') {
            alert('Token Expired');
            navigate('/login');
            return data;
          }
          return data;
        } catch (error) {
          console.error('Error checking token:', error);
          localStorage.removeItem(token);
          navigate('/login');
          return error;
        }
      }
  
     const authuser = async () => {
          const token = localStorage.getItem('token');
          if (!token) {
            return 'No token found';
          }
  
          try {
            const response = await fetch(API_URL() + '/api/auth/auth-user', {
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
            if(data == null){
              localStorage.removeItem('token');
              navigate('/login');
              return;
            }
            setUser(data);

            if(data?.profileCompleteStatus != "Complete" && data?.emailVerified) {
              navigate('/complete-profile');
            }
            if (!data.emailVerified) {
              navigate('/verify-email');
            }
            return data;
          } catch (error) {
            console.error('Error fetching user info:', error);
            localStorage.removeItem('token');
            navigate('/login');
            return error;
          }
        };
        useEffect(() => {
          authuser();
        }
     , []);

     const logout = () => {
      const token = localStorage.getItem('token');
      if (!token) {
        return 'No token found';
      }

      const response = fetch(API_URL() + '/api/auth/logout', {
        method: 'POST',
        headers: {
          'x-auth-token': token,
        },
      });
      localStorage.removeItem('token');
      navigate('/login');
      return response;
    }

    const fetchApi = async (url, method, body) => {

      const token = localStorage.getItem('token');
      if (!token) {
        return 'No token found';
      }

      try {
        const response = await fetch(API_URL() + url, {
          method: method,
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
          body: JSON.stringify(body),
        });
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching data:', error);
        return error;
      }
    }







  return (
     {authuser, user, checkTokenValidity,fetchApi}
  )
}

export default api_call