import React from 'react';
import { IconButton } from '@mui/material';
import { Brightness4 as Brightness4Icon, Brightness7 as Brightness7Icon } from '@mui/icons-material';

const ThemeSwitcher = ({ theme, toggleTheme }) => {
  const iconStyle = {
    color: theme === 'dark' ? '#fb0505' : 'inherit', // Change to yellow when dark theme
    transition : 'all 0.3s ease-in-out'
  };

  return (
    <IconButton onClick={toggleTheme} color="inherit">
      {theme === 'dark' ? <Brightness7Icon style={iconStyle} /> : <Brightness4Icon />}
    </IconButton>
  );
};

export default ThemeSwitcher;