import React from 'react'
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../AdminDashboard/AdminDashboard";

function UserRoutes() {
  return (
    <div>
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
        </Routes>
    </div>
  )
}

export default UserRoutes;
