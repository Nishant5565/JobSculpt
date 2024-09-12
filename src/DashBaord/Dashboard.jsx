import React from 'react';
import { Container, Grid, Paper, Typography, Box, AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Avatar, Badge } from '@mui/material';
import { Menu as MenuIcon, Home as HomeIcon, Work as WorkIcon, AccountCircle as AccountCircleIcon, Notifications as NotificationsIcon } from '@mui/icons-material';
import Profile from '../Components/Profile/Profile';
import { styled } from '@mui/system';

const drawerWidth = 240;

const Dashboard = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState('Home');

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setMobileOpen(false); // Close the drawer on mobile after selecting a section
  };

  const drawer = (
    <div>
      <Toolbar />
      <List>
        {['Home', 'Jobs', 'Profile', 'Notifications'].map((text, index) => (
          <ListItem button key={text} onClick={() => handleSectionChange(text)}>
            <ListItemIcon>
              {index === 0 && <HomeIcon />}
              {index === 1 && <WorkIcon />}
              {index === 2 && <AccountCircleIcon />}
              {index === 3 && <NotificationsIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#3f51b5' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit">
            <Avatar alt="Profile Picture" src="/static/images/avatar/1.jpg" />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, backgroundColor: '#f4f6f8', minHeight: '100vh' }}
      >
        <Toolbar />
        <Container maxWidth="lg">
          {activeSection === 'Home' && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                    borderRadius: '20px',
                    background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
                    color: '#fff',
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    Welcome to Your Dashboard
                  </Typography>
                  <Typography>
                    Here you can manage your jobs, view notifications, and update your profile.
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                    borderRadius: '20px',
                    background: 'linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)',
                    color: '#fff',
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    Notifications
                  </Typography>
                  <Typography>
                    You have 3 new notifications.
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                    borderRadius: '20px',
                    background: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)',
                    color: '#fff',
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    Recent Jobs
                  </Typography>
                  <Typography>
                    Here are the latest job postings that match your skills.
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          )}
          {activeSection === 'Profile' && <Profile />}
          {/* Add other sections here */}
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;