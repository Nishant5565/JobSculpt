import React, { useState, useEffect, useContext } from "react";
import { checkUsername, debounce } from "../../Functions/SignupApi";
import { ThemeContext } from "../../Pages/ThemeContext";
import { updateProfileCompleteStatus, updateUserName } from '../../Functions/CompleteProfile';

import {
  Avatar,
  Skeleton,
  Tooltip,
  Box,
  Typography,
  Button,
} from "@mui/material";

const UserDetail = ({ userInfo, setStep }) => {
  const [userName, setUserName] = useState("");
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [usernameAvailable, setUsernameAvailable] = useState("");
  const [loading, isLoading] = useState(false);
  const { theme } = useContext(ThemeContext);




  const handleNext = () => {
    updateUserName(userName, name, about);
    updateProfileCompleteStatus('Education');
    setStep('Education'); 
  };

  const debouncedCheckUsername = debounce(
    (userName) => checkUsername(userName, setUsernameAvailable),
    500
  );

  return (
    <div className={`${theme === 'dark' ? 'bg-[#131313]' : 'bg-[#f5f5f5]'} rounded-[25px] p-6 min-h-screen flex items-center justify-center`}>
      <div className={`${theme === 'dark' ? 'bg-[#222222]' : 'bg-white'} container mx-auto max-w-4xl p-10 sm:p-20 rounded-3xl shadow-2xl transition-all duration-500`}>
      <Box className="w-full max-w-2xl mx-auto flex flex-col items-center">
        <Box
          className={`w-full rounded-3xl p-8 transition-all duration-300`}
        >

          {/* Username Section */}
            <Box mb={6}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Choose a Username
                <Tooltip
                  title="Your unique identifier on the platform"
                  placement="right"
                >
                </Tooltip>
              </Typography>
              <input
                type="text"
                id="userName"
                value = {userName}  
                onChange={(e) => {
                  setUserName(e.target.value);
                  if (e.target.value.length > 3) {
                    debouncedCheckUsername(e.target.value);
                  }
                }}
                className={`w-full px-4 py-3 border-2 rounded-full focus:ring-4 focus:ring-primary outline-none transition-all duration-300 text-black ${
                  usernameAvailable === "Username already exists"
                    ? "border-red-500"
                    : ""
                }`}
                placeholder="Enter your username"
              />
              {userName.length > 5 && (
                <Typography
                  variant="body2"
                  sx={{
                    mt: 1,
                    color:
                      usernameAvailable === "Username already exists"
                        ? "red"
                        : "green",
                  }}
                >
                  {usernameAvailable}
                </Typography>
              )}
            </Box>

          {/* Name Section */}
          <Box mb={6}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Your Name
            </Typography>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border-2 rounded-full focus:ring-4 focus:ring-primary outline-none transition-all duration-300 text-black"
              placeholder="Enter your name"
            />
          </Box>

          {/* About You section */}

          <Box mb={6}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Tell us about yourself
            </Typography>
            <textarea
              value = {about}
              id="about"
              className="w-full px-4 py-3 border-2 rounded-lg focus:ring-4 focus:ring-primary outline-none transition-all duration-300 text-black"
              placeholder="Write about yourself"
            />
          </Box>


          {/* Completion Message */}
          <Box textAlign="">
            <Typography
              variant="body2"
              sx={{ mt: 2, color: theme === "dark" ? "gray.400" : "gray.600", fontSize: "13px" }}
            >
              User name is your unique identifier on the platform.
              <br />
              User name should be unique and atleast 5 characters long.
              <br />
            </Typography>
          </Box>
        </Box>
        <div className="flex justify-center mt-10">
          <button
            onClick={handleNext}
            className={`px-6 py-3 rounded-full text-white text-lg hover:bg-indigo-500'

            ${userName.length < 5 || usernameAvailable === "Username already exists" ? "cursor-not-allowed bg-gray-400" : `bg-indigo-600 hover:bg-indigo-500`
            }`}


            disabled={userName.length < 5 || usernameAvailable === "Username already exists"}
          >
            Next
          </button>
          </div>
      </Box>
      </div>
    </div>
  );
};

export default UserDetail;
