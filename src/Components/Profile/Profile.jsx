  import React, { useState, useEffect } from 'react';
  import { Container, Paper, Button } from '@mui/material';
  import { API_URL } from '../../Functions/Constants';
  import { useNavigate } from 'react-router-dom';
  import axios from 'axios';
  import ProfileHeader from './ProfileHeader.jsx';
  import ProfileInfo from './ProfileInfo';
  import EditProfileDialog from './EditProfileDialog';
  import ProfileSettingsMenu from './ProfileSettingsMenu';
  import ProfileSnackbar from './ProfileSnackbar';
  import { FaRegUser } from "react-icons/fa";

  const predefinedGradients = [
    { name: 'Sunset', colors: ['#ff7e5f', '#feb47b'], textColor: '#ffffff' },
    { name: 'Ocean Blue', colors: ['#00c6ff', '#0072ff'], textColor: '#ffffff' },
    { name: 'Purple Bliss', colors: ['#360033', '#0b8793'], textColor: '#ffffff' },
    { name: 'Mango', colors: ['#ffe259', '#ffa751'], textColor: '#000000' },
    { name: 'Aqua Marine', colors: ['#1a2980', '#26d0ce'], textColor: '#ffffff' },
  ];

  const predefinedLinearColors = [
    { name: 'Sunset', color: '#ff7e5f', textColor: '#ffffff' },
    { name: 'Ocean Blue', color: '#00c6ff', textColor: '#ffffff' },
    { name: 'Purple Bliss', color: '#360033', textColor: '#ffffff' },
    { name: 'Mango', color: '#ffe259', textColor: '#000000' },
    { name: 'Aqua Marine', color: '#1a2980', textColor: '#ffffff' },
  ];

  const Profile = () => {
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [user, setUser] = useState(null);
    const [editUser, setEditUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [usernameAvailable, setUsernameAvailable] = useState('');
    const [settingsAnchorEl, setSettingsAnchorEl] = useState(null);
    const [uiSettings, setUiSettings] = useState({
      themeType: 'linear', // 'linear' or 'gradient'
      themeColor: 'Sunset', // Default linear color
      gradientColor1: '#ff7e5f', // First color for gradient
      gradientColor2: '#feb47b', // Second color for gradient
      textColor: '#ffffff',
    });

    const navigate = useNavigate();

    const handleEditOpen = () => {
      setEditUser({ ...user });
      setEditDialogOpen(true);
    };

    const handleSettingsClick = (event) => {
      setSettingsAnchorEl(event.currentTarget);
    };

    const handleSettingsClose = () => {
      setSettingsAnchorEl(null);
    };

    const handleColorChange = (event) => {
      const { name, value } = event.target;
      const selectedGradient = predefinedGradients.find(gradient => gradient.name === value);
      const selectedLinearColor = predefinedLinearColors.find(color => color.name === value);

      if (selectedGradient) {
        setUiSettings({
          ...uiSettings,
          themeColor: value,
          gradientColor1: selectedGradient.colors[0],
          gradientColor2: selectedGradient.colors[1],
          textColor: selectedGradient.textColor,
        });
        localStorage.setItem('uiSettings', JSON.stringify({
          ...uiSettings,
          themeColor: value,
          gradientColor1: selectedGradient.colors[0],
          gradientColor2: selectedGradient.colors[1],
          textColor: selectedGradient.textColor,
        }));
      } else if (selectedLinearColor) {
        setUiSettings({
          ...uiSettings,
          themeColor: value,
          textColor: selectedLinearColor.textColor,
        });
        localStorage.setItem('uiSettings', JSON.stringify({
          ...uiSettings,
          themeColor: value,
          textColor: selectedLinearColor.textColor,
        }));
      } else {
        setUiSettings({ ...uiSettings, [name]: value });
        localStorage.setItem('uiSettings', JSON.stringify({ ...uiSettings, [name]: value }));
      }
    };

    const handleThemeTypeChange = (event) => {
      const { value } = event.target;
      setUiSettings({ ...uiSettings, themeType: value });
      localStorage.setItem('uiSettings', JSON.stringify({ ...uiSettings, themeType: value }));
    };

    const loadUiSettings = () => {
      const savedSettings = localStorage.getItem('uiSettings');
      if (savedSettings) {
        setUiSettings(JSON.parse(savedSettings));
      }
    };

    const checkUsername = async (userName) => {
      try {
        const response = await axios.post(API_URL() + '/api/auth/check-username', { userName });
        setUsernameAvailable(response.data.msg);
      } catch (err) {
        console.error('Username check failed:', err);
      }
    };

    const getUserInfo = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch(API_URL() + '/api/auth/auth-user', {
          method: 'POST',
          headers: {
            'x-auth-token': token,
          },
        });
        const data = await response.json();
        setUser(data);
        setEditUser(data);
        setProfileImage(data?.profileImage || 'https://via.placeholder.com/150');
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    useEffect(() => {
      getUserInfo();
      loadUiSettings();
    }, []);

    const handleEditClose = () => {
      setEditDialogOpen(false);
    };

    const handleEditChange = (event) => {
      const { name, value } = event.target;
      setEditUser({ ...editUser, [name]: value });
      if (name === 'userName') {
        checkUsername(value);
      }
    };

    const handleEditSave = () => {
      setUser({ ...editUser });
      handleUpdateProfile();
      setEditDialogOpen(false);
      setSnackbarMessage('Profile updated successfully!');
      setSnackbarOpen(true);
    };

    const handleSnackbarClose = () => {
      setSnackbarOpen(false);
    };

    const handleFileChange = async (event) => {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await fetch(API_URL() + '/upload', {
          method: 'POST',
          body: formData,
          headers: {
            'x-auth-token': localStorage.getItem('token'),
          },
        });
        const data = await response.json();
        if (data.success) {
          setProfileImage(data.url);
          setSnackbarMessage('Image uploaded successfully!');
        } else {
          setSnackbarMessage('Failed to upload image.');
        }
        setSnackbarOpen(true);
      } catch (error) {
        console.error('Error uploading image:', error);
        setSnackbarMessage('Failed to upload image.');
        setSnackbarOpen(true);
      }
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
        setSnackbarMessage(data.success ? 'Profile updated successfully!' : 'Failed to update profile.');
        setSnackbarOpen(true);
      } catch (error) {
        console.error('Error updating profile:', error);
        setSnackbarMessage('Failed to update profile.');
        setSnackbarOpen(true);
      }
    };

    return (
      <Container maxWidth="md" sx={{ pt: 10, mb: 4 }}>
        <Paper
          sx={{
            p: 3,
            background: uiSettings.themeType === 'gradient'
              ? `linear-gradient(90deg, ${uiSettings.gradientColor1}, ${uiSettings.gradientColor2})`
              : predefinedLinearColors.find(color => color.name === uiSettings.themeColor).color,
            color: uiSettings.textColor,
            transition: 'all 0.7s',
            borderRadius: '20px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          }}
        >
          <ProfileHeader
            user={user}
            profileImage={profileImage}
            loading={loading}
            uiSettings={uiSettings}
            handleFileChange={handleFileChange}
            handleSettingsClick={handleSettingsClick}
          />
        </Paper>

        <ProfileInfo
          user={user}
          loading={loading}
          uiSettings={uiSettings}
          handleEditOpen={handleEditOpen}
        />

        <Button
          variant="contained"
          color="primary"
          className="mt-4"
          sx={{
            mt: 4,
            backgroundColor: '#007bff',
            '&:hover': {
              backgroundColor: '#0056b3',
            },
            color: '#ffffff',
            fontWeight: 'bold',
            py: 2,
            px: 4,
            borderRadius: '50px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          }}
          onClick={() => editDialogOpen ? handleEditClose() : setEditDialogOpen(true)}
        >
          Edit Profile
        </Button>

        <EditProfileDialog
          editDialogOpen={editDialogOpen}
          editUser={editUser}
          usernameAvailable={usernameAvailable}
          handleEditClose={handleEditClose}
          handleEditChange={handleEditChange}
          handleEditSave={handleEditSave}
        />

        <ProfileSettingsMenu
          settingsAnchorEl={settingsAnchorEl}
          uiSettings={uiSettings}
          handleSettingsClose={handleSettingsClose}
          handleThemeTypeChange={handleThemeTypeChange}
          handleColorChange={handleColorChange}
          predefinedGradients={predefinedGradients}
        />

        <ProfileSnackbar
          snackbarOpen={snackbarOpen}
          snackbarMessage={snackbarMessage}
          handleSnackbarClose={handleSnackbarClose}
        />
      </Container>
    );
  };

  export default Profile;