import React from 'react';
import { Paper, Typography } from '@mui/material';

const Content = () => {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Main Content
      </Typography>
      <Typography variant="body1">
        This is where your main content goes. You can add charts, tables, or any other component here.
      </Typography>
    </Paper>
  );
};

export default Content;
