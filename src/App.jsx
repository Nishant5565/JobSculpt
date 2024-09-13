import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './Components/LandingPage/LandingPage';
import Layout from './Pages/Layout';
import Login from './Components/Login/Login';
import Signup from './Components/SignUp/Singup';
import VerifyEmail from './Components/EmailVerify/VerifyEmail';
import EmailVerified from './Components/EmailVerify/EmailVerified';
import Profile from './Components/Profile/Profile';
import Dashboard from './DashBaord/Dashboard';
import { useState, useEffect } from 'react';
import { Box, Toolbar, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import ThemeSwitcher from './DashBaord/ThemeSwitcher';

function App() {

  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    console.log('theme', theme);
  };
  const themeConfig = createTheme({
    palette: {
      mode: theme,
    },
  });

  return (
    <Router basename='/JobSculpt'>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="profile" element={<Dashboard />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="verify-email" element={<VerifyEmail />} />
        <Route path="email-verified" element={<EmailVerified />} />

        
      </Routes>
    </Router>
  );
}

export default App;