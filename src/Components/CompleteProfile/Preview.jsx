import React, { useState , useEffect} from "react";
import {
  Box,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Divider,
  Modal,
  Snackbar,
  Alert,
} from "@mui/material";
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
import { useNavigate } from "react-router-dom";
import api_call from "../../Functions/api_call";

import { Edit as EditIcon } from "@mui/icons-material";
import ChooseTheme from "../../Pages/ChooseTheme";
const Preview = ({ user, theme, setStep }) => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [editComponent, setEditComponent] = useState("");
  const [updatedUser, setUpdatedUser] = useState(user);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

const {authuser} = api_call();
const getUserData = () => {
     authuser().then((data) => {
          if (data) {
               setUpdatedUser(data);
          }
     });
};
useEffect(() => {
     getUserData();
}, [openModal]);

  const handleEditComponent = (component) => {
    setOpenModal(true);
    setEditComponent(component);
  };
  return (
    <Box
      sx={{
        backgroundColor: theme === "light" ? "#fff" : "#333",
        color: theme === "light" ? "#000" : "#fff",
        borderRadius: "25px",
        border: "1px solid #9e9e9e",
        maxWidth: "90vw",
        margin: "100px auto",
      }}
    >
     <div  className={`border-b-2 border-[#4B5563] p-10 ${
          theme !== "dark" ? "text-[#4a4a4a]" : "text-[#fdfdfd]"
        }`}>
      <div className="flex justify-between items-center md:flex-row flex-col"
      >
        <div className=" flex items-center gap-8">
          <div style={{ position: "relative", display: "inline-block" }}>
            <Avatar
              src={updatedUser?.profileImage}
              alt="Profile"
              sx={{
                width: 120,
                height: 120,
                margin: "auto",
                border:
                  theme === "dark"
                    ? "3px dotted #4B5563"
                    : "3px dotted #4B5563",
              }}
            />
            <div
              onClick={() => handleEditComponent("UploadImage")}
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: 40,
                height: 40,
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                transition: "all 0.3s",
              }}
              className="themeTransition bg-white text-black hover:bg-[#1f1f1f] hover:text-[#fff]"
            >
              <EditIcon />
            </div>
          </div>
          <div>
            <p className="text-[30px] font-semibold text-start">
              {updatedUser?.userName}
            </p>
            <p className={`text-[14px] font-semibold text-start
                    ${theme === "dark" ? "text-gray-300" : "text-gray-500"}
                    `}>
              - {updatedUser?.email}
            </p>
            <p
              className={`text-[14px] font-semibold text-end ml-32 uppercase
                    ${theme === "dark" ? "text-gray-300" : "text-gray-400"}
                    `}
            >
              - {updatedUser?.role}
            </p>

          </div>
        </div>
     
        <div className="md:h-60 bg-gray-500 md:w-[4px] h-1 w-[70vw] mt-10 mb-10 md:my-0"></div>
        <div>
          <h2 className="text-[30px] font-bold text-end ">
            {updatedUser?.name}
          </h2>
          <p className="text-[20px] font-semibold md:text-end text-center mt-10">
            {updatedUser?.dob.split("T")[0]}
          </p>
          <div className=" flex md:justify-end justify-center mt-10">
          <button
            onClick={() => handleEditComponent("UserDetail")}
            className={`px-10 py-3 rounded-full ${theme == 'dark' ? 'bg-white text-black ' : 'bg-black text-white '} transition-all duration-300 hover:scale-105`}
          >
            Edit Profile
          </button>
          </div>
        </div>
        
      </div>

     </div>
     <div className=" flex w-full md:flex-row flex-col ">
     <div className="md:w-1/3 border-r-2 min-h-screen  ">
          <div className="flex justify-between items-center p-6 my-10 md:flex-row flex-col">
               <h2 className="text-[20px] font-semibold">Theme </h2>
               <div className={`${theme === "dark" ? "bg-[#000000] text-white border-2 border-white" : "bg-[#fff] text-black border-2 border-black"} px-10 py-3 rounded-[10px]  my-4 md:my-0 `}>
                    {updatedUser.theme}
               </div>
               <button
               onClick={() => handleEditComponent("theme")}
               className={`px-10 py-3 rounded-full ${theme == 'dark' ? 'bg-white text-black ' : 'bg-black text-white '} transition-all duration-300 hover:scale-105`}
               >
                    Edit Theme
               </button>
          </div>
          <hr />
          <div className=" my-10">
               <h2 className="text-[20px] font-semibold p-6">Skills</h2>
               <div className="p-4 flex flex-wrap ">
                    {updatedUser.skills.map((skillObj) => (
                         <ul key={skillObj._id} className=" border-2 rounded-[10px] px-2 py-1 ml-2 mb-2 ">
                         <li className=" text-sm hover:scale:105 transition-all duration-300">
                              {skillObj?.skill}
                         </li>
                         </ul>
                    ))}
               </div>
               <div className="flex justify-end p-6">
               <button
               onClick={() => handleEditComponent("Skills")}
               className={`px-10 py-3 rounded-full ${theme == 'dark' ? 'bg-white text-black ' : 'bg-black text-white '} transition-all duration-300 hover:scale-105 `}
               >
                    Edit Skills
               </button>
               </div>
          </div>
          <hr />
          
          <div className="p-6 my-10">
               <h2 className="text-[20px] font-semibold">About You </h2>
               <p className=" ml-2 mt-6">
                    {updatedUser.about}
               </p>
          </div>    
     </div>
               
     <div className=" md:w-2/3 ">

     <h2 className="text-[20px] font-semibold p-6">Education</h2>
      <div className="flex flex-wrap justify-center gap-6 mb-10 md:p-0 px-4">
        {updatedUser?.education.length > 0 ? (
          updatedUser?.education.map((item, index) => (
            <div
              key={index}
              className={`p-6 rounded-[25px] mb-6 shadow-lg w-[400px] space-y-2 transition-all duration-200 hover:shadow-2xl ${
                theme === "dark" ? "bg-[#000000] border-2" : "bg-[#f8f9fa]"
              }`}
            >

               <div className="flex justify-between items-center">
                <Typography
                variant="body"
                className={`${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }  font-semibold` }
              >
                {item.institution}
              </Typography>
               <div className="py-2 flex flex-col gap-4">
               <Typography
                variant="body2"
                className={`${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                } `}
              >
               {item?.degree} -
                {item?.fieldOfStudy}
              </Typography>
              <Typography
                variant="body2"
                className={`${
                  theme === "dark" ? "text-gray-300" : "text-gray-500"
                }`}
              >
                {item.from
                  ? new Date(item.from).toLocaleDateString()
                  : "From Date Not Specified"}{" "}
                -{item.to ? new Date(item.to).toLocaleDateString() : "Ongoing"}
              </Typography>
               </div>
                </div>

            </div>
          ))
        ) : (
          <Typography
            variant="body2"
            className={`text-center ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            No Education Added
          </Typography>
        )}

            <div className="flex justify-end w-full">  
               <button
               onClick={() => handleEditComponent("Education")}
               className={`px-10 py-3 mr-10 rounded-full ${theme == 'dark' ? 'bg-white text-black ' : 'bg-black text-white '} transition-all duration-300 hover:scale-105`}
               >
                    {
                         updatedUser?.education.length > 0 ? 'Edit Education' : 'Add Education'
                    }
               </button>
               </div>
      </div>
      <Divider sx={{ my: 10 }} />

      <h2 className="text-[20px] font-semibold p-6">Work Experience</h2>
      <div className="flex flex-wrap justify-center gap-6 mb-20 md:p-0 px-4">
        {updatedUser?.workExperience.length > 0 ? (
          updatedUser?.workExperience.map((item, index) => (
            <div
              key={index}
              className={`p-6 rounded-[25px] mb-6 shadow-lg w-[400px] space-y-2 transition-all duration-200 hover:shadow-2xl ${
                theme === "dark" ? "bg-[#000000] border-2" : "bg-[#f8f9fa]"
              }`}
            >

               <div className="flex justify-between items-center">
                <Typography
                variant="body"
                className={`${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }  font-semibold` }
              >
                {item.company}
              </Typography>
               <div className="py-2 flex flex-col gap-4">
               <Typography
                variant="body2"
                className={`${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                } `}
              >
               {
                    item.position
               }
              </Typography>
              <Typography
                variant="body2"
                className={`${
                  theme === "dark" ? "text-gray-300" : "text-gray-500"
                }`}
              >
                {item.from
                  ? new Date(item.from).toLocaleDateString()
                  : "From Date Not Specified"}{" "}
                -{item.to ? new Date(item.to).toLocaleDateString() : "Ongoing"}
              </Typography>
               </div>
                </div>

            </div>
          ))
        ) : (
          <Typography
            variant="body2"
            className={`text-center ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            No Education Added
          </Typography>
        )}

            <div className="flex justify-end w-full">  
               <button
               onClick={() => handleEditComponent("Work")}
               className={`px-10 py-3 mr-10 rounded-full ${theme == 'dark' ? 'bg-white text-black ' : 'bg-black text-white '} transition-all duration-300 hover:scale-105`}
               >
                    {
                         updatedUser?.workExperience.length > 0 ? 'Edit Experience' : 'Add Experience'
                    }
               </button>
               </div>
      </div>



     </div>
     


      </div>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            height: "98vh",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: theme === "dark" ? "#131313" : "white",
            boxShadow: 24,
            display: "flex",
            alignItems: "center",
            p: 6,
            borderRadius: "25px",
            width: "90vw",
            transition: "all 0.3s ease-in-out",
            overflowY: "auto",
            "&:focus": {
              outline: "none",
            },
          }}
        >
          <div className=" w-screen">
            <div>
              {editComponent == "UploadImage" && (
                <UploadImage
                  user={user}
                  theme={theme}
                  editStep={false}
                  setPreviewOpenModal={setOpenModal}
                />
              )}
              {editComponent == "UserDetail" && (
                <UserDetail
                  userInfo={user}
                  theme={theme}
                  editStep={false}
                  setPreviewOpenModal={setOpenModal}
                  setUpdatedUser={setUpdatedUser}
                  setOpenSnackbar={setOpenSnackbar}
                  setSnackbarMessage={setSnackbarMessage}
                  setSnackbarSeverity={setSnackbarSeverity}
                />
              )}
               <div className="flex flex-col items-center">
              {editComponent == "Education" && (
                <Education
                  user={user}
                  theme={theme}
                  editStep={false}
                  page={"education"}
                  setPreviewOpenModal={setOpenModal}
                />
              )}
              </div>
              <div className="flex flex-col items-center">

              {editComponent == "Work" && (
                <Education
                  user={user}
                  theme={theme}
                  editStep={false}
                  page={"workExperience"}
                  setPreviewOpenModal={setOpenModal}

                />
              )}
                 </div>  
               <div className="flex flex-col items-center">
               {editComponent == "Skills" && (
                <Skills
                  user={user}
                  editStep={false}
                  theme={theme}
                  setPreviewOpenModal={setOpenModal}
                />
              )}
               </div>
              {editComponent == "theme" && (
                <ChooseTheme theme={theme} inPreview={true} 
                setOpenSnackbar={setOpenSnackbar}
                setSnackbarMessage={setSnackbarMessage}
                setSnackbarSeverity={setSnackbarSeverity}
                setPreviewOpenModal={setOpenModal}
                setUpdatedUser={setUpdatedUser}
                />
               )}

            </div>
          </div>
        </Box>
      </Modal>
          <Snackbar
          open={openSnackbar}
          autoHideDuration={4000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
          <Alert
               onClose={() => setOpenSnackbar(false)}
               severity={snackbarSeverity}
               sx={{ width: '100%' }}
          >
               {snackbarMessage}
          </Alert>
          </Snackbar>

    </Box>
  );
};

export default Preview;
