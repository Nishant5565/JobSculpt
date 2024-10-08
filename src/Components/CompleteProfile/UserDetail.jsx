import React, { useState, useEffect, useContext } from "react";
import { checkUsername, debounce } from "../../Functions/SignupApi";
import { ThemeContext } from "../../Pages/ThemeContext";
import {
  updateProfileCompleteStatus,
  updateUserName,
} from "../../Functions/CompleteProfile";

import {
  Avatar,
  Skeleton,
  Tooltip,
  Box,
  Typography,
  Button,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { parseISO, set } from 'date-fns';


const UserDetail = ({
  userInfo,
  setStep,
  editStep,
  setPreviewOpenModal,
  setUpdatedUser,
  setOpenSnackbar,setSnackbarMessage,setSnackbarSeverity
}) => {
  const [userName, setUserName] = useState("");
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [dob, setDob] = useState("");
  const [usernameAvailable, setUsernameAvailable] = useState("");
  const [loading, isLoading] = useState(false);
  const { theme } = useContext(ThemeContext);
  

  useEffect(() => {
    if (
      userInfo?.about &&
      userInfo?.name &&
      userInfo?.userName &&
      userInfo?.dob
    ) {
      setUserName(userInfo.userName);
      setName(userInfo.name);
      setAbout(userInfo.about);
      setDob(parseISO(userInfo.dob));

    }
  }, [userInfo]);

  const handleNext = () => {
    if (!editStep) {
      updateUserName(userName, name, about, dob).then((data) => {
        setUpdatedUser(data?.data);
      });
      setSnackbarMessage(data?.msg);
      if(data.status === 200){
        setSnackbarSeverity('success');
      }else{
        setSnackbarSeverity('error');
      }
      setOpenSnackbar(true);
      setPreviewOpenModal(false);
      return;
    }
    updateUserName(userName, name, about, dob);
    updateProfileCompleteStatus("Education");
    setStep("Education");
  };

  const handleClose = () => {
    setPreviewOpenModal(false);
  };

  const debouncedCheckUsername = debounce(
    (userName) => checkUsername(userName, setUsernameAvailable),
    500
  );

  return (
    <>
      <Box className="w-full max-w-2xl mx-auto flex flex-col items-center">
        <Box className={`w-full rounded-3xl p-8 transition-all duration-300`}>
          <h2
            className={`text-2xl font-bold text-center mt-20 mb-10 ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          >
            Update your profile
          </h2>
          {/* Username Section */}
          <Box mb={6}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Choose a Username
              <Tooltip
                title="Your unique identifier on the platform"
                placement="right"
              ></Tooltip>
            </Typography>
            <input
              type="text"
              id="userName"
              placeholder="Enter your username"
              value={userName}
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
              defaultValue={!editStep && userInfo?.name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border-2 rounded-full focus:ring-4 focus:ring-primary outline-none transition-all duration-300 text-black"
              placeholder="Enter your name"
            />
          </Box>

          <Box mb={6}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Date of Birth
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <div>
                <DatePicker
                  value={dob}
                  onChange={(newValue) => {
                    setDob(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      sx={{
                        "& .MuiInputBase-root": {
                          borderRadius: "25px",
                          border: "none",
                          outline: "none",
                        },
                        "& .MuiInputBase-input": {
                          padding: "13px",
                          border: "none",
                          outline: "none",
                        },
                        width: "100%",
                      }}
                    />
                  )}
                />
              </div>
            </LocalizationProvider>
          </Box>

          <Box mb={6}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Tell us about yourself
            </Typography>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              id="about"
              className="w-full px-4 py-3 border-2 rounded-lg focus:ring-4 focus:ring-primary outline-none transition-all duration-300 text-black"
              placeholder="Write about yourself"
            />
          </Box>

          {/* Completion Message */}
          <Box textAlign="">
            <Typography
              variant="body2"
              sx={{
                mt: 2,
                color: theme === "dark" ? "gray.400" : "gray.600",
                fontSize: "13px",
              }}
            >
              User name is your unique identifier on the platform.
              <br />
              User name should be unique and atleast 5 characters long.
              <br />
            </Typography>
          </Box>
        </Box>
        <div className="flex justify-end w-full mt-10 gap-6">
          <button
            onClick={handleNext}
            className={`px-10 py-3 rounded-full ${
              theme !== "dark"
                ? "bg-white text-black hover:bg-black hover:text-white border-2 border-black"
                : "bg-black text-white hover:bg-white hover:text-black "
            } transition-all duration-300\
            hover:scale-105
            ${
              userName.length < 5 ||
              usernameAvailable === "Username already exists"
                ? "cursor-not-allowed"
                : ""
            }`}
            disabled={
              userName.length < 5 ||
              usernameAvailable === "Username already exists"
            }
          >
            {editStep ? "Next" : "Update"}
          </button>
          {!editStep && (
            <button
              onClick={handleClose}
              className={`px-10 py-3 rounded-full ${
                theme !== "dark"
                  ? "bg-white text-black hover:bg-black hover:text-white border-2 border-black"
                  : "bg-black text-white hover:bg-white hover:text-black "
              } transition-all duration-300\
                hover:scale-105`}
            >
              Close
            </button>
          )}
        </div>
      </Box>
    </>
  );
};

export default UserDetail;
