import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { API_URL } from "../../Functions/Constants";
import Logo from "../../assets/Images/LogoNoBg.png"; // Make sure the path is correct
import "../Styling/Buttons.css";
import "./Navbar.css";
import SearchBar from "../SearchBar/SearchBar";
import { CiSearch } from "react-icons/ci";
import { IoChevronBackOutline } from "react-icons/io5";
import {
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  AccountCircle,
  TrendingUp,
  CardMembership,
  Settings,
  Logout,
} from "@mui/icons-material";
import Switch from "@mui/material/Switch"; // For the online/offline toggle
import { People } from "@mui/icons-material"; // For the connects icon
import { FaUser } from "react-icons/fa";

const Navbar = () => {
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
    console.log(location);
  }, []);

  const checkAuthUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    console.log(token);
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

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  return device === "Desktop" ? (
    <nav className="bg-white text-gray-800 fixed w-full z-10 top-0 ">
      <div className="flex items-center justify-between h-[60px] px-6">
        <div className="flex items-center gap-10">
          <Link
            to={"/"}
            className="text-2xl font-extrabold JobSculpt "
          >
            JobSculpt
          </Link>
          <div className="space-x-6 text-lg flex items-center">
            <Link to="/" className="relative group  nav-text">
              Hire
            </Link>
            <Link to="/about" className="relative group nav-text">
              About
            </Link>
            <Link to="/FindJobs" className="relative group  nav-text">
              Find Jobs
            </Link>
            <Link to="/contact" className="relative group  nav-text">
              Contact
            </Link>
          </div>
        </div>
        <div className=" translate-x-[200px]">
          <SearchBar />
        </div>
        <div className="flex items-center gap-4">
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="JobSculpt px-5">
                Log in
              </Link>
              <Link
                to="/signup"
                className="bg-teal-700 text-white px-5 py-2 rounded-lg"
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              {/* Profile photo of the user in a circular div */}
              <div className="flex items-center gap-2 hover:cursor-pointer ">
                <img
                  src={userInfo?.profileImage}
                  alt="Profile"
                  className="w-10 h-10 rounded-full shadow-md shadow-gray-400"
                  onClick={handleProfileMenuOpen}
                />

                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleProfileMenuClose}
                  PaperProps={{
                    elevation: 5,
                    sx: {
                      mt: 1.5,
                      borderRadius: "12px",
                      minWidth: "270px",
                      padding: "0px",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                      border: "1px solid #e0e0e0",
                    },
                  }}
                >
                  {/* User Info Section */}
                  <div className="flex items-center gap-4 p-4 bg-gray-100 border-b border-gray-200 rounded-t-lg">
                    <div>
                      <img
                        src={userInfo?.profileImage}
                        alt="Profile"
                        className="w-14 h-14 rounded-full border-2 border-gray-300 shadow-md"
                      />
                    </div>
                    <div className="flex flex-col">
                      <h2 className="text-lg font-semibold">
                        {userInfo.userName}
                      </h2>
                      <p className="text-gray-600 text-sm">
                        {userInfo.role === "Job" ? "Job Seeker" : "Employer"}
                      </p>
                    </div>
                  </div>

                  {/* Online Status */}
                  <div className="flex items-center justify-between p-4">
                    <span className="text-gray-600">Online for messages</span>
                    <Switch
                      checked={onlineStatus}
                      onChange={handleOnlineStatusToggle}
                    />
                  </div>

                  {/* Menu Items */}
                  <MenuItem
                    onClick={() => {
                      navigate("/profile");
                      handleProfileMenuClose();
                    }}
                    className="px-4 py-3 hover:bg-gray-100"
                  >
                    <ListItemIcon>
                      <AccountCircle fontSize="large" />
                    </ListItemIcon>
                    <ListItemText primary="Your Profile" />
                  </MenuItem>

                  <MenuItem
                    onClick={() => {
                      navigate("/stats-trends");
                      handleProfileMenuClose();
                    }}
                    className="px-4 py-3 hover:bg-gray-100"
                  >
                    <ListItemIcon>
                      <TrendingUp fontSize="large" />
                    </ListItemIcon>
                    <ListItemText primary="Stats and Trends" />
                  </MenuItem>

                  <MenuItem
                    onClick={() => {
                      navigate("/membership-plans");
                      handleProfileMenuClose();
                    }}
                    className="px-4 py-3 hover:bg-gray-100"
                  >
                    <ListItemIcon>
                      <CardMembership fontSize="large" />
                    </ListItemIcon>
                    <ListItemText primary="Membership Plan" />
                  </MenuItem>

                  <MenuItem
                    onClick={() => {
                      navigate("/connects");
                      handleProfileMenuClose();
                    }}
                    className="px-4 py-3 hover:bg-gray-100"
                  >
                    <ListItemIcon>
                      <People fontSize="large" />
                    </ListItemIcon>
                    <ListItemText primary="Connects" />
                  </MenuItem>

                  <hr className="my-2 border-gray-200" />

                  <MenuItem
                    onClick={() => {
                      navigate("/account-settings");
                      handleProfileMenuClose();
                    }}
                    className="px-4 py-3 hover:bg-gray-100"
                  >
                    <ListItemIcon>
                      <Settings fontSize="large" />
                    </ListItemIcon>
                    <ListItemText primary="Account Settings" />
                  </MenuItem>

                  <MenuItem
                    onClick={logout}
                    className="px-4 py-3 hover:bg-gray-100"
                  >
                    <ListItemIcon>
                      <Logout fontSize="large" />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                  </MenuItem>
                </Menu>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  ) : (
    <>
      {/* Hamburger */}
      <div className="flex fixed items-center h-16 w-screen justify-center z-[10] bg-white shadow-md">
        <Link to={"/"} className="text-xl font-bold JobSculpt z-[1000] ">
          JobSculpt
        </Link>
        {!isLoggedIn ? (
          <Link
            to="/signup"
            className="bg-teal-700 text-white px-5 py-2 rounded-lg"
          >
            Signup
          </Link>
        ) : (
          <div>
            
          </div>
        )}
      </div>

      <button
        className={`menu z-50 left-4 fixed ${isOpened ? "opened" : ""}`}
        onClick={handleClick}
        aria-expanded={isOpened}
        aria-label="Main Menu"
        style={{ display: "block", margin: "2px auto" }}
      >
        <svg width="50" height="50" viewBox="0 0 100 100">
          <path
            className="line line1"
            d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
          />
          <path className="line line2" d="M 20,50 H 80" />
          <path
            className="line line3"
            d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
          />
        </svg>
      </button>

      {isSearchOpen ? (
        <div
          className={`search-bar-mobile z-50 fixed top-0 w-screen bg-white h-screen transform transition-transform duration-500 ${
            isSearchOpen ? "slide-in" : ""
          }`}
        >
          <div className="w-[90%] my-3 mx-auto flex items-center justify-between">
            <IoChevronBackOutline
              onClick={() => setIsSearchOpen(false)}
              size={20}
              className="text-black font-thin"
            />
            <div className="w-[100%]">
              <SearchBar />
            </div>
          </div>
        </div>
      ) : (
        <div
          onClick={() => setIsSearchOpen(true)}
          className="search-icon z-50 right-4 top-4 fixed slide-out"
        >
          <CiSearch size={30} />
        </div>
      )}

      <nav
        className={`mobile-navbar bg-white text-gray-800 shadow-md transform transition-transform duration-500 fixed w-full top-0 z-10 ${
          !isOpened ? "-translate-x-full" : "translate-x-0"
        }`}
      >
        <div className="container flex flex-col h-screen items-center justify-between py-6 px-6">
          <div className="flex flex-col justify-between gap-4">
            <Link to={"/"} className="text-xl font-bold JobSculpt " onClick={handleClick}>
              JobSculpt
            </Link>
          </div>

          <div className="gap-10 flex flex-col items-center justify-center">
            <Link to="/hire" className="relative group " onClick={handleClick}>
              Hire
            </Link>
            <Link to="/about" className="relative group " onClick={handleClick}>
              About
            </Link>
            <Link to="/FindJobs" className="relative group " onClick={handleClick}>
              Find Jobs
            </Link>
            <Link to="/contact" className="relative group " onClick={handleClick}>
              Contact
            </Link>

            <div className="flex flex-col gap-10">
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="JobSculpt px-5" onClick={handleClick}>
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="bg-teal-700 text-white px-5 py-2 rounded-lg"
                  onClick={handleClick}
                >
                  Signup
                </Link>
              </>
            ) : (
              <>
                <Link to="/profile" className="JobSculpt px-5" onClick={handleClick}>
                  Profile 
                </Link>
                <button onClick={logout} className="bg-teal-700 text-white px-4 py-3 rounded-[10px]">
                  Log out
                </button>
              </>
            )}
          </div>
          </div>
          <div>
              {/* Fake div so that items can be in centre */}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
