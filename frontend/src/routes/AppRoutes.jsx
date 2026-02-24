import { Routes, Route } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import AdminDashboard from "../pages/admin/Dashboard";
import Categories from "../pages/admin/Categories";
import SubCategories from "../pages/admin/SubCategories";
import Customer from "../pages/admin/Customer";
import CustomerView from "../pages/admin/CustomerView";
import ProductManagement from "../pages/admin/ProductManagement";
import ProductImageManager from "../pages/admin/ProductImageManager";
import InquiryManagement from "../pages/admin/InquiryManagement";
import AdminLogin from "../pages/admin/Login";
import AdminSignup from "../pages/admin/Signup";
import TeamRoles from "../pages/admin/TeamRoles";
import TeamRolesDetails from "../pages/admin/TeamRolesDetails";
import Settings from "../pages/admin/Settings";
import GeneralSettings from "../pages/admin/GeneralSettings";
import ProfileSettings from "../pages/admin/ProfileSettings";
import NotificationSettings from "../pages/admin/NotificationSettings";
import WebsiteSettings from "../pages/admin/WebsiteSettings";
import Blogs from "../pages/admin/Blogs";
import Promotion from "../pages/admin/Promotion";
// User Dashboard 
import UserLayout from "../layout/UserLayout";
import UserDashboard from "../pages/user/Dashboard";
import MyInquiries from "../pages/user/MyInquiries";
import Profile from "../pages/user/Profile";
import UserSettings from "../pages/user/Settings";



export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<AdminLogin />} />
      <Route path="/signup" element={<AdminSignup />} />
      <Route path="/dashboard" element={<AdminDashboard />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/sub-categories" element={<SubCategories />} />
      <Route path="/customers" element={<Customer />} />
      <Route path="/customers/:id" element={<CustomerView />} />
      <Route path="/products" element={<ProductManagement />} />
      <Route path="/product-images" element={<ProductImageManager />} />
      <Route path="/inquiries" element={<InquiryManagement />} />
      <Route path="/team-roles" element={<TeamRoles />} />
      <Route path="/team-roles/:id" element={<TeamRolesDetails />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/settings/general" element={<GeneralSettings />} />
      <Route path="/settings/profile" element={<ProfileSettings />} />
      <Route path="/promotion/blogs" element={<Blogs />} />
      <Route path="/promotion/managPromotion" element={<Promotion />} />
      <Route
        path="/settings/notifications"
        element={<NotificationSettings />}
      />
      <Route path="/settings/website" element={<WebsiteSettings />} />

      <Route path="/adminlayout" element={<AdminLayout />} />

      <Route path="/user/*" element={<UserLayout />}>
        <Route index element={<UserDashboard />} />
        <Route path="dashboard" element={<UserDashboard />} />
        <Route path="myinquiries" element={<MyInquiries />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<UserSettings />} />
      </Route>
    </Routes>
  );
}