import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/user/Dashboard";
import Order from "./pages/user/OrderManagement";
import Profile from "./pages/user/Profile";
import Settings from "./pages/user/Settings";
import MyInquiries from "./pages/user/MyInquiries";
import InquiryDetail from "./pages/user/InquiryDetail";   

{/*  User Auth */}
import Login from "./pages/user/UserLogin";
import Signup from "./pages/user/UserSignup";
import ForgotPass from "./pages/user/ForgotPass";

function App() {
  return (
    <Router>
      <Routes>

        {/* Redirect Default */}
        <Route path="/" element={<Navigate to="/user/dashboard" />} />

        {/* User Routes */}
        <Route path="/user/dashboard" element={<Dashboard />} />
        <Route path="/user/orders" element={<Order />} />
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/user/settings" element={<Settings />} />

        {/* My Inquiries */}
        <Route path="/user/inquiries" element={<MyInquiries />} />
        <Route path="/user/inquiries/:id" element={<InquiryDetail />} />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/user/dashboard" />} />

        {/*  User Rotes */}
        <Route path="/login" element={<Login />} /> 
        <Route path="/signup" element={<Signup />} /> 
        <Route path="/forgot-pass" element={<ForgotPass/>} />

      </Routes>
    </Router>
  );
}

export default App;