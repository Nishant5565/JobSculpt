import React from 'react';
import { Navigate } from 'react-router-dom';
import useEmailVerification from '../Functions/useEmailVerification';
const ProtectedRoute = ({ children }) => {
  const isVerified = useEmailVerification();

  if (isVerified === null) {
    return <div>Loading...</div>; // or a loading spinner
  }

  return isVerified ? children : <Navigate to="/verify-email" />;
};

export default ProtectedRoute;