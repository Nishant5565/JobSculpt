import React, { useEffect, useState } from "react";
import { Container, Grid, Skeleton } from "@mui/material";
import AOS from "aos";
import "aos/dist/aos.css";
import CurrentDevices from "./CurrentDevices";
import RecentJobs from "./RecentJobs";
import EditPhotoModal from "./EditPhotoModal";
import ProfileSection from "./ProfileSection.jsx";
import api_call from '../Functions/api_call';

const HomeSection = ({ theme, user }) => {
  const [open, setOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, isLoading] = useState(false);
  const { authuser } = api_call();

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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
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
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
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
              backgroundColor: theme === "dark" ? "#1f1f1f" : "#fff",
            }}
            className="themeTransition"
          >
            {loading ? (
              <Skeleton variant="circular">
                <Avatar />
              </Skeleton>
            ) : (
              <ProfileSection user={user} theme={theme} handleOpen={handleOpen} size={150} />
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
      />
    </Container>
  );
};

export default HomeSection;