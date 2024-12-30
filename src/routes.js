// src\routes.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import SuperAdmin from './components/Admin/AdminDashboard/AdminDashboard';
import User from './components/User/Layout/MiniDrawer';
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
              <SuperAdmin />
            </PrivateRoute>
          }
        />
        <Route
          path="/client/*"
          element={
            // <User />
            <PrivateRoute allowedRoles={['client']}>
            <User />
            </PrivateRoute>
          }
        />

      </Routes>
    </Router>
  );
};

export default AppRoutes;
