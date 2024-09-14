import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Avatar,
  Button,
} from "@mui/material";

const EditPhotoModal = ({ open, handleClose, theme, user, handleFileChange, handleDrop, handleDragOver, handleUpload, previewImage, selectedFile, loading }) => {
  return (
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
                <Typography variant="h6" gutterBottom>
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

        <div className="flex gap-6 justify-end">
          <Button
            onClick={handleUpload}
            variant="contained"
            color="primary"
            sx={{
              width: "200px",
              background: loading
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
  );
};

export default EditPhotoModal;