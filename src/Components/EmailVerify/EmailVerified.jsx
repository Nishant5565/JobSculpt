import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Paper, Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #FF99CC 30%, #FF6699 90%)',
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
    boxShadow: '0px 8px 16px rgba(255, 200, 221, 0.3)',
    transform: 'translateY(-2px)',
  },
  '&:active': {
    transform: 'translateY(0)',
    boxShadow: '0px 4px 8px rgba(255, 200, 221, 0.3)',
  },
}));

const EmailVerified = () => {
  const { userName } = useParams();
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/');
  };

  return (
     <>
     <Link to={'/'} className="text-xl font-bold text-aesthetic-green relative top-10 left-10">
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
          Hello, {userName}! Your email has been successfully verified.
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