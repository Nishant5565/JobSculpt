import React from 'react';
import { Menu, Avatar, Switch } from '@mui/material';
import { AccountCircle, TrendingUp, CardMembership, Settings, Logout } from '@mui/icons-material';
import ProfileMenuItem from './ProfileMenuItem.jsx'; // Import the new component
import { useNavigate } from 'react-router-dom';

const NavMenu = ({ anchorEl, handleProfileMenuClose, theme, userInfo, onlineStatus, handleOnlineStatusToggle,  logout }) => {
  const navigate = useNavigate();
  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleProfileMenuClose}
      PaperProps={{
        elevation: 5,
        sx: {
          mt: 2,
          borderRadius: "12px",
          minWidth: "270px",
          padding: "0px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          border: `1px solid ${theme === "dark" ? "#000" : "#e0e0e0"}`,
          backgroundColor: theme === "dark" ? "black" : "white",
        },
      }}
    >
      <div className={`flex items-center gap-4 p-4 ${theme === "dark" ? "bg-[#1a1a1a]" : "bg-gray-100"} border-b border-gray-200 rounded-t-lg`}>
        <div>
          <Avatar src={userInfo.profileImage} sx={{ width: 50, height: 50 }} />
        </div>
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold">
            {userInfo.userName}
          </h2>
          <p className={`${theme === "dark" ? "text-gray-200" : "text-gray-800"}`}>
            {userInfo.role === "Job" ? "Job Seeker" : "Employer"}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between p-4">
        <span className={`${theme === 'dark' ? 'text-white' : 'text-black'}`}>Online for messages</span>
        <Switch
          checked={onlineStatus}
          onChange={handleOnlineStatusToggle}
          sx={{
            '& .MuiSwitch-switchBase': {
              color: theme === 'dark' ? 'white' : 'white',
            },
            '& .MuiSwitch-switchBase.Mui-checked': {
              color: theme === 'dark' ? '#fb0505' : '#004d40',
            },
            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
              backgroundColor: theme === 'dark' ? 'red' : 'teal',
            },
            '& .MuiSwitch-switchBase.Mui-checked:hover': {
              backgroundColor: 'transparent', // Remove the bluish tint on hover
            },
          }}
        />
      </div>

      <ProfileMenuItem
        icon={AccountCircle}
        text="Profile"
        onClick={() => {
          navigate("/profile");
          handleProfileMenuClose();
        }}
      />

      <ProfileMenuItem
        icon={TrendingUp}
        text="Jobs"
        onClick={() => {
          navigate("/jobs");
          handleProfileMenuClose();
        }}
      />

      <ProfileMenuItem
        icon={CardMembership}
        text="Membership"
        onClick={() => {
          navigate("/membership");
          handleProfileMenuClose();
        }}
      />

      <ProfileMenuItem
        icon={Settings}
        text="Settings"
        onClick={() => {
          navigate("/settings");
          handleProfileMenuClose();
        }}
      />

      <ProfileMenuItem
        icon={Logout}
        text="Logout"
        onClick={logout}
      />
    </Menu>
  );
};

export default NavMenu;