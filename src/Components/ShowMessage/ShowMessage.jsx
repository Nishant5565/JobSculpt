import React, { useState } from 'react';
import { Snackbar, Alert } from '@mui/material';

const ShowMessage = ({ message, severity }) => {
  const [open, setOpen] = useState(true);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
    }
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ShowMessage;