import React, { useState } from 'react';
import { IconButton, Snackbar, Alert } from '@mui/material';
import { Brightness4 as Brightness4Icon, Brightness7 as Brightness7Icon } from '@mui/icons-material';
import { updateTheme } from '../Functions/CompleteProfile';
import './theme.css';

const ThemeSwitcher = ({ theme, toggleTheme }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const iconStyle1 = {
    color: 'black', 
    transition: 'all 0.5s ease',

  };

  const iconStyle2 = {
    color: '#fb0505' , 
    transition: 'all 0.5s ease',

  };

  const token = localStorage.getItem('token');

  const handleUpdateTheme = async (theme) => {
    if (!token) {
      toggleTheme();
      return;
    }
    toggleTheme();

    const data = await updateTheme(theme);
    
    if (data.status === 200) {
      console.log(data.data.user.theme)
      setOpenSnackbar(true);
      setSnackbarMessage(theme + " Mode Enabled");
      setSnackbarSeverity('success');
    } else {
      setOpenSnackbar(true);
      setSnackbarMessage("Error Updating Theme");
      setSnackbarSeverity('error');
    }
  };

  return (
    <>

      <div className={theme === 'dark' ? 'theme-switch-wrapper dark' : 'theme-switch-wrapper light'}
      onClick={() => handleUpdateTheme(theme === 'dark' ? 'light' : 'dark')}>
        <div className={`slider ${theme == 'dark' ? 'right' : 'left'} `}>
          <div className={theme === 'dark' ? 'rotate' : 'norotate'}>
          {theme === 'light' ? <Brightness7Icon style={iconStyle1} /> : <Brightness4Icon style={iconStyle2} />}

          </div>
        </div>
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{
            width: '100%',
            textTransform: 'capitalize',
            bgcolor: theme === 'dark' ? '#000' : '#fff',
            color: theme === 'dark' ? '#fff' : '#000',
            border: theme === 'dark' ? '2px solid #fff' : '2px solid #000',
            borderRadius: '20px',
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ThemeSwitcher;
