import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './Components/LandingPage';
import Layout from './Pages/Layout';
import Login from './Components/Login/Login';
import Signup from './Components/SignUp/Singup';
import VerifyEmail from './Components/EmailVerify/VerifyEmail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="verify-email" element={<VerifyEmail />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;