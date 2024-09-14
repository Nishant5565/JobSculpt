import React from "react";
import { Paper, Typography } from "@mui/material";

const RecentJobs = () => {
  return (
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
  );
};

export default RecentJobs;