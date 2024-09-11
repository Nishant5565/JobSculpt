import React, { useState, useEffect } from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';

const Sidebar = ({ onSettingClick, onProfileClick }) => {
  const savedSettings = localStorage.getItem('uiSettings');
  const [uiSettings, setUiSettings] = useState();

  useEffect(() => {
    console.log(savedSettings);
    if (savedSettings) {
      setUiSettings(JSON.parse(savedSettings));
    }
  }, []);

  return (
    <Box
      sx={{
        width: 250,
        mt: 8,
        background:
          uiSettings?.themeType === 'gradient'
            ? `linear-gradient(90deg, ${uiSettings.gradientColor1}, ${uiSettings.gradientColor2})`
            : uiSettings?.color,
        height: '100vh',
      }}
    >
      <List>
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <Divider />
        <ListItem button onClick={onProfileClick}>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
        <Divider />
        <ListItem button onClick={onSettingClick}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;