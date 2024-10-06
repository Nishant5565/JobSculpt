import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './Components/LandingPage/LandingPage';
import Layout from './Pages/Layout';
import Login from './Components/Login/Login';
import SignupPage from './Pages/SingupPage';
import VerifyEmail from './Components/EmailVerify/VerifyEmail';
import EmailVerified from './Components/EmailVerify/EmailVerified';
import Dashboard from './DashBaord/Dashboard';
import Signup from './Components/SignUp/Singup';
import CompleteProfile from './Components/CompleteProfile/CompleteProfile';

function App() {



  return (
    <Router basename='/JobSculpt'>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="profile" element={<Dashboard />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="signup/:role" element={<Signup />} />
        <Route path="verify-email" element={<VerifyEmail />} />
        <Route path="email-verified" element={<EmailVerified />} />
        <Route path="complete-profile" element={<CompleteProfile />} />

        
      </Routes>
    </Router>
  );
}

export default App;