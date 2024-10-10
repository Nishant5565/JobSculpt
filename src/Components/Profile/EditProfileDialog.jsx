import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Typography, IconButton } from '@mui/material';
import { Close as CloseIcon, Save as SaveIcon } from '@mui/icons-material';
import axios from 'axios';
import { API_URL } from '../../Functions/Constants';

const EditProfileDialog = ({ user, open, onClose, theme }) => {
  const [editUser, setEditUser] = useState({ ...user });
  const [usernameAvailable, setUsernameAvailable] = useState('');

  useEffect(() => {
    setEditUser({ ...user });
  }, [user]);

  const checkUsername = async (userName) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(API_URL() + '/api/auth/check-username', { userName }, { headers: { 'x-auth-token': token } });
      setUsernameAvailable(response.data.msg);
    } catch (err) {
      console.error('Username check failed:', err);
    }
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditUser({ ...editUser, [name]: value });
    if (name === 'userName') {
      checkUsername(value);
    }
  };

  const handleEditSave = () => {
    onClose();
    handleUpdateProfile();
  };

  const handleUpdateProfile = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(API_URL() + '/api/auth/update-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify(editUser),
      });
      const data = await response.json();
      if (data.success) {
        onClose();
        return;
      } else {
        console.error('Error updating profile:', data.error);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          backgroundColor: theme === 'dark' ? 'black' : '#f0f4f8',
          color: theme === 'dark' ? '#fff' : '#333',
          borderRadius: '24px',
          boxShadow: theme === 'dark' ? '0px 4px 20px rgba(0, 0, 0, 0.8)' : '0px 4px 12px rgba(0, 0, 0, 0.1)',
          padding: '20px',
          transition: 'all 0.3s ease',
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mb: '10px',
          borderBottom: `1px solid ${theme === 'dark' ? '#333' : '#ccc'}`,
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 600,
        }}
      >
        <Typography variant="h6" sx={{ fontSize: '1.5rem' }}>
          Edit Profile
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{
            color: theme === 'dark' ? '#fff' : '#333',
            position: 'absolute',
            right: '10px',
            '&:hover': { backgroundColor: 'transparent' },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ padding: '16px 24px', fontFamily: 'Poppins, sans-serif' }}>
        <TextField
          autoFocus
          margin="dense"
          name="userName"
          label="Username"
          type="text"
          fullWidth
          value={editUser?.userName || ''}
          onChange={handleEditChange}
          sx={{
            borderRadius: '12px',
            '& .MuiInputBase-root': {
              color: theme === 'dark' ? '#fff' : '#333',
              borderRadius: '10px',
            },
            '& .MuiInputLabel-root': {
              color: theme === 'dark' ? '#fff' : '#000',
            },
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
              '& fieldset': {
                borderColor: theme === 'dark' ? '#555' : '#ccc',
              },
              '&:hover fieldset': {
                borderColor: theme === 'dark' ? '#777' : '#aaa',
              },
              '&.Mui-focused fieldset': {
                borderColor: theme === 'dark' ? '#aaa' : '#000',
              },
            },
          }}
        />
        {usernameAvailable && (
          <Typography variant="caption" color={usernameAvailable === 'Username is available' ? 'green' : 'red'}>
            {usernameAvailable}
          </Typography>
        )}

        <TextField
          margin="dense"
          name="email"
          label="Email"
          type="email"
          fullWidth
          value={editUser?.email || ''}
          onChange={handleEditChange}
          disabled
          sx={{
            borderRadius: '12px',
            '& .MuiInputBase-root': {
              color: theme === 'dark' ? '#fff' : '#333',
              borderRadius: '10px',
            },
            '& .MuiInputLabel-root': {
              color: theme === 'dark' ? '#fff' : '#000',
            },
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
              '& fieldset': {
                borderColor: theme === 'dark' ? '#555' : '#ccc',
              },
              '&:hover fieldset': {
                borderColor: theme === 'dark' ? '#777' : '#aaa',
              },
              '&.Mui-focused fieldset': {
                borderColor: theme === 'dark' ? '#aaa' : '#000',
              },
            },
          }}
        />

        <TextField
          margin="dense"
          name="about"
          label="About Me"
          type="text"
          fullWidth
          value={editUser?.about || ''}
          onChange={handleEditChange}
          sx={{
            borderRadius: '12px',
            '& .MuiInputBase-root': {
              color: theme === 'dark' ? '#fff' : '#333',
              borderRadius: '10px',
            },
            '& .MuiInputLabel-root': {
              color: theme === 'dark' ? '#fff' : '#000',
            },
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
              '& fieldset': {
                borderColor: theme === 'dark' ? '#555' : '#ccc',
              },
              '&:hover fieldset': {
                borderColor: theme === 'dark' ? '#777' : '#aaa',
              },
              '&.Mui-focused fieldset': {
                borderColor: theme === 'dark' ? '#aaa' : '#000',
              },
            },
          }}
        />
      </DialogContent>

      <DialogActions
        sx={{
          borderTop: `1px solid ${theme === 'dark' ? '#444' : '#ddd'}`,
          padding: '16px 24px',
        }}
      >
        <Button
          onClick={onClose}
          sx={{
            color: 'red',
            backgroundColor: theme === 'dark' ? '#444' : '#eee',
            borderRadius: '12px',
            padding: '10px 24px',
            boxShadow: theme === 'dark' ? '0px 3px 10px rgba(0, 0, 0, 0.5)' : '0px 3px 10px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              backgroundColor: theme === 'dark' ? '#555' : '#ddd',
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleEditSave}
          sx={{
            color: theme === 'dark' ? '#fff' : '#333',
            backgroundColor: theme === 'dark' ? '#6a5acd' : 'linear-gradient(to right, #6a11cb, #2575fc)',
            borderRadius: '12px',
            padding: '10px 24px',
            boxShadow: theme === 'dark' ? '0px 3px 10px rgba(0, 0, 0, 0.5)' : '0px 3px 10px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              backgroundColor: theme === 'dark' ? '#7b68ee' : 'linear-gradient(to right, #5a8cfd, #3b56f7)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProfileDialog;
