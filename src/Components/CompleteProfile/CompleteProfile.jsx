import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../../Pages/ThemeContext";
import api_call from "../../Functions/api_call";
import { checkUsername } from "../../Functions/SignupApi";
import UserDetail from "./UserDetail";
import MinFooter from "../Footer/MinFooter";
import UploadImage from "./UploadImage";
import Start from "./Start";
import { Link } from "react-router-dom";
import Role from "./role";
import Navbar from "../Navbar/Navbar";
import ProfileLoading from "./ProfileLoading";
import Education from "./Education";
import Skills from "./Skills";
import "./CompleteProfile.css";
import { useNavigate } from "react-router-dom";
import Preview from "./Preview";
import JobSculptLogo from "../../Functions/JobSculptLogo";
import { Alert, Snackbar } from "@mui/material";

const CompleteProfile = () => {
  const { theme } = useContext(ThemeContext);
  const { authuser } = api_call();
  const [userInfo, setUserInfo] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [step, setStep] = useState("");
  const [reloadUser, setReloadUser] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  useEffect(() => {
    setLoading(true);
    const user = localStorage.getItem("token");
    if (!user) {
      navigate("/login");
    }
    if (user) {
      authuser().then((data) => {
        if (data) {
          setIsLoggedIn(true);
          setUserInfo(data);
          setStep(data?.profileCompleteStatus);
          if (data?.profileCompleteStatus == "Complete") {
            navigate("/");
          }
          setLoading(false);
        }
      });
    }
  }, []);

  if (loading) {
    return (
      <>
        <JobSculptLogo />
        <div
          className={`  ${
            theme === "dark" ? "bg-black" : "bg-white"
          } p-10 mb-10 min-h-screen `}
        >
          <ProfileLoading theme={theme} />
        </div>
      </>
    );
  }

  return (
    <>
      {/* <Navbar /> */}

      <JobSculptLogo />
      <div
        className={`  ${
          theme === "dark" ? "bg-black" : "bg-white"
        } md:p-10 mb-10 ${step == "Preview" && "hidden"}`}
      >
        <div
          className={`${
            theme === "dark" ? "bg-[#000000]" : "bg-[#ffffff]"
          } rounded-[25px] md:p-6 p-2 mb-10 min-h-screen flex items-center justify-center `}
        >
          <div
            className={`${
              theme === "dark" ? " bg-light-black border-2" : "bg-[white]"
            } container mx-auto max-w-4xl p-10 sm:p-20 rounded-3xl shadow-2xl transition-all duration-500 `}
          >
            {step == "Incomplete" ? (
              userInfo?.role == "user" ? (
                <Role
                  setStep={setStep}
                  theme={theme}
                  user={userInfo}
                  setReloadUser={setReloadUser}
                  setUserInfo={setUserInfo}
                  isStarting="true"
                />
              ) : (
                <Start setStep={setStep} theme={theme} userInfo={userInfo} />
              )
            ) : null}

            {step == "UploadImage" && (
              <UploadImage
                user={userInfo}
                setStep={setStep}
                editStep={true}
                theme={theme}
              />
            )}
            {step == "UserDetail" && (
              <UserDetail
                userInfo={userInfo}
                setStep={setStep}
                editStep={true}
                theme={theme}
                setOpenSnackbar={setOpenSnackbar}
                setSnackbarMessage={setSnackbarMessage}
                setSnackbarSeverity={setSnackbarSeverity}
              />
            )}
            {step == "Education" && (
              <Education
                user={userInfo}
                setStep={setStep}
                theme={theme}
                editStep={true}
                page={"education"}
              />
            )}
            {step == "Work" && (
              <Education
                user={userInfo}
                setStep={setStep}
                theme={theme}
                editStep={true}
                page={"workExperience"}
              />
            )}
            {step == "Skills" && (
              <Skills
                user={userInfo}
                setStep={setStep}
                theme={theme}
                editStep={true}
              />
            )}
          </div>
        </div>
      </div>
      <div>
        {step == "Preview" && (
          <>
            <Preview user={userInfo} setStep={setStep} theme={theme} />
          </>
        )}

        <Snackbar
          open={openSnackbar}
          autoHideDuration={4000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={() => setOpenSnackbar(false)}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </div>
      <MinFooter />
    </>
  );
};

export default CompleteProfile;
