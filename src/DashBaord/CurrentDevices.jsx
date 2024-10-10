import React from "react";
import { Paper, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../Functions/Constants";
import Spinner2 from "../Components/ShimmerAndSpinner/Spinner2";

const CurrentDevices = () => {

  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchDevices = async () => {
      try {
        const response = await axios.get(API_URL() + "/api/auth/devices" , {
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
    <div
      style={{
        padding: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        borderRadius: "20px",
        background: "linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)",
        color: "#fff",
      }}
    >
      <h1 className="text-2xl font-bold">Current Devices</h1>
    </div>
    <div className=" ">

      {loading ? (
        <div>
          <Spinner2 />
        </div>
      ) : (
        <>
        <div>
          {devices.map((device) => (
            <Paper
              key={device._id}
              elevation={3}
              className="flex flex-col justify-between items-center p-3 my-2"
            >
             <p>
                <strong>Device:</strong> {device.deviceName}
             </p>
             <p>
             Last Active: {device.lastLogin}
             </p>
            </Paper>
          ))}
        </div>
        
        </>)}
    </div>
    </div>
  );
};

export default CurrentDevices;