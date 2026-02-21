import AppRoutes from "./routes/AppRoutes";
import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import Homepage from './Homepage';

import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/user/Dashboard";
import Order from "./pages/user/OrderManagement";
import Profile from "./pages/user/Profile";
import Settings from "./pages/user/Settings";
import MyInquiries from "./pages/user/MyInquiries";
import InquiryDetail from "./pages/user/InquiryDetail";

{/*  User Auth */ }
import Login from "./pages/user/UserLogin";
import Signup from "./pages/user/UserSignup";
import ForgotPass from "./pages/user/ForgotPass";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Homepage />} />
      <Route path="/admin/*" element={<AppRoutes />} />

      <Route path="/user/dashboard" element={<Dashboard />} />
      <Route path="/user/orders" element={<Order />} />
      <Route path="/user/profile" element={<Profile />} />
      <Route path="/user/settings" element={<Settings />} />

      <Route path="/user/inquiries" element={<MyInquiries />} />
      <Route path="/user/inquiries/:id" element={<InquiryDetail />} />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-pass" element={<ForgotPass />} />

      <Route path="*" element={<Navigate to="/user/dashboard" />} />
    </Routes>
  );
}

export default App;
