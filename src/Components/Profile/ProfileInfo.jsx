import React from 'react';
import { Card, CardContent, Paper, Typography, Skeleton } from '@mui/material';

const ProfileInfo = ({ user, loading, uiSettings, handleEditOpen }) => {
  return (
    <Card sx={{ mt: 4 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Profile Information
        </Typography>
        {loading ? (
          <>
            <Skeleton variant="text" width="80%" height={30} />
            <Skeleton variant="text" width="60%" height={30} />
            <Skeleton variant="text" width="50%" height={30} />
            <Skeleton variant="text" width="70%" height={30} />
            <Skeleton variant="rectangular" width="100%" height={80} />
          </>
        ) : (
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 1,
              backgroundColor: 'background.paper',
              color: uiSettings.textColor,
            }}
          >
            <Typography variant="body1" gutterBottom sx={{ color: 'black' }}>
              <strong>Username:</strong> {user.userName}
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ color: 'black' }}>
              <strong>Email Address:</strong> {user.email}
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ color: 'black' }}>
              <strong>Role:</strong> {user.role}
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ color: 'black' }}>
              <strong>About Me:</strong> {user.about}
            </Typography>
          </Paper>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileInfo;