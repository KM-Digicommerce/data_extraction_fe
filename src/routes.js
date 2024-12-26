// src\routes.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import SuperAdminDashboard from './components/Admin/AdminDashboard/AdminDashboard';
import UserDashboard from './components/User/UserDashboard/UserDashboard';
import PrivateRoute from './components/Auth/PrivateRoute';
import Register from './components/Auth/Register';
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/super_admin/*"
          element={
            <PrivateRoute allowedRoles={['super_admin']}>
              <SuperAdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/client/*"
          element={
            <PrivateRoute allowedRoles={['client']}>
              <UserDashboard />
            </PrivateRoute>
          }
        />

      </Routes>
    </Router>
  );
};

export default AppRoutes;
