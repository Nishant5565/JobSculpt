import React from "react";
import { Paper, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../Functions/Constants";

const CurrentDevices = () => {

  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchDevices = async () => {
      try {
        const response = await axios.get(API_URL + "/api/auth/devices" , {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        });
        setDevices(response.data);
        console.log("Devices:", response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching devices:", error);
      }
    }

    fetchDevices();

  }, []);


  return (
    <div className=" min-h-[300px] flex flex-col rounded-[22px] border-[#feb47b]">
    <Paper
      sx={{
        p: 2,
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
    <div className=" ">

    </div>
    </div>
  );
};

export default CurrentDevices;