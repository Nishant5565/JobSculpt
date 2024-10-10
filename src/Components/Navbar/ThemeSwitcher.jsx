import React from 'react';
import { IconButton } from '@mui/material';
import { Brightness4 as Brightness4Icon, Brightness7 as Brightness7Icon } from '@mui/icons-material';
import { updateTheme } from '../../Functions/CompleteProfile';
import { useState,useContext } from 'react';
import {Snackbar , Alert} from '@mui/material';
const ThemeSwitcher = ({theme, toggleTheme}) => {

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const iconStyle = {
    color: theme === 'dark' ? '#fb0505' : 'inherit', // Change to yellow when dark theme
    transition : 'all 0.3s ease-in-out'
  };
  const handleUpdateTheme= () =>{
    toggleTheme();
    setSnackbarMessage(theme + " Mode Enabled");
    setSnackbarSeverity(theme !== 'dark' ? 'white' : 'black');
    setOpenSnackbar(true);
  }
  
  

  return (
    <>
    <IconButton onClick={() => {
        handleUpdateTheme();
      }
    } color="inherit">
      {theme === 'dark' ? <Brightness7Icon style={iconStyle} /> : <Brightness4Icon />}
    </IconButton>

    <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: '100%' , 
            textTransform: 'capitalize',
            bgcolor: theme == 'dark' ? '#000' : '#fff',
            color: theme == 'dark' ? '#fff' : '#000',
            border: theme == 'dark' ? '2px solid #fff' : '2px solid #000',
            borderRadius: '20px'
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

    </>

  );
};

export default ThemeSwitcher;