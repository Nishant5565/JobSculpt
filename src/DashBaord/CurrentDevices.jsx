import React from "react";
import { Paper, Typography } from "@mui/material";

const CurrentDevices = ({theme, user}) => {
  return (
    <Paper
      sx={{
        p: 1,
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        borderRadius: "20px",
        background: "linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)",
        color: "#fff",
        minHeight: "400px", 
      }}
    >
    <div className={`${theme =='dark' ? 'bg-[#1f1f1f]' :'bg-white'} rounded-[17px] min-h-[400px] p-2 flex flex-col items-center `}>
      <Typography variant="h6" gutterBottom>
        Current Devices
      </Typography>
      </div>
    </Paper>
  );
};

export default CurrentDevices;