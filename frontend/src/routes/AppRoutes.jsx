import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Categories from "../pages/Categories";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ProductManagement from "../pages/ProductManagement";
import ProductImageManager from "../pages/ProductImageManager";
import InquiryManagement from "../pages/InquiryManagement";
import SubCategories from "../pages/SubCategories";
import Customer from "../pages/Customer";

import ProtectedRoute from "../auth/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

      <Route path="/categories" element={<ProtectedRoute><Categories /></ProtectedRoute>} />
      <Route path="/products" element={<ProtectedRoute><ProductManagement /></ProtectedRoute>} />
      <Route path ="/product-images" element={<ProtectedRoute><ProductImageManager /></ProtectedRoute>} />
      <Route path="/inquiries" element={<ProtectedRoute><InquiryManagement /></ProtectedRoute>} />
      <Route path="/sub-categories" element={<SubCategories />} />
      <Route path="/customers" element={<ProtectedRoute><Customer /></ProtectedRoute>} />

    </Routes>
  );
}
