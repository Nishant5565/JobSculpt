import React, { useState, useContext , useEffect} from 'react';
import { ThemeContext } from '../../Pages/ThemeContext';
import { useParams, useNavigate } from 'react-router-dom';
import { Alert, Snackbar } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { API_URL } from '../../Functions/Constants';
import JobSculptLogo from '../../Functions/JobSculptLogo';
import Spinner2 from '../ShimmerAndSpinner/Spinner2';
import { AiOutlineLock } from 'react-icons/ai';
import MinFooter from '../Footer/MinFooter';
import api_call from '../../Functions/api_call';

const ResetPassword = () => {
  const { theme } = useContext(ThemeContext);
  const { token } = useParams();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {checkTokenValidity} = api_call();

     useEffect(() => {
           checkTokenValidity(token).then((data) => {
               console.log(data);
                if (data.msg === 'Token is valid') {
                    setSnackbarMessage('You can Change your password');
                    setSnackbarSeverity('success');
                    setOpenSnackbar(true);
               }
          });

     }, []);
  const handleResetPassword = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(API_URL() + '/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: values.password,
          token,
        }),
      });
      const data = await response.json();
      if (data.error) {
        setSnackbarMessage(data.error);
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
        setLoading(false);
      } else {
        setSnackbarMessage('Password reset successfully');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
        setLoading(false);
        navigate('/login');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setSnackbarMessage('Error resetting password');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      setLoading(false);
    }
  };

  return (
    <>
      <JobSculptLogo />
      <div className="flex items-center justify-center min-h-screen mt-20 p-2">
        <div className={`${theme === 'dark' ? 'bg-[#1e1e1e] border-[#3f3f3f]' : 'bg-[#ffffff] border-[#999999]'} w-[600px] h-[612.5px] p-8 space-y-8 bg-opacity-90 rounded-xl border-2`}>
          <div className="text-center">
            <div className="container">
              <div className="card flex items-center justify-center">
                <div id="front" className={`text-[19px] ${theme === 'dark' ? 'text-white' : 'text-aesthetic-black'}`}>
                  Reset Your Password
                </div>
              </div>
            </div>
          </div>

          <Formik
            initialValues={{ password: '', confirmPassword: '' }}
            validationSchema={Yup.object({
              password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .required('Required'),
              confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Required'),
            })}
            onSubmit={handleResetPassword}
          >
            {formik => (
              <form onSubmit={formik.handleSubmit} className="space-y-6 flex flex-col items-center">
                <div className="relative w-3/4">
                  <AiOutlineLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    className="w-full px-10 py-2 mt-1 text-gray-900 placeholder-gray-400 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    placeholder="Enter your new password"
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="absolute text-xs text-red-600">{formik.errors.password}</div>
                  ) : null}
                </div>
                <div className="relative w-3/4">
                  <AiOutlineLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmPassword}
                    className="w-full px-10 py-2 mt-1 text-gray-900 placeholder-gray-400 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    placeholder="Confirm your new password"
                  />
                  {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                    <div className="absolute text-xs text-red-600">{formik.errors.confirmPassword}</div>
                  ) : null}
                </div>
                <div className="w-3/4">
                  <button
                    disabled={loading}
                    type="submit"
                    className={`relative w-full px-4 py-2 bg-black border-2 text-white rounded-lg shadow-md ${loading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    {loading ? (
                      <div className="flex justify-center items-baseline relative top-2">
                        <Spinner2 />
                      </div>
                    ) : 'Reset Password'}
                  </button>
                </div>
              </form>
            )}
          </Formik>
            
        </div>
      </div>
      <MinFooter />
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ResetPassword;