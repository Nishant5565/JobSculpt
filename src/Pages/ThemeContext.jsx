import React, { createContext, useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  if(theme == 'undefined'){
    setTheme('light');
  }
  
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme !== 'dark' ? 'dark' : 'light'));
    document.body.style.backgroundColor = theme == 'dark' ? '#f0f0f0' : '#1f1f1f';
    document.body.style.color = theme == 'dark' ? '#333' : '#f0f0f0';
    localStorage.setItem('theme', theme);
  };

  const themeConfig = createTheme({
    palette: {
      mode: theme,
    },
  });

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={themeConfig}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};