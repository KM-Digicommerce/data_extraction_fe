import React from "react";
import { Typography, Box } from "@mui/material";
import Logout from "../../Auth/Logout";

const AdminDashboard = () => {
  return (
    <Box sx={{ mt: "auto", mb: 2, px: 2 }}>
      <Typography variant="h5">Welcome to Admin Dashboard</Typography>
      <Logout />
    </Box>
  );
};

export default AdminDashboard;
