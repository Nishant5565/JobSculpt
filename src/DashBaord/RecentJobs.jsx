import React from "react";
import { Paper, Typography } from "@mui/material";

const RecentJobs = ({user}) => {
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
        About You
      </Typography>
      <Typography>
        {
          user?.about ? user.about : 'Add some information about yourself by clicking on the edit button'
        }
      </Typography>
    </Paper>
  );
};

export default RecentJobs;