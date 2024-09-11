import React, { useState } from 'react';
import { Container, Box, Stack, Grid, IconButton, Drawer, Paper } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';
import Content from './Content';
import Widget from './Widget';
import Profile from "../Components/Profile/Profile";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Dashboard = () => {
  const [settingOpen, setSettingOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleSettingsOpen = () => {
    setSettingOpen(true);
  };

  const handleSettingsClose = () => {
    setSettingOpen(false);
  };

  const handleProfileOpen = () => {
    setProfileOpen(true);
  };

  const handleProfileClose = () => {
    setProfileOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f4f6f8' }}>
      <Sidebar onSettingClick={handleSettingsOpen} onProfileClick={handleProfileOpen} />
      <Box sx={{ flexGrow: 1 }}>
        <Header />
        <Container maxWidth="lg" sx={{ pt: 10, mb: 4 }}>
          <Stack spacing={3}>
            {/* Profile Button */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <IconButton color="primary" onClick={handleProfileOpen}>
                <AccountCircleIcon fontSize="large" />
              </IconButton>
            </Box>

            {/* Widgets */}
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Widget title="Total Users" value="1,234" />
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Widget title="Active Users" value="567" />
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Widget title="Sales" value="$12,345" />
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Widget title="Revenue" value="$78,910" />
                </Paper>
              </Grid>
            </Grid>

            {/* Main Content */}
            <Box>
              <Content />
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* Profile Drawer */}
      <Drawer anchor="right" open={profileOpen} onClose={handleProfileClose}>
        <Box sx={{ width: 350, p: 2 }}>
          <Profile />
        </Box>
      </Drawer>
    </Box>
  );
};

export default Dashboard;