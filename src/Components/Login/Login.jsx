import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai'; // Importing icons
import Logo from '../../assets/Images/userProfile.png';
import MinFooter from '../Footer/MinFooter';

const Login = () => {
  const [step, setStep] = useState(1);

  const emailFormik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
    }),
    onSubmit: values => {
      setStep(2);
    },
  });

  const passwordFormik = useFormik({
    initialValues: {
      password: '',
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Required'),
    }),
    onSubmit: values => {
      console.log({ email: emailFormik.values.email, password: values.password });
    },
  });

  return (
    <>
      <h1 className="text-xl font-bold animate__animated animate__fadeIn animate__delay-2s text-clip bg-gradient-to-tr from-[#495bff] to-[#ff006e] bg-clip-text text-transparent ml-4 mt-4 cursor-pointer">
        <span className="font-greatvibes ml-2">
          J
        </span>
        ob
        <span className=' font-greatvibes'>
          S
        </span>
        culpt
      </h1>

      <div className="flex items-center justify-center min-h-screen mt-20">
        <div className=" w-[500px] p-8 space-y-8 bg-white bg-opacity-90 rounded-xl border-2">
          <div className="text-center">
            <h2 className="text-[28px] text-gray-900">
              {step === 1 ? 'Log in to JobScuplt' : 'Enter Your Password'}
            </h2>
          </div>

          {step === 1 ? (
            <form onSubmit={emailFormik.handleSubmit} className="space-y-6 flex flex-col items-center  ">
              <div className="relative w-3/4 "> 
                <AiOutlineMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={emailFormik.handleChange}
                  onBlur={emailFormik.handleBlur}
                  value={emailFormik.values.email}
                  className="w-full px-10 py-2 mt-1 text-gray-900 placeholder-gray-400 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  placeholder="Email or Username"
                />
                {emailFormik.touched.email && emailFormik.errors.email ? (
                  <div className="absolute text-xs text-red-600">{emailFormik.errors.email}</div>
                ) : null}
              </div>
              <div className="w-3/4">
                <button
                  type="submit"
                  className="relative w-full px-4 py-2 text-white  text-whit rounded-lg bg-[#495bff] shadow-md hover:bg-[#6473f8]"
                >
                  Continue
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={passwordFormik.handleSubmit} className="space-y-6 flex flex-col items-center">
              <div className="relative w-3/4">
                <AiOutlineLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={passwordFormik.handleChange}
                  onBlur={passwordFormik.handleBlur}
                  value={passwordFormik.values.password}
                  className="w-full px-10 py-3 mt-1 text-gray-900 placeholder-gray-400 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  placeholder="Enter your password"
                />
                {passwordFormik.touched.password && passwordFormik.errors.password ? (
                  <div className="absolute text-xs text-red-600">{passwordFormik.errors.password}</div>
                ) : null}
              </div>
              <div className="w-3/4">
                <button
                  type="submit"
                  className="relative w-full px-4 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-md hover:bg-gradient-to-l hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
                >
                  Login
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      <MinFooter />
    </>
  );
};

export default Login;
