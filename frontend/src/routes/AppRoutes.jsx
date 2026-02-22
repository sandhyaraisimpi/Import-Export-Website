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
import CustomerView from "../pages/CustomerView";
import TeamRoles from "../pages/TeamRoles";
import TeamRolesDetails from "../pages/TeamRolesDetails";
import Settings from "../pages/Settings";
import GeneralSettings from "../pages/GeneralSettings";
import ProfileSettings from "../pages/ProfileSettings";
import NotificationSettings from "../pages/NotificationSettings";
import WebsiteSettings from "../pages/WebsiteSettings";

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
      <Route path="/customers/:id" element={<ProtectedRoute><CustomerView /> </ProtectedRoute>}/>
      <Route path="/team-roles" element={<ProtectedRoute><TeamRoles /></ProtectedRoute>} />
      <Route path="/team-roles/details" element={<TeamRolesDetails />} />
      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      <Route path="/settings/general" element={<GeneralSettings />} />
<Route path="/settings/profile" element={<ProfileSettings />} />
<Route path="/settings/notifications" element={<NotificationSettings />} />
<Route path="/settings/website" element={<WebsiteSettings />} />


    </Routes>
  );
}
