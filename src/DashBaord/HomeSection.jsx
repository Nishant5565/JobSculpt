import React, { useEffect, useState, useRef } from "react";
import {
  Container,
  Grid,
  Avatar,
  Box,
  IconButton,
  Button,
  Skeleton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AOS from "aos";
import "aos/dist/aos.css";
import CurrentDevices from "./CurrentDevices";
import RecentJobs from "./RecentJobs";
import EditPhotoModal from "./EditPhotoModal";
import EditProfileDialog from "../Components/Profile/EditProfileDialog";
import api_call from '../Functions/api_call';
import ColorThief from 'colorthief';  // Importing ColorThief

const HomeSection = ({ theme, user }) => {
  const [open, setOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(user?.profileImage);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, isLoading] = useState(false);
  const [photoUpdated, setPhotoUpdated] = useState(false);
  const [dominantColor, setDominantColor] = useState(null);  // To store the dominant color
  const { authuser } = api_call();
  const imageRef = useRef(null);  // Create a ref to the profile image

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setPreviewImage(null);
    setSelectedFile(null);
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  // Function to calculate brightness of a color
  const calculateBrightness = (color) => {
    return (color[0] * 299 + color[1] * 587 + color[2] * 114) / 1000;
  };

  // ColorThief logic to extract the brightest and darkest colors
  useEffect(() => {
    if (user.profileImage && imageRef.current) {
      console.log(imageRef.current);  // Debugging: Log the imageRef
      console.log("Image reference is set");  // Debugging: Log when imageRef is set
      const colorThief = new ColorThief();
      imageRef.current.onload = () => {
        console.log("Image loaded");  
        const palette = colorThief.getPalette(imageRef.current, 10);  // Get a palette of 10 colors
        console.log("Palette:", palette);  // Debugging: Log the palette
        const brightest = palette.reduce((prev, curr) => {
          return calculateBrightness(curr) > calculateBrightness(prev) ? curr : prev;
        });
        const darkest = palette.reduce((prev, curr) => {
          return calculateBrightness(curr) < calculateBrightness(prev) ? curr : prev;
        });
        setDominantColor(theme === "dark" ? brightest : darkest);
        console.log("Brightest Color:", brightest);  // Debugging: Log the brightest color
        console.log("Darkest Color:", darkest);  // Debugging: Log the darkest color
      };
      if (imageRef.current.complete) {
        imageRef.current.onload();
      }
    }
  }, [user.profileImage, theme]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
      setPhotoUpdated(true);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
      setPhotoUpdated(true);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleEditOpen = () => {
    setEditDialogOpen(true);
  };

  const handleEditClose = () => {
    window.location.reload();
    setEditDialogOpen(false);
  };

  return (
    <Container maxWidth="xl" className="themeTransition">
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={9}>
          <div
            style={{
              padding: "20px",
              flexDirection: "column",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
              borderRadius: "15px",
              position: "relative",
              backgroundColor: dominantColor ? `rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})` : (theme === "dark" ? "#1f1f1f" : "#fff"), // Use dominant color if available
            }}
            className="themeTransition"
          >
            {loading ? (
              <Skeleton variant="circular">
                <Avatar />
              </Skeleton>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    flexDirection: { xs: "column", md: "row" },
                    position: "relative",
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      width: 160,
                      height: 160,
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, rgb(${dominantColor?.[0]},${dominantColor?.[1]},${dominantColor?.[2]}) 0%, #dc2430 100%)`,  // Set the background gradient using the dominant color
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      alt={user?.userName}
                      src={user?.profileImage}
                      ref={imageRef}  // Attach the ref to the image
                      crossOrigin="anonymous"  // Allow cross-origin requests
                      style={{
                        width: 150,
                        height: 150,
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                    <div
                      onClick={handleOpen}
                      style={{
                        position: "absolute",
                        bottom: 10,
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
                      className="themeTransition bg-[#fff] text-[#1f1f1f] rounded-full hover:bg-[#1f1f1f] hover:text-[#fff]"
                    >
                      <EditIcon />
                    </div>
                  </Box>
                  <h2
                    className={`text-4xl font-bold ${
                      theme === "dark" ? "text-white" : "text-black"
                    } themeTransition`}
                  >
                    {user?.userName}
                  </h2>
                </Box>
              </Box>
            )}
          </div>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <CurrentDevices />
        </Grid>
        <Grid item xs={12}>
          <RecentJobs user={user} />
        </Grid>
      </Grid>

      <EditPhotoModal
        open={open}
        handleClose={handleClose}
        theme={theme}
        user={user}
        handleFileChange={handleFileChange}
        handleDrop={handleDrop}
        handleDragOver={handleDragOver}
        previewImage={previewImage}
        selectedFile={selectedFile}
        loading={loading}
        setPhotoUpdated={setPhotoUpdated}
      />
    </Container>
  );
};

export default HomeSection;