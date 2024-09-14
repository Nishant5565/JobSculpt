import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  IconButton,
  Avatar,
  Box
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AOS from "aos";
import "aos/dist/aos.css";
import { API_URL } from "../Functions/Constants";
import CurrentDevices from "./CurrentDevices";
import RecentJobs from "./RecentJobs";
import EditPhotoModal from "./EditPhotoModal";
import {Skeleton} from "@mui/material";

const HomeSection = ({ theme, user }) => {
  const [open, setOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(user?.profileImage);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, isLoading] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setPreviewImage(null); // Reset preview image on close
    setSelectedFile(null); // Reset selected file on close
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await fetch(API_URL + "/upload", {
        method: "POST",
        body: formData,
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      if (data.success) {
        isLoading(true);
        setProfileImage(data.url);
        user.profileImage = data.url;
        handleClose();
      } else {
        // Handle error
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={9}>
          <Paper
            sx={{
              p: 1,
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
              borderRadius: "20px",
              background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
              color: "#fff",
              position: "relative",
              minHeight: "400px",
            }}
          >
            {
              loading ? (
                <Skeleton variant="circular">
                <Avatar />
                </Skeleton>
              ) : (
                <div className={`${theme =='dark' ? 'bg-[#1f1f1f]' :'bg-white'} p-20 rounded-[17px]`}>                  
                  <Box
                    sx={{
                      position: "relative",
                      width: 160, // Adjusted to account for the border
                      height: 160, // Adjusted to account for the border
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #7b4397 0%, #dc2430 100%)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Avatar
                      alt={user?.userName}
                      src={user?.profileImage}
                      sx={{
                        width: 150,
                        height: 150,
                        mb: 2,
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                    />
                  </Box>
      
                  <IconButton
                    onClick={handleOpen}
                    sx={{
                      position: "absolute",
                      bottom: 153,
                      left: 190,
                      color: theme == 'dark' ? '#1f1f1f' : '#fff',
                      bgcolor: theme != 'dark' ? '#1f1f1f' : '#fff',
                      transition: "all 0.5s",
                      "&:hover": {
                        bgcolor: theme == 'dark' ? '#1f1f1f' : '#fff',
                        color: theme != 'dark' ? '#1f1f1f' : '#fff',
                      },
                    }}
                  >
                    <EditIcon />
                  </IconButton>
      
                  <Typography variant="h6" gutterBottom>
                    Welcome, {user?.userName}
                  </Typography>
                  <Typography>{user?.about}</Typography>
                </div>
              )
            }
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <CurrentDevices theme = {theme} user={user} />
        </Grid>
        <Grid item xs={12}>
          <RecentJobs />
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
        handleUpload={handleUpload}
        previewImage={previewImage}
        selectedFile={selectedFile}
        loading={loading}
      />
    </Container>
  );
};

export default HomeSection;