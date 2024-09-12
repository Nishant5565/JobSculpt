import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Typography } from '@mui/material';
import { Close as CloseIcon, Save as SaveIcon } from '@mui/icons-material';

const EditProfileDialog = ({ editDialogOpen, editUser, usernameAvailable, handleEditClose, handleEditChange, handleEditSave }) => {
  return (
    <Dialog open={editDialogOpen} onClose={handleEditClose}>
      <DialogTitle className=' text-black'>Edit Profile</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="userName"
          label="Username"
          type="text"
          fullWidth
          value={editUser?.userName || ''}
          onChange={handleEditChange}
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
        />
        <TextField
          margin="dense"
          name="role"
          label="Role"
          type="text"
          fullWidth
          value={editUser?.role || ''}
          onChange={handleEditChange}
          disabled
        />
        <TextField
          margin="dense"
          name="about"
          label="About Me"
          type="text"
          fullWidth
          value={editUser?.about || ''}
          onChange={handleEditChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleEditClose} color="secondary">
          <CloseIcon /> Cancel
        </Button>
        <Button onClick={handleEditSave} color="primary">
          <SaveIcon /> Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProfileDialog;