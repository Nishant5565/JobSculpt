import React from 'react'
import { useNavigate } from 'react-router-dom';
import { API_URL } from './Constants';
import axios from 'axios'; 
import { useState } from 'react';

const Api = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  //* Function to check if the user is verified or not and if the token is valid or not

  const authUser = async () => {
    const token = localStorage.getItem('token');
    if(!token){
      navigate('/login');
    }
    try{
      const response = await axios.get(`${API_URL}/auth-user`, 
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const data = response.data.data.user;
      if (response.status == 401 || response.status == 404) {
        localStorage.removeItem('token');
        navigate('/login');
      }
      return data;
    }
    catch(error){
      console.error('Error:', error);
    }
  }

  const fetchApi = async(method, path,parent ) =>{
    setIsLoading(true);
    const token = localStorage.getItem('token');
    try {
      const response = await axios({
        method: method,
        url: `${API_URL}/${path}`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      setIsLoading(false);
      return response;
  }
  catch(error){
    setIsLoading(false);
    if(parent === 'navbar' && error.response.status === 401){
      localStorage.removeItem('token');
      navigate('/login');
    }
    return error;
  }
}

// * Function to login the user

const login = async(values) => {
      setIsLoading(true);
        try {
          const response = await fetch( `${API_URL}/login` , {
              method: 'POST',
              headers: {
                    'Content-Type': 'application/json',
                    "accept": "application/json"
              },
              body: JSON.stringify(values),
          });
          const data = await response.json();     
          if (response.status == 200 || response.status == 204) {
              setIsLoading(false);
              localStorage.setItem('token', data?.access_token);
              authUser().then((data) => {  
                    if(data?.email_verified_at == null){
                        navigate('/verify');
                    }
              });
              navigate('/');
          } else {
              setIsLoading(false);
          }
      } catch (error) {
        setIsLoading(false);
          if (error){
          }
          console.error('Error:', error);
      }
}

  return (
    {authUser , fetchApi , login, isLoading} 
  )
}

export default Api