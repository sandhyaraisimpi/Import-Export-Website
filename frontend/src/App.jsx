import { Routes, Route, Navigate } from "react-router-dom";

import Homepage from "./Homepage";
import AppRoutes from "./routes/AppRoutes";

/* USER PAGES */
import Dashboard from "./pages/user/Dashboard";
import Order from "./pages/user/OrderManagement";
import Profile from "./pages/user/Profile";
import Settings from "./pages/user/Settings";
import MyInquiries from "./pages/user/MyInquiries";
import InquiryDetail from "./pages/user/InquiryDetail";
import Login from "./pages/user/UserLogin";
import Signup from "./pages/user/UserSignup";
import ForgotPass from "./pages/user/ForgotPass";
import FoodCarousel from "./components/FoodCarousel";

import MainCategory from "./pages/Products/MainCategory";
import SubCategory from "./pages/Products/SubCategory";



function App() {
  return (
    <Routes>


      <Route path="/" element={<Homepage />} />



      <Route path="/admin/*" element={<AppRoutes />} />

      {/* USER ROUTES */}
      <Route path="/user/dashboard" element={<Dashboard />} />
      <Route path="/user/orders" element={<Order />} />
      <Route path="/user/profile" element={<Profile />} />
      <Route path="/user/settings" element={<Settings />} />
      <Route path="/user/inquiries" element={<MyInquiries />} />
      <Route path="/user/inquiries/:id" element={<InquiryDetail />} />

      {/* USER AUTH */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-pass" element={<ForgotPass />} />

      <Route path="/food-carousel" element={<FoodCarousel />} />
      {/* Products Pages */}
      <Route path="/main-category" element={<MainCategory />} />
      <Route path="/category/:id" element={<SubCategory />} />

      {/* 404 */}
      <Route path="*" element={<Navigate to="/" />} />

    </Routes>
  );
}

export default App;