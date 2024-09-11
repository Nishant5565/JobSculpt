import React from 'react';
import {  useNavigate, Link } from 'react-router-dom';
import { Container, Paper, Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)(({ theme }) => ({
  background: '#FF6699',
  color: '#ffffff',
  padding: '10px 20px',
  borderRadius: '50px',
  transition: 'box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  border: 'none',
  cursor: 'pointer',
  '&:hover': {
    boxShadow: '0px 8px 16px rgba(255, 200, 221, 0.7)',
    transform: 'translateY(-2px)',
  },
  '&:active': {
    transform: 'translateY(0)',
    boxShadow: '0px 4px 8px rgba(255, 200, 221, 0.3)',
  },
}));

const EmailVerified = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/');
  };

  return (
     <>
     <Link to={'/'} className="text-xl font-bold JobSculpt relative top-10 left-10">
          JobSculpt
      </Link>
    <Container
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          maxWidth: 500,
          width: '100%',
          textAlign: 'center',
          borderRadius: 2,
          backgroundColor: '#ffffff',
        }}
      >
        <Typography variant="h4" sx={{ mb: 2, color: '#333' }}>
          Email Verified
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, color: '#555' }}>
          Your email has been successfully verified! You can now continue to use your account. 
        </Typography>
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <StyledButton onClick={handleContinue}>Continue</StyledButton>
        </Box>
      </Paper>
    </Container>

    </>
  );
};

export default EmailVerified;