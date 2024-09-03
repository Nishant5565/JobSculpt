import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Card,
  CardContent,
  CardActions,
  Button,
  Alert,
  Menu,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormControlLabel,
  Switch,
  Skeleton, 
  Chip
} from '@mui/material';
import { Edit as EditIcon, Close as CloseIcon, Save as SaveIcon, Settings as SettingsIcon } from '@mui/icons-material';
import { API_URL } from '../../Functions/Constants';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const predefinedGradients = [
  { name: 'Sunset', colors: ['#ff7e5f', '#feb47b'] },
  { name: 'Ocean Blue', colors: ['#00c6ff', '#0072ff'] },
  { name: 'Purple Bliss', colors: ['#360033', '#0b8793'] },
  { name: 'Mango', colors: ['#ffe259', '#ffa751'] },
  { name: 'Aqua Marine', colors: ['#1a2980', '#26d0ce'] },
];

const predefinedTextColors = [
  { name: 'White', color: '#ffffff' },
  { name: 'Black', color: '#000000' },
  { name: 'Gray', color: '#808080' },
  { name: 'Navy', color: '#000080' },
  { name: 'Maroon', color: '#800000' },
];

const predefinedLinearColors = [
{ name: 'Sunset', color: '#ff7e5f' },
{ name: 'Ocean Blue', color: '#00c6ff' },
{ name: 'Purple Bliss', color: '#360033' },
{ name: 'Mango', color: '#ffe259' },
{ name: 'Aqua Marine', color: '#1a2980' },
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
    if (selectedGradient) {
      setUiSettings({
        ...uiSettings,
        themeColor: value,
        gradientColor1: selectedGradient.colors[0],
        gradientColor2: selectedGradient.colors[1],
      });
      localStorage.setItem('uiSettings', JSON.stringify({
        ...uiSettings,
        themeColor: value,
        gradientColor1: selectedGradient.colors[0],
        gradientColor2: selectedGradient.colors[1],
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
      const response = await axios.post(API_URL + '/api/auth/check-username', { userName });
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
      const response = await fetch(API_URL + '/api/auth/auth-user', {
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
      const response = await fetch(API_URL + '/upload', {
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
      const response = await fetch(API_URL + '/api/auth/update-profile', {
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
        }}
      >
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
                <Typography variant="h4" sx={{ color: uiSettings.textColor }}>{user.userName}</Typography>
                <Typography variant="body1" sx={{ color: uiSettings.textColor }}>{user.email}</Typography>
              </>
            )}
            <Typography variant="body2" sx={{ color: uiSettings.textColor }}>{user?.role || ''}</Typography>
          </Box>
          <IconButton
            color="inherit"
            onClick={handleSettingsClick}
            sx={{ ml: 2, color: uiSettings.textColor }}
          >
            <SettingsIcon />
          </IconButton>
        </Box>
      </Paper>

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
            <>
          <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    borderRadius: 1,
                    backgroundColor: 'background.paper',
                    color: 'text.primary',
                  }}
                >
                  <Typography variant="body1" gutterBottom>
                    <strong>Username:</strong> {user.userName}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Email Address:</strong> {user.email}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Role:</strong> {user.role}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>About Me:</strong> {user.about}
                  </Typography>
            </Paper>
              </>
              )}
            </CardContent>
            <CardActions>
              <Button variant="contained" color="primary" onClick={handleEditOpen}>Edit Profile</Button>
            </CardActions>
            </Card>

            <Dialog open={editDialogOpen} onClose={handleEditClose}>
            <DialogTitle>Edit Profile</DialogTitle>
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
              <TextField
              margin="dense"
              name="email"
              label="Email"
              type="email"
              fullWidth
              value={editUser?.email || ''}
              onChange={handleEditChange}
              />
              <TextField
              margin="dense"
              name="role"
              label="Role"
              type="text"
              fullWidth
              value={editUser?.role || ''}
              onChange={handleEditChange}
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

            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
            <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
              {snackbarMessage}
            </Alert>
            </Snackbar>

            <Menu
        anchorEl={settingsAnchorEl}
        open={Boolean(settingsAnchorEl)}
        onClose={handleSettingsClose}
      >
        <MenuItem>
          <FormControl fullWidth>
            <InputLabel>Theme Type</InputLabel>
            <Select
              value={uiSettings.themeType}
              onChange={handleThemeTypeChange}
              label="Theme Type"
            >
              <MenuItem value="linear">Linear</MenuItem>
              <MenuItem value="gradient">Gradient</MenuItem>
            </Select>
          </FormControl>
        </MenuItem>

        <MenuItem>
          <FormControl fullWidth>
            <InputLabel>Theme Color</InputLabel>
            <Select
              name="themeColor"
              value={uiSettings.themeColor}
              onChange={handleColorChange}
              label="Theme Color"
            >
              {predefinedGradients.map((gradient) => (
                <MenuItem key={gradient.name} value={gradient.name}>
                  <Chip
                    sx={{ background: `linear-gradient(90deg, ${gradient.colors[0]}, ${gradient.colors[1]})` }}
                    label={gradient.name}
                  />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </MenuItem>

        <MenuItem>
          <FormControl fullWidth>
            <InputLabel>Text Color</InputLabel>
            <Select
              name="textColor"
              value={uiSettings.textColor}
              onChange={handleColorChange}
              label="Text Color"
            >
              {predefinedTextColors.map((color) => (
                <MenuItem key={color.name} value={color.color}>
                  <Chip
                    sx={{ background: color.color }}
                    label={color.name}
                  />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </MenuItem>
      </Menu>
          </Container>
          );
        };

        export default Profile;