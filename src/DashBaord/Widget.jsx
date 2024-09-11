import React from 'react';
import { Paper, Typography } from '@mui/material';

const Widget = ({ title, value }) => {
  return (
    <Paper sx={{ p: 3, textAlign: 'center', bgcolor: '#f5f5f5' }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Typography variant="h4">{value}</Typography>
    </Paper>
  );
};

export default Widget;
