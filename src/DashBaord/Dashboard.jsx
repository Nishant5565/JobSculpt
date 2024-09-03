import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Container,
  Card,
  CardContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  useTheme,
  createTheme,
  ThemeProvider,
  Switch,
  ListItemSecondaryAction,
  Checkbox,
  Snackbar,
} from '@mui/material';
import {
  Home,
  Settings,
  Person,
  Dashboard as DashboardIcon,
  Notifications,
  PieChart as PieChartIcon,
  Message as MessageIcon,
  AccountCircle,
  CalendarToday as CalendarTodayIcon,
  Task as TaskIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { Chart } from 'react-chartjs-2';
import 'chart.js/auto';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useNavigate } from 'react-router-dom';
import Profile from '../Components/Profile/Profile';

const drawerWidth = 280;
const localizer = momentLocalizer(moment);

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [notificationDialogOpen, setNotificationDialogOpen] = useState(false);
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Task 1', completed: false },
    { id: 2, text: 'Task 2', completed: true },
    { id: 3, text: 'Task 3', completed: false },
  ]);
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleTaskToggle = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfileOpen = () => {
    handleClose();
  };

  const handleProfileClose = () => {
    setProfileDialogOpen(false);
  };

  const handleNotificationOpen = () => {
    setNotificationDialogOpen(true);
  };

  const handleNotificationClose = () => {
    setNotificationDialogOpen(false);
  };

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? '#0d47a1' : '#1976d2', // Professional blue tones
      },
      secondary: {
        main: darkMode ? '#bb86fc' : '#6200ea', // Subtle purple tones
      },
      background: {
        default: darkMode ? '#121212' : '#f5f5f5', // Dark gray for dark mode, soft gray for light mode
        paper: darkMode ? '#1e1e1e' : '#ffffff', // Consistent background contrast
      },
      text: {
        primary: darkMode ? '#ffffff' : '#000000', // High contrast text
        secondary: darkMode ? '#cfcfcf' : '#333333', // Softer secondary text
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h6: {
        fontWeight: 600,
      },
      h4: {
        fontWeight: 700,
        color: darkMode ? '#bb86fc' : '#6200ea',
      },
      body1: {
        fontSize: '1rem',
        fontWeight: 500,
      },
    },
    shape: {
      borderRadius: 8, // Softer corners for a modern look
    },
  });

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Sales',
        data: [150, 200, 180, 220, 300, 250],
        backgroundColor: 'rgba(98, 0, 234, 0.6)', // Professional purple
        borderColor: 'rgba(98, 0, 234, 1)',
        borderWidth: 2,
      },
    ],
  };

  const tableRows = [
    { name: 'Product A', status: 'Pending', progress: '45%' },
    { name: 'Product B', status: 'Completed', progress: '100%' },
    { name: 'Product C', status: 'In Progress', progress: '70%' },
    { name: 'Product D', status: 'Delayed', progress: '20%' },
  ];

  const events = [
    {
      title: 'Meeting',
      start: new Date(),
      end: new Date(moment().add(1, 'hours')),
    },
    {
      title: 'Lunch',
      start: new Date(moment().add(1, 'days')),
      end: new Date(moment().add(1, 'days').add(1, 'hours')),
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: `calc(100% - ${drawerWidth}px)`,
            ml: `${drawerWidth}px`,
            backgroundColor: 'primary.main',
          }}
        >
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              Professional Dashboard
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Switch checked={darkMode} onChange={handleDarkModeToggle} />
            <IconButton color="inherit" onClick={handleNotificationOpen}>
              <Badge badgeContent={4} color="secondary">
                <Notifications />
              </Badge>
            </IconButton>
            <IconButton color="inherit">
              <Badge badgeContent={2} color="secondary">
                <MessageIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit" onClick={handleMenu}>
              <Avatar alt="User Avatar" src="/static/images/avatar/1.jpg" />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem onClick={handleProfileOpen}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>Settings</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              backgroundColor: 'primary.main',
              color: '#FFFFFF',
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto' }}>
            <List>
              {[
                { text: 'Dashboard', icon: <DashboardIcon /> },
                { text: 'Home', icon: <Home /> },
                { text: 'Profile', icon: <Person /> },
                { text: 'Messages', icon: <MessageIcon /> },
                { text: 'Settings', icon: <Settings /> },
              ].map((item) => (
                <ListItem button key={item.text}>
                  <ListItemIcon sx={{ color: '#FFFFFF' }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
            </List>
            <Divider sx={{ backgroundColor: 'secondary.main' }} />
            <List>
              {['Help', 'Contact Us'].map((text) => (
                <ListItem button key={text}>
                  <ListItemIcon sx={{ color: '#FFFFFF' }}>
                    {text === 'Help' ? <Settings /> : <Person />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: 'background.default',
            p: 3,
            width: `calc(100% - ${drawerWidth}px)`,
          }}
        >
          <Toolbar />
          <Container maxWidth="lg">
            <Typography variant="h4" gutterBottom>
              Welcome Back, User!
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
              <Card sx={{ flex: 1 }}>
                <CardContent>
                  <Typography variant="h6" color="textSecondary" gutterBottom>
                    Monthly Sales
                  </Typography>
                  <Chart type="bar" data={data} />
                </CardContent>
              </Card>
              <Card sx={{ flex: 1 }}>
                <CardContent>
                  <Typography variant="h6" color="textSecondary" gutterBottom>
                    Tasks Overview
                  </Typography>
                  <List>
                    {tasks.map((task) => (
                      <ListItem key={task.id}>
                        <ListItemText primary={task.text} />
                        <ListItemSecondaryAction>
                          <Checkbox
                            edge="end"
                            checked={task.completed}
                            onChange={() => handleTaskToggle(task.id)}
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Box>

            <Paper sx={{ mb: 4 }}>
              <Typography variant="h6" component="div" sx={{ p: 2 }}>
                Recent Activities
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Product Name</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Progress</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tableRows.map((row) => (
                      <TableRow key={row.name}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.status}</TableCell>
                        <TableCell>{row.progress}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>

            <Box>
              <Typography variant="h6" gutterBottom>
                Upcoming Events
              </Typography>
              <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 400 }}
              />
            </Box>
          </Container>
        </Box>
      </Box>

      <Dialog open={profileDialogOpen} onClose={handleProfileClose}>
        <DialogTitle>Profile</DialogTitle>
        <DialogContent>
          <DialogContentText>Here is your profile information.</DialogContentText>
          {/* Profile content goes here */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleProfileClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={notificationDialogOpen} onClose={handleNotificationClose}>
        <DialogTitle>Notifications</DialogTitle>
        <DialogContent>
          <DialogContentText>Here are your recent notifications.</DialogContentText>
          {/* Notification content goes here */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNotificationClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message="Task updated"
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackbarClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </ThemeProvider>
  );
};

export default Dashboard;
