import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  IconButton,
  Modal,
  Box,
  Button,
  Avatar,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AOS from "aos";
import "aos/dist/aos.css";
import { API_URL } from "../Functions/Constants";

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
              p: 3,
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
              borderRadius: "20px",
              background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
              color: "#fff",
              position: "relative",
            }}
          >
            <Avatar
              alt={user?.userName}
              src={user?.profileImage}
              sx={{ width: 150, height: 150, mb: 2 }}
            />

      <IconButton
              onClick={handleOpen}
              sx={{
                position: "absolute",
                bottom: 90,
                left: 130,
                color: "#000",
                bgcolor: "#fff",
                "&:hover": {
                  bgcolor: "#f0f0f0",
                },
              }}
            >
              <EditIcon />
            </IconButton>

            <Typography variant="h6" gutterBottom>
              Welcome, {user?.userName}
            </Typography>
            <Typography>{user?.about}</Typography>

          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
              borderRadius: "20px",
              background: "linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)",
              color: "#fff",
            }}
          >
            {/* Notifications Section */}

            <Typography variant="h6" gutterBottom>
              Current Devices
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 3,
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
              borderRadius: "20px",
              background: "linear-gradient(135deg, #43cea2 0%, #185a9d 100%)",
              color: "#fff",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Recent Jobs
            </Typography>
            <Typography>
              Here are the latest job postings that match your skills.
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: theme === "dark" ? "#1a1a1a" : "mintcream",
            boxShadow: 24,
            height: "80vh",
            width: "70vw",
            outline: "none",
            p: 4,
            borderRadius: "16px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <Typography
              id="modal-title"
              variant="h5"
              component="h2"
              sx={{
                mb: 2,
                fontWeight: "bold",
                textAlign: "center",
                textTransform: "uppercase",
                color: theme === "dark" ? "white" : "black",
              }}
            >
              Edit Profile Image
            </Typography>
            <Typography
              id="modal-description"
              sx={{
                mb: 3,
                textAlign: "center",
                color: theme === "dark" ? "#d0d7de" : "#333",
                fontSize: "14px",
              }}
            >
              Drag and drop an image below or click to upload.
            </Typography>
          </div>

          <div className="flex justify-between items-center">
            <div>
              {previewImage ? (
                <div className="flex flex-col justify-center items-center">
                  <Avatar
                  alt="Profile preview"
                  src={previewImage}
                  sx={{ width: 200, height: 200, mb: 2 }}
                />
                  <Typography variant="h6" gutterBottom >
                    Preview
                  </Typography>
                </div>
              ) : (
                <div className="flex flex-col justify-center items-center">
                <Avatar
                  alt={user?.userName || "User"}
                  src={user?.profileImage}
                  sx={{ width: 200, height: 200, mb: 2 }}
                />
                </div>
              )}
            </div>
            <div className="flex flex-col items-center">
              <Box
                sx={{
                  width: "100vh",
                  height: "40vh",
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mb: 3,
                  border: "2px dashed #ccc",
                  padding: "20px",
                  borderRadius: "12px",
                  cursor: "pointer",
                  "&:hover": {
                    borderColor: theme === "dark" ? "#4E6E5D" : "#6a11cb",
                  },
                  background: theme === "dark" ? "#333" : "#f9f9f9",
                }}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => document.getElementById("upload-button").click()}
              >
                <input
                  type="file"
                  accept="image/*"
                  id="upload-button"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
                <Typography
                  sx={{
                    mt: 2,
                    color: theme === "dark" ? "#fff" : "#333",
                  }}
                >
                  {selectedFile
                    ? "Change Image"
                    : "Drag & Drop or Click to Upload"}
                </Typography>
              </Box>
            </div>
          </div>

          <div className="flex gap-6 justify-end "> 
            <Button
              onClick={handleUpload}
              variant="contained"
              color="primary"
              sx={{
                width: "200px",
                background: isLoading
                  ? "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)"
                  : "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
                borderRadius: "12px",
                textTransform: "none",
                fontWeight: "bold",
                color: "white",
                cursor: !selectedFile ? "not-allowed" : "pointer",
                opacity: !selectedFile ? "0" : "1",
                py: 1,

              }}
              disabled={!selectedFile || loading}
            >
              {loading ? "Uploading..." : "CHANGE"}
            </Button>
            <Button
              onClick={handleClose}
              variant="outlined"
              color="secondary"
              sx={{
                
                width: "200px",
                borderRadius: "12px",
                borderColor: theme === "dark" ? "#d0d7de" : "#333",
                color: "red",
                textTransform: "none",
                fontWeight: "bold",
                py: 1,
              }}
            >
              CANCEL
            </Button>
          </div>
        </Box>
      </Modal>
    </Container>
  );
};

export default HomeSection;
``;
