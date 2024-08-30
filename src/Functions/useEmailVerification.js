import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from './Constants';

const useEmailVerification = () => {
  const [isVerified, setIsVerified] = useState(null);

  useEffect(() => {
    const checkEmailVerified = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsVerified(false);
        return;
      }

      try {
        const response = await axios.post(
          `${API_URL}/api/auth/check-email-validated`,
          {},
          {
            headers: {
              'x-auth-token': token,
            },
          }
        );
        setIsVerified(response.data.msg === 'Email is validated');
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