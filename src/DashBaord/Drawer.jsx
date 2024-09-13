import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import { Home as HomeIcon, Work as WorkIcon, AccountCircle as AccountCircleIcon, Notifications as NotificationsIcon } from '@mui/icons-material';
import Box from '@mui/material/Box';

const drawerWidth = 240;

const DrawerComponent = ({ mobileOpen, handleDrawerToggle, handleSectionChange }) => {
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
  );
};

export default DrawerComponent;