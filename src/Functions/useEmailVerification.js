import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from './Constants';
import { useNavigate } from 'react-router-dom';

const useEmailVerification = () => {
  const [isVerified, setIsVerified] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const checkEmailVerified = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await axios.post(
          `${API_URL}/api/auth/check-email-Verified`,
          {},
          {
            headers: {
              'x-auth-token': token,
            },
          }
        );
        setIsVerified(response.data.msg === 'Email is Verified');
      } catch (err) {
        console.error('Email verification check failed:', err);
        setIsVerified(false);
      }
    };

    checkEmailVerified();
  }, []);

  return isVerified;
};

export default useEmailVerification;