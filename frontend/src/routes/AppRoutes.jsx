import { Routes, Route } from "react-router-dom";

import Sidebar from "../components/Sidebar"
import AdminDashboard from "../pages/Dashboard";
import Categories from "../pages/Categories";
import Customer from "../pages/Customer";
import CustomerView from "../pages/CustomerView";
import TeamRoles from "../pages/TeamRoles";
import TeamRolesDetails from "../pages/TeamRolesDetails";
import Settings from "../pages/Settings";
import GeneralSettings from "../pages/GeneralSettings";
import ProfileSettings from "../pages/ProfileSettings";
import NotificationSettings from "../pages/NotificationSettings";
import WebsiteSettings from "../pages/WebsiteSettings";

import ProtectedRoute from "../auth/ProtectedRoute";
import InquiryManagement from "../pages/InquiryManagement";
import ProductImageManager from "../pages/ProductImageManager";
import ProductManagement from "../pages/ProductManagement";
import AdminLogin from "../pages/Login";
import AdminSignup from "../pages/Signup";

export default function AppRoutes() {
  return (
    <div className="flex">

      <Sidebar />

      <Route path="/categories" element={<ProtectedRoute><Categories /></ProtectedRoute>} />
      <Route path="/products" element={<ProtectedRoute><ProductManagement /></ProtectedRoute>} />
      <Route path="/product-images" element={<ProtectedRoute><ProductImageManager /></ProtectedRoute>} />
      <Route path="/inquiries" element={<ProtectedRoute><InquiryManagement /></ProtectedRoute>} />
      <Route path="/sub-categories" element={<SubCategories />} />
      <Route path="/customers" element={<ProtectedRoute><Customer /></ProtectedRoute>} />
      <Route path="/customers/:id" element={<ProtectedRoute><CustomerView /> </ProtectedRoute>} />
      <Route path="/team-roles" element={<ProtectedRoute><TeamRoles /></ProtectedRoute>} />
      <Route path="/team-roles/details" element={<TeamRolesDetails />} />
      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      <Route path="/settings/general" element={<GeneralSettings />} />
      <Route path="/settings/profile" element={<ProfileSettings />} />
      <Route path="/settings/notifications" element={<NotificationSettings />} />
      <Route path="/settings/website" element={<WebsiteSettings />} />

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