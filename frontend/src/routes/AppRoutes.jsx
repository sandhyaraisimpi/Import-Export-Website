import { Routes, Route } from "react-router-dom";

import Sidebar from "../components/Sidebar"
import AdminDashboard from "../pages/Dashboard";
import Categories from "../pages/Categories";
import Customer from "../pages/Customer";
import InquiryManagement from "../pages/InquiryManagement";
import ProductImageManager from "../pages/ProductImageManager";
import ProductManagement from "../pages/ProductManagement";
import AdminLogin from "../pages/Login";
import AdminSignup from "../pages/Signup";

export default function AppRoutes() {
  return (
    <div className="flex">

      <Sidebar />

      <div className="flex-1 p-6">
        <Routes>
          <Route path="login" element={<AdminLogin />} />
          <Route path="signup" element={<AdminSignup />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="categories" element={<Categories />} />
          <Route path="customers" element={<Customer />} />
          <Route path="inquiries" element={<InquiryManagement />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="product-images" element={<ProductImageManager />} />
        </Routes>
      </div>

    </div>
  );
}