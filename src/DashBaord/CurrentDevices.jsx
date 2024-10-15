import React, { useState, useEffect } from "react";
import { Paper, Typography, Container, Box, CircularProgress, Modal } from "@mui/material";
import axios from "axios";
import { API_URL } from "../Functions/Constants";
import DeleteIcon from '@mui/icons-material/Delete';

const CurrentDevices = ({ theme }) => {
  const [devices, setDevices] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedDevice, setSelectedDevice] = useState(null);

  const handleDeleteDevice = async (deviceName) => {
    try {
      const response = await axios.delete(API_URL() + "/api/auth/remove-device", {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
        data: { deviceName },
      });
      console.log(response.data);
      setDevices(devices.filter((device) => device.deviceName !== deviceName));
      setOpenModal(false);
      logoutDevice(deviceName);
    } catch (error) {
      console.error("Error deleting device:", error);
    }
  };

  const logoutDevice = async (deviceName) => {
    try {
      const response = await axios.post(API_URL() + "/api/auth/logout-device", {
        deviceName,
      }, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });
      console.log("Logged out from device:", response.data);
    } catch (error) {
      console.error("Error logging out from device:", error);
    }
  };

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await axios.get(API_URL() + "/api/auth/devices", {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        });
        console.log(response.data);
        setDevices(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching devices:", error);
        setLoading(false);
      }
    };

    fetchDevices();
  }, []);

  const formatDateTime = (dateString, timeZone) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
    const formattedTime = new Intl.DateTimeFormat('en-US', { ...timeOptions, timeZone }).format(date);
    return { formattedDate, formattedTime };
  };

  return (
    <Container
      sx={{
        background: theme === "dark" ? "#131313" : "#f5f5f5",
        padding: 2,
        borderRadius: "15px",
      }}
    >
      <Box
        sx={{
          padding: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "15px",
          mb: 4,
          textAlign: "center",
          overflowY: "auto",
          background: theme === "dark" ? "#131313" : "#fff",
        }}
      >
        <p style={{ fontSize: "1.5rem", fontWeight: "bold", padding: "10px" }}>
          Manage Your Devices
        </p>
        <Typography variant="body2">
          Review connected devices for your account.
        </Typography>
      </Box>

      <Box>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="150px">
            <CircularProgress />
          </Box>
        ) : (
          devices.map((device) => {
            const { formattedDate, formattedTime } = formatDateTime(device.lastLogin, device.location.timeZone);
            return (
              <Paper
                key={device._id}
                elevation={1}
                sx={{
                  padding: 2,
                  marginBottom: 2,
                  borderRadius: "10px",
                  background: theme === "dark" ? "#333" : "#fff",
                  display: "flex",
                  flexDirection: "column",
                  gap: 0.5,
                }}
              >
                <Typography variant="body1" fontWeight="medium">
                  {device.deviceName}
                </Typography>
                <Typography variant="body2">
                  Last Active: {formattedDate} at {formattedTime}
                </Typography>
                <Typography variant="body2">
                  Location: {device?.location?.city}, {device?.location?.country}
                </Typography>
                <div className="flex justify-end">
                  <button
                    className={`px-10 py-3 rounded-[10px] ${theme !== 'dark' ? 'bg-white text-black hover:bg-black hover:text-white border-2 border-black' : 'bg-black text-white border-white border-2 hover:bg-white hover:text-black'} transition-all duration-300 hover:scale-105`}
                    onClick={() => {
                      setSelectedDevice(device.deviceName);
                      setOpenModal(true);
                    }}
                  >
                    <DeleteIcon />
                  </button>
                </div>
              </Paper>
            );
          })
        )}
      </Box>

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Confirm Device Removal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to remove this device?
          </Typography>
          <Box mt={2} display="flex" justifyContent="space-between">
            <button
              className="px-4 py-2 bg-red-500 text-white rounded"
              onClick={() => handleDeleteDevice(selectedDevice)}
            >
              Yes, Remove
            </button>
            <button
              className="px-4 py-2 bg-gray-500 text-white rounded"
              onClick={() => setOpenModal(false)}
            >
              Cancel
            </button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default CurrentDevices;