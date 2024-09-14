import React from "react";
import { Paper, Typography } from "@mui/material";

const CurrentDevices = () => {
  return (
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
      <Typography variant="h6" gutterBottom>
        Current Devices
      </Typography>
    </Paper>
  );
};

export default CurrentDevices;