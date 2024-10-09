import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  Avatar,
  Button,
  Slider,
  Grid,
} from "@mui/material";
import Cropper from "react-easy-crop";
import getCroppedImg from "./cropImage.jsx";
import axios from "axios";
import { API_URL } from "../Functions/Constants.js";
import ShowMessage from "../Components/ShowMessage/ShowMessage.jsx";

const EditPhotoModal = ({
  open,
  handleClose,
  theme,
  user,
  handleFileChange,
  handleDrop,
  handleDragOver,
  previewImage,
  selectedFile,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const fileInputRef = useRef(null);

  const onCropComplete = useCallback(async (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);

    try {
      const croppedImageBlob = await getCroppedImg(previewImage, croppedAreaPixels);
      const croppedImagePreviewUrl = URL.createObjectURL(croppedImageBlob);
      setCroppedImageUrl(croppedImagePreviewUrl);
    } catch (error) {
      console.error("Error cropping image:", error);
    }
  }, [previewImage]);

  const handleCrop = async () => {
    try {
      setLoading(true);

      const croppedImageBlob = await getCroppedImg(previewImage, croppedAreaPixels);
      const formData = new FormData();
      formData.append("image", croppedImageBlob, "croppedImage.png");

      const response = await axios.post(API_URL() + "/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-auth-token": localStorage.getItem("token"),
        },
      });
      if (response.data.success) {
        window.location.reload();
      } else if (response.data.message !== "Image uploaded successfully!") {
        setMessage(response.data.message);
        setSeverity("error");
        setShowMessage(true);
        setLoading(false);
      }
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
      setMessage("Error uploading image");
      setSeverity("error");
      setShowMessage(true);
    }
  };

  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showMessage]);

  return (
    <>
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
            bgcolor: theme === "dark" ? "#1a1a1a" : "white",
            boxShadow: 24,
            height: { xs: "90vh", md: "80vh" },
            width: { xs: "90vw", md: "70vw" },
            outline: "none",
            p: 4,
            borderRadius: "16px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            overflowY: "auto",
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

          <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item xs={12} md={6}>
              {previewImage ? (
                <div className="flex flex-col justify-center items-center">
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "200px",
                      background: "#333",
                    }}
                  >
                    <Cropper
                      image={previewImage}
                      crop={crop}
                      zoom={zoom}
                      aspect={1}
                      onCropChange={setCrop}
                      onZoomChange={setZoom}
                      onCropComplete={onCropComplete}
                    />
                  </div>
                  <Typography variant="" gutterBottom>
                    Adjust Image
                  </Typography>
                  <Slider
                    value={zoom}
                    min={1}
                    max={3}
                    step={0.1}
                    aria-labelledby="Zoom"
                    onChange={(e, zoom) => setZoom(zoom)}
                    sx={{ width: "200px", mt: 2 }}
                  />
                </div>
              ) : (
                <div className="flex flex-col justify-center items-center">
                  <Avatar
                    alt={user?.userName || "User"}
                    src={user?.profileImage}
                    sx={{ width: 200, height: 200, mb: 2, border: theme === "dark" ? "2px dotted white" : "2px dotted black" }}
                  />
                  <Typography variant="h6" gutterBottom>
                    Current Image
                  </Typography>
                </div>
              )}
            </Grid>

            <Grid item xs={12} md={6}>
              <div className="flex flex-col items-center justify-center mt-4 md:mt-0">
                {croppedImageUrl && (
                  <>
                  <div className="md:hidden visible">
                    <Avatar
                      alt="Cropped Preview"
                      src={croppedImageUrl}
                      sx={{ width: 150, height: 150, mb: 2, border: theme === "dark" ? "2px dotted white" : "2px dotted black" }}
                    />
                  </div>
                  <div className="md:flex gap-5 items-center md:visible hidden">
                    <Avatar
                      alt="Cropped Preview"
                      src={croppedImageUrl}
                      sx={{ width: 200, height: 200, mb: 2, border: theme === "dark" ? "2px dotted white" : "2px dotted black"}}
                      
                    />
                    <Avatar
                      alt="Cropped Preview"
                      src={croppedImageUrl}
                      sx={{ width: 150, height: 150, mb: 2, border: theme === "dark" ? "2px dotted white" : "2px dotted black" }}
                    />
                    <Avatar
                      alt="Cropped Preview"
                      src={croppedImageUrl}
                      sx={{ width: 100, height: 100, mb: 2, border: theme === "dark" ? "2px dotted white" : "2px dotted black" }}
                    />
                    <Avatar
                      alt="Cropped Preview"
                      src={croppedImageUrl}
                      sx={{ width: 50, height: 50, mb: 2, border: theme === "dark" ? "2px dotted white" : "2px dotted black" }}
                    />
                  </div>
                  </>
                )}
                <div>
                  <div className="text-center font-semibold">
                    {croppedImageUrl ? "Image Preview" : ""}
                  </div>
                </div>
                <Box
                  sx={{
                    width: { xs: "80vw", md: "100%" },
                    height: previewImage ? "" : "300px",
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
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
                  onClick={() => fileInputRef.current.click()}
                >
                  <input
                    type="file"
                    accept="image/*"
                    id="upload-button"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                    ref={fileInputRef}
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
                    <p className={`${theme === "dark" ? "text-white" : "text-black"} pt-4 font-semibold`}>
                      Image should be max 5MB
                    </p>
                  </Typography>
                </Box>
              </div>
            </Grid>
          </Grid>

          <Grid container spacing={2} justifyContent="flex-end" mt={4}>
            <Grid item>
              <Button
                onClick={handleCrop}
                variant="contained"
                color="primary"
                sx={{
                  width: "200px",
                  background: 'black',
                  borderRadius: "12px",
                  textTransform: "none",
                  fontWeight: "bold",
                  color: "white",
                  cursor: !selectedFile ? "not-allowed" : "pointer",
                  opacity: !selectedFile ? "0" : "1",
                  transition: "0.3s ease-in-out",
                  py: 1,
                  '&:hover': {
                    backgroundColor: 'white',
                    color: 'black',
                    transform: 'scale(1.05)',
                  },
                }}
                disabled={!selectedFile || loading}
              >
                {loading ? "Uploading..." : "CHANGE"}
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={() => {
                  setCroppedImageUrl(null);
                  handleClose();
                }}
                variant="outlined"
                color="secondary"
                sx={{
                  width: "200px",
                  borderRadius: "12px",
                  borderColor: theme === "dark" ? "#d0d7de" : "#333",
                  color: "red",
                  textTransform: "none",
                  fontWeight: "bold",
                  transition: "0.3s ease-in-out",
                  py: 1,
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              >
                CANCEL
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      {showMessage && <ShowMessage message={message} severity={severity} />}
    </>
  );
};

export default EditPhotoModal;