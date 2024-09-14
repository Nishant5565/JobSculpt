import React from 'react';
import { MenuItem, ListItemIcon, ListItemText } from '@mui/material';

const ProfileMenuItem = ({ icon: Icon, text, onClick }) => {
  return (
    <MenuItem onClick={onClick}>
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
      <ListItemText primary={text} />
    </MenuItem>
  );
};

export default ProfileMenuItem;