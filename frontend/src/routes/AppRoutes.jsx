import { Routes, Route, Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ProtectedRoute from "../auth/ProtectedRoute";

import AdminDashboard from "../pages/Dashboard";
import Categories from "../pages/Categories";
//import SubCategory from "../pages/Products/SubCategory";
import ProductManagement from "../pages/ProductManagement";
import ProductImageManager from "../pages/ProductImageManager";
import InquiryManagement from "../pages/InquiryManagement";
import Customer from "../pages/Customer";
import CustomerView from "../pages/CustomerView";
import TeamRoles from "../pages/TeamRoles";
import TeamRolesDetails from "../pages/TeamRolesDetails";
import Settings from "../pages/Settings";
import GeneralSettings from "../pages/GeneralSettings";
import ProfileSettings from "../pages/ProfileSettings";
import NotificationSettings from "../pages/NotificationSettings";
import WebsiteSettings from "../pages/WebsiteSettings";
import AdminLogin from "../pages/Login";
import AdminSignup from "../pages/Signup";


// Layout for Protected Admin Pages
function AdminLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Routes>

      {/* AUTH ROUTES (NO SIDEBAR) */}
      <Route path="login" element={<AdminLogin />} />
      <Route path="signup" element={<AdminSignup />} />

      {/* PROTECTED ROUTES */}
      <Route element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>

        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        <Route path="categories" element={<Categories />} />
        {/* //<Route path="sub-categories" element={<SubCategory />} /> */}

        <Route path="products" element={<ProductManagement />} />
        <Route path="product-images" element={<ProductImageManager />} />

        <Route path="inquiries" element={<InquiryManagement />} />

        <Route path="customers" element={<Customer />} />
        <Route path="customers/:id" element={<CustomerView />} />

        <Route path="team-roles" element={<TeamRoles />} />
        <Route path="team-roles/details" element={<TeamRolesDetails />} />

        <Route path="settings" element={<Settings />} />
        <Route path="settings/general" element={<GeneralSettings />} />
        <Route path="settings/profile" element={<ProfileSettings />} />
        <Route path="settings/notifications" element={<NotificationSettings />} />
        <Route path="settings/website" element={<WebsiteSettings />} />

      </Route>

    </Routes>
  );
}