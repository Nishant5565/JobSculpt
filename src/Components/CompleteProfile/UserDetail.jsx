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
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { parseISO } from 'date-fns';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const UserDetail = ({
  userInfo,
  setStep,
  editStep,
  setPreviewOpenModal,
  setUpdatedUser,
  setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity
}) => {
  const [usernameAvailable, setUsernameAvailable] = useState("");

  const { theme } = useContext(ThemeContext);

  const debouncedCheckUsername = debounce(
    (userName) => checkUsername(userName, setUsernameAvailable),
    500
  );


  const validationSchema = Yup.object({
    userName: Yup.string()
      .min(5, 'Username must be at least 5 characters')
      .required('Username is required'),
    name: Yup.string().required('Name is required'),
    dob: Yup.date().required('Date of Birth is required'),
    about: Yup.string(),
  });

  const handleNext = (values, { setSubmitting }) => {
    const { userName, name, about, dob } = values;
    if (!editStep) {
      updateUserName(userName, name, about, dob).then((data) => {
        setUpdatedUser(data?.data);
        if (data.status === 200) {
        setSnackbarMessage('Profile updated successfully');
          setSnackbarSeverity('success');
        } else {
          setSnackbarMessage('Failed to update profile');
          setSnackbarSeverity('error');
        }
        setOpenSnackbar(true);
        setPreviewOpenModal(false);
      });
      return;
    }

    updateUserName(userName, name, about, dob).then((data) => {
      console.log(data);
      if (data.status === 200) {
        updateProfileCompleteStatus("Education");
        setStep("Education");
      setSubmitting(false);
      } else {
        
        setSnackbarMessage('Failed to update profile');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      }
    }
    );
  };

  const handleClose = () => {
    setPreviewOpenModal(false);
  };

  return (
    <Formik
      initialValues={{
        userName: userInfo?.userName || '',
        name: userInfo?.name || '',
        dob: userInfo?.dob ? parseISO(userInfo.dob) : null,
        about: userInfo?.about || '',
      }}
      validationSchema={validationSchema}
      onSubmit={handleNext}
    >
      {({ values, handleChange, handleBlur, setFieldValue, isSubmitting }) => {
        useEffect(() => {
          if (userInfo) {
            setFieldValue('userName', userInfo.userName);
            setFieldValue('name', userInfo.name);
            setFieldValue('about', userInfo.about);
            setFieldValue('dob', parseISO(userInfo.dob));
          }
        }, [userInfo, setFieldValue]);

        return (
          <Form>
            <Box className="w-full max-w-2xl mx-auto flex flex-col items-center">
              <Box className={`w-full rounded-3xl p-8 transition-all duration-300`}>
                <h2
                  className={`text-2xl font-bold text-center mt-20 mb-10 ${theme === "dark" ? "text-white" : "text-black"}`}
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
                  <Field
                    type="text"
                    id="userName"
                    name="userName"
                    placeholder="Enter your username"
                    value={values?.userName}
                    onChange={(e) => {
                      handleChange(e);
                      if (e.target.value.length > 3) {
                        debouncedCheckUsername(e.target.value);
                      }
                    }}
                    className={`w-full px-4 py-3 border-2 rounded-full focus:ring-4 focus:ring-primary outline-none transition-all duration-300 text-black ${usernameAvailable === "Username already exists" ? "border-red-500" : ""}`}
                  />
                  <ErrorMessage name="userName" component="div" className="text-red-500 mt-1" />
                  {values?.userName?.length > 5 &&  (
                    <Typography
                      variant="body2"
                      sx={{
                        mt: 1,
                        color: usernameAvailable === "Username is already taken" ? "red" : "green",
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
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full px-4 py-3 border-2 rounded-full focus:ring-4 focus:ring-primary outline-none transition-all duration-300 text-black"
                    placeholder="Enter your name"
                  />
                  <ErrorMessage name="name" component="div" className="text-red-500 mt-1" />
                </Box>

                {/* Date of Birth Section */}
                <Box mb={6}>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    Date of Birth
                  </Typography>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      value={values.dob}
                      onChange={(newValue) => {
                        setFieldValue('dob', newValue);
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
                  </LocalizationProvider>
                  <ErrorMessage name="dob" component="div" className="text-red-500 mt-1" />
                </Box>

                {/* About Section */}
                <Box mb={6}>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    Tell us about yourself
                  </Typography>
                  <Field
                    as="textarea"
                    id="about"
                    name="about"
                    value={values.about}
                    onChange={handleChange}
                    onBlur={handleBlur}
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
                    User name should be unique and at least 5 characters long.
                    <br />
                  </Typography>
                </Box>
              </Box>
              <div className="flex justify-end w-full mt-10 gap-6">
                <button
                  type="submit"
                  className={`px-10 py-3 rounded-full ${theme !== "dark" ? "bg-white text-black hover:bg-black hover:text-white border-2 border-black" : "bg-black text-white hover:bg-white hover:text-black"} transition-all duration-300 hover:scale-105 ${values?.userName?.length < 5 || usernameAvailable === "Username is already taken" ? "cursor-not-allowed" : ""}`}
                  // disabled={ values?.userName?.length < 5 || usernameAvailable === "Username is already taken" || isSubmitting}

                >
                  {editStep ? "Next" : "Update"}
                </button>
                {!editStep && (
                  <button
                    type="button"
                    onClick={handleClose}
                    className={`px-10 py-3 rounded-full ${theme !== "dark" ? "bg-white text-black hover:bg-black hover:text-white border-2 border-black" : "bg-black text-white hover:bg-white hover:text-black"} transition-all duration-300 hover:scale-105`}
                  >
                    Close
                  </button>
                )}
              </div>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};

export default UserDetail;