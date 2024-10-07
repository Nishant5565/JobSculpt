import React from 'react';
import { Link } from 'react-router-dom';
import { IoChevronBackOutline } from 'react-icons/io5';
import { CiSearch } from 'react-icons/ci';
import SearchBar from "../SearchBar/SearchBar";
import ThemeSwitcher from "../../DashBaord/ThemeSwitcher";

const MobileNavbar = ({ isLoggedIn, isOpened, handleClick, isSearchOpen, setIsSearchOpen, theme, logout, toggleTheme }) => {
  return (
    <>
      {/* Hamburger */}

      <div className={`flex fixed items-center h-16 w-screen justify-center z-[10] ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'} shadow-md gap-10 `}>
        <Link to={"/"} className="text-xl font-bold JobSculpt z-[1000] ">
          JobSculpt
        </Link>
        {!isLoggedIn ? (
          <Link
            to="/choosetheme"
            className="bg-teal-700 text-white px-5 py-2 rounded-lg"
          >
            Signup
          </Link>
        ) : (
          null
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
            style={{ stroke: theme === 'dark' ? 'white' : 'black' }}
          />
          <path
            className="line line2"
            d="M 20,50 H 80"
            style={{ stroke: theme === 'dark' ? 'white' : 'black' }}
          />
          <path
            className="line line3"
            d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
            style={{ stroke: theme === 'dark' ? 'white' : 'black' }}
          />
        </svg>
      </button>

      {isSearchOpen ? (
        <div
          className={`search-bar-mobile z-50 fixed top-0 w-screen ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'} h-screen transform transition-transform duration-500 ${
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
        className={`mobile-navbar ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'} shadow-md transform transition-transform duration-500 fixed w-full top-0 z-10 ${
          !isOpened ? "-translate-x-full" : "translate-x-0"
        }`}
      >
        <div className="container flex flex-col h-screen items-center justify-between py-6 px-6">
          <div className="flex flex-col justify-between gap-4">
            <Link to={"/"} className="text-xl font-bold JobSculpt " onClick={handleClick}>
              JobSculpt
            </Link>
          </div>

          <div className="flex items-center justify-center gap-4">
               <p className="text-lg font-bold">
                    Theme
               </p>
           <ThemeSwitcher theme={theme} toggleTheme={toggleTheme} />
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
                  to="/choosetheme"
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

export default MobileNavbar;