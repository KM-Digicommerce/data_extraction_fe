import React from 'react'
import { Routes, Route } from "react-router-dom";
import UserDashboard from "../Dashboard/UserDashboard";
import Invoice from "../Invoice/invoice";
import SettingsPage from "../Settings/settings";

function UserRoutes() {
  return (
    <div>
        <Routes>
          <Route path="/" element={<UserDashboard />} />
          <Route path="invoice" element={<Invoice />} />
          <Route path="settings" element={<SettingsPage />} />
        </Routes>
    </div>
  )
}

export default UserRoutes
