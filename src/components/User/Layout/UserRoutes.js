import React from 'react'
import { Routes, Route } from "react-router-dom";
import UserDashboard from "../Dashboard/UserDashboard";
import Invoice from "../Invoice/InvoiceMain";
import SettingsPage from "../Settings/settings";
import { Box } from '@mui/material';


function UserRoutes() {

  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <Box>
        <Routes>
          <Route path="/" element={<UserDashboard />} />
          <Route path="invoice" element={<Invoice />} />
          <Route path="settings" element={<SettingsPage />} />
        </Routes>
    </Box>
  )
}

export default UserRoutes
