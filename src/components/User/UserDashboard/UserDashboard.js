// src\components\User\UserDashboard\UserDashboard.js
import React from 'react';
import { Typography, Box } from '@mui/material';
import Logout from "../../Auth/Logout";

const UserDashboard = () => {
  return (
    <Box sx={{ mt: "auto", mb: 2, px: 2 }}>
      <Typography variant="h5">Welcome to User Dashboard</Typography>
      <Logout />
    </Box>
  );
}

export default UserDashboard;
