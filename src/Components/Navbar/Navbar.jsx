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
import ThemeSwitcher from "./ThemeSwitcher";
import {Avatar, ThemeProvider, createTheme } from '@mui/material';
import MobileNavbar from "./MobileNavbar";
import api_call from "../../Functions/api_call";
import NavMenu from "./NavMenu";
import { ThemeContext } from "../../Pages/ThemeContext";

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
  const { theme, toggleTheme } = useContext(ThemeContext);
  const {authuser} = api_call();

  const handleClick = () => {
    setIsOpened(!isOpened);
  };

  const handleOnlineStatusToggle = () => {
    setOnlineStatus(!onlineStatus);
  };

  useEffect(() => {
    const user = localStorage.getItem("token");
    if (user) {
      authuser().then((data) => {
        console.log(data.theme);
        if (data) {
          if (data.theme != theme) {
            toggleTheme();
          }
          setIsLoggedIn(true);
          setUserInfo(data);
        }
      });  
    }
  }, []);

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
      theme === "dark" ? "bg-[#131313] text-gray-200 backdrop-blur-[5px] bg-opacity-60" : "bg-[white] text-gray-800"
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
            {userInfo?.role === "employer" &&         <Link to="/hire" className={`${theme === "dark" ? 'text-gray-300 hover:text-red-600' : 'text-gray-800 hover:text-teal-700'} relative group nav-text`}>
              Post Job 
            </Link>}
            {
              userInfo?.role === "employer" ? (
                <Link to="/jobs/posted" className={`${theme === "dark" ? 'text-gray-300 hover:text-red-600' : 'text-gray-800 hover:text-teal-700'} relative group nav-text`}>
                See Your Jobs 
              </Link>
              ) :             <Link to="/findJobs" className={`${theme === "dark" ? 'text-gray-300 hover:text-red-600' : 'text-gray-800 hover:text-teal-700'} relative group nav-text`}>
              Find Jobs
            </Link>
            }

            <Link to="/contact" className={`${theme === "dark" ? 'text-gray-300 hover:text-red-600' : 'text-gray-800 hover:text-teal-700'} relative group nav-text`}>
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
          <ThemeProvider theme={themeConfig}>
            <ThemeSwitcher theme={theme} toggleTheme={toggleTheme} />
          </ThemeProvider>
              <Link to="/login" className={`${theme 
              === "dark" ? "text-red-600" : "text-teal-700"
              } JobSculpt px-5 themeTransition`}>
                Log in
              </Link>
              <Link
                to="/choosetheme"
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
                <NavMenu anchorEl={anchorEl} handleProfileMenuClose={handleProfileMenuClose} userInfo={userInfo} theme={theme} onlineStatus={onlineStatus} handleOnlineStatusToggle={handleOnlineStatusToggle} logout={logout} />
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  ) : (
    <>
    <MobileNavbar isLoggedIn={isLoggedIn} isOpened ={isOpened} handleClick={handleClick}  isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} theme={theme} logout={logout} toggleTheme ={toggleTheme}  />
    </>
  );
};

export default Navbar;
