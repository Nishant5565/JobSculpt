import axios from 'axios';
import { API_URL } from './Constants';

export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export const checkUsername = async (userName, setUsernameAvailable) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(API_URL() + '/api/auth/check-username', {
      userName,
    }, {
      headers: {
        'x-auth-token': token,
      },
    });

    if (response.status !== 200) {
      console.error('Username check failed:', response.data);
      return;
    }
    setUsernameAvailable(response.data.msg);
  } catch (err) {
    console.error('Username check failed:', err);
  }
};

export const handleGoogleSuccess = async (response, role, navigate) => {
  try {
    const data = {
      token: response.credential, 
      role: role,
    };
    const res = await axios.post(API_URL() + '/api/auth/google', data);
    if (!res.data.token) {
      console.error('Login failed:', res.data);
      return;
    }
    localStorage.setItem('token', res.data.token);
    navigate('/complete-profile');
  } catch (err) {
    console.error('Login failed:', err);
  }
};

export const registerUser = async (emailFormik, values, role, setIsLoading, navigate, setMessages) => {
  try {
    setIsLoading(true);
    const response = await axios.post(API_URL() + '/api/auth/register', {
      userName: emailFormik.values.userName,
      email: emailFormik.values.email,
      password: values.password,
      role: role,
    });
    setIsLoading(false);
    if (response.status !== 200) {
      console.error('Registration failed:', response.data);
      setMessages('Registration failed');
      return error;
    } else if (response.data.msg === 'User already exists') {
      setMessages(['User already exists']);
      return 'User already exists';
    } else {
      navigate('/verify-email');
    }
    localStorage.setItem('token', response.data.token);
  } catch (err) {
    console.error('Registration failed:', err);
  }
};