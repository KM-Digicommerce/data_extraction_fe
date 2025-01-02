import React from 'react'
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../AdminDashboard/AdminDashboard";
import { Box } from '@mui/material';

function UserRoutes() {
  return (
    <Box>
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
        </Routes>
    </Box>
  )
}

export default UserRoutes;
