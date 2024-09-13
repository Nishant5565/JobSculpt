import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { API_URL } from "../../Functions/Constants";
import Logo from "../../assets/Images/LogoNoBg.png"; // Ensure the path is correct
import "../Styling/Buttons.css";
import "./Navbar.css";
import SearchBar from "../SearchBar/SearchBar";
import { CiSearch } from "react-icons/ci";
import { IoChevronBackOutline } from "react-icons/io5";
import ThemeSwitcher from "../../DashBaord/ThemeSwitcher";
import { Box, Toolbar, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import {
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Switch,
} from "@mui/material";
import {
  AccountCircle,
  TrendingUp,
  CardMembership,
  Settings,
  Logout,
  People,
} from "@mui/icons-material";
import { ThemeContext } from "../../Pages/ThemeContext";

const Navbar = ({handleSendTheme}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [device, setDevice] = useState("Desktop");
  const [hamburger, setHamburger] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const [onlineStatus, setOnlineStatus] = useState(true);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleClick = () => {
    setIsOpened(!isOpened);
  };

  const handleOnlineStatusToggle = () => {
    setOnlineStatus(!onlineStatus);
  };

  useEffect(() => {
    const user = localStorage.getItem("token");
    if (user) {
      checkAuthUser();
    }
  }, []);

  const checkAuthUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      const response = await axios.post(
        `${API_URL}/api/auth/auth-user`,
        {},
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      if (response.status === 200) {
        setIsLoggedIn(true);
        setUserInfo(response.data);
      } else {
        logout();
      }
    } catch (err) {
      console.error("User not authenticated:", err);
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  useEffect(() => {
    if (window.innerWidth < 900) {
      setDevice("Mobile");
    }
  }, []);

  useEffect(() => {
    document.body.style.backgroundColor = theme === "dark" ? "black" : "#fff";
  }, [theme]);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const themeConfig = createTheme({
    palette: {
      mode: theme,
    },
  });

  return device === "Desktop" ? (
    <nav className={`
    ${
      theme === "dark" ? "bg-[#131313] text-gray-200" : "bg-[white] text-gray-800"
    }
    fixed w-full z-10 top-0 themeTransition rounded-b-[20px]`}>
      <div className="flex items-center justify-between h-[60px] px-6">
        <div className="flex items-center gap-10">
          <Link
            to={"/"}
            className={` ${theme === "dark" ? "text-red-600" : ""} themeTransition text-2xl font-extrabold JobSculpt`}
          >
            JobSculpt
          </Link>
          <div className="space-x-6 text-lg flex items-center">
            <Link to="/" className={`${theme === "dark" ? 'text-gray-300 hover:text-red-600' : 'text-gray-800 hover:text-teal-700'} relative group nav-text`}>
              Hire
            </Link>
            <Link to="/about" className={`${theme === "dark" ? 'text-gray-300 hover:text-red-600' : 'text-gray-800 hover:text-teal-700'} relative group nav-text`}>
              About
            </Link>
            <Link to="/FindJobs" className={`${theme === "dark" ? 'text-gray-300 hover:text-red-600' : 'text-gray-800 hover:text-teal-700'} relative group nav-text`}>
              Find Jobs
            </Link>
            <Link to="/contact" className={`${theme === "dark" ? 'text-gray-300 hover:text-red-600' : 'text-gray-800 hover:text-teal-700'} relative group nav-text`}>
              Contact
            </Link>
          </div>
        </div>
        <div className=" translate-x-[200px]">
          <SearchBar />
        </div>

        <div className="flex items-center gap-4">
          <ThemeProvider theme={themeConfig}>
            <ThemeSwitcher theme={theme} toggleTheme={toggleTheme} />
          </ThemeProvider>
          {!isLoggedIn ? (
            <>
              <Link to="/login" className={`${theme 
              === "dark" ? "text-red-600" : "text-teal-700"
              } JobSculpt px-5 themeTransition`}>
                Log in
              </Link>
              <Link
                to="/signup"
                className={`${
                  theme != "dark"
                    ? "bg-teal-600 text-white"
                    : "bg-red-600 text-white"
                } px-5 py-2 rounded-lg themeTransition`}
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 hover:cursor-pointer">
                <Avatar
                  src={userInfo.profileImage}
                  sx={{ width: 40, height: 40, cursor: "pointer" }} 
                  onClick={handleProfileMenuOpen}
                />  
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
                      backgroundColor: theme === "dark" ? "black" : "#fff",
                    },
                  }}
                >
                  <div className={`flex items-center gap-4 p-4 ${theme === "dark" ? "bg-[#1a1a1a]" : "bg-gray-100"} border-b border-gray-200 rounded-t-lg`}>
                    <div>
                      <Avatar src={userInfo.profileImage} 
                      sx = {{width: 50, height: 50}}
                      />
                    </div>
                    <div className="flex flex-col">
                      <h2 className="text-lg font-semibold">
                        {userInfo.userName}
                      </h2>
                      <p className= {`${theme === "dark" ? "text-gray-200" : "text-gray-800"}`}>
                        {userInfo.role === "Job" ? "Job Seeker" : "Employer"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4">
                    <span className={`${theme == 'dark' ? 'text-white':' text-black'}`}>Online for messages</span>
                    <Switch
                      checked={onlineStatus}
                      onChange={handleOnlineStatusToggle}
                      sx={
                        {
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
                        }
                      }
                    />
                  </div>

                  <MenuItem onClick={() => {navigate("/profile")
                    handleProfileMenuClose()
                  } }>
                    <ListItemIcon>
                      <AccountCircle />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                  </MenuItem>

                </Menu>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  ) : (
    <></>
  );
};

export default Navbar;
