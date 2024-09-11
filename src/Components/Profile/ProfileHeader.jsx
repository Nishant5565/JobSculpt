import React from 'react';
import { Box, Avatar, IconButton, Typography, Skeleton } from '@mui/material';
import { Edit as EditIcon, Settings as SettingsIcon } from '@mui/icons-material';

const ProfileHeader = ({ user, profileImage, loading, uiSettings, handleFileChange, handleSettingsClick }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      <Avatar sx={{ width: 100, height: 100, mr: 2 }} src={profileImage} />
      <IconButton
        color="secondary"
        component="label"
        sx={{ position: 'relative', top: 40, left: -40, zIndex: 10, color: uiSettings.textColor }}
      >
        <EditIcon />
        <input
          accept="image/*"
          type="file"
          hidden
          onChange={handleFileChange}
        />
      </IconButton>
      <Box sx={{ flex: 1 }}>
        {loading ? (
          <>
            <Skeleton variant="text" width={150} height={40} />
            <Skeleton variant="text" width={200} height={30} />
          </>
        ) : (
          <>
            <Typography variant="h4" sx={{ color: uiSettings.textColor }} style={{ transition: 'all 0.7s' }}>
              {user.userName}
            </Typography>
            <Typography variant="body1" sx={{ color: uiSettings.textColor }} style={{ transition: 'all 0.7s' }}>
              {user.email}
            </Typography>
          </>
        )}
      </Box>
      <IconButton
        color="inherit"
        onClick={handleSettingsClick}
        sx={{ ml: 2, color: uiSettings.textColor }}
      >
        <SettingsIcon />
      </IconButton>
    </Box>
  );
};

export default ProfileHeader;