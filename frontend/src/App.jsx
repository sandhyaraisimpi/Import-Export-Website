import { Routes, Route, Navigate } from "react-router-dom";

/* ================= CORE ================= */
import Homepage from "./Homepage";
import AppRoutes from "./routes/AppRoutes";

/* ================= USER PAGES ================= */
import Dashboard from "./pages/user/Dashboard";
import Order from "./pages/user/OrderManagement";
import Profile from "./pages/user/Profile";
import Settings from "./pages/user/Settings";
import MyInquiries from "./pages/user/MyInquiries";
import InquiryDetail from "./pages/user/InquiryDetail";

/* ================= AUTH ================= */
import Login from "./pages/user/UserLogin";
import Signup from "./pages/user/UserSignup";
import ForgotPass from "./pages/user/ForgotPass";

/* ================= UI COMPONENTS ================= */
import FoodCarousel from "./components/FoodCarousel";

/* ================= PRODUCT SYSTEM ================= */
import MainCategory from "./pages/Products/MainCategory";
import ProductPage from "./pages/Products/ProductPage";
// import ProductDetails from "./pages/Products/ProductDetails";

function App() {
  return (
    <Routes>

      {/* ================================================= */}
      {/* HOME */}
      {/* ================================================= */}
      <Route path="/" element={<Homepage />} />

      {/* ================================================= */}
      {/* ADMIN PANEL */}
      {/* ================================================= */}
      <Route path="/admin/*" element={<AppRoutes />} />

      {/* ================================================= */}
      {/* USER DASHBOARD */}
      {/* ================================================= */}
      <Route path="/user/dashboard" element={<Dashboard />} />
      <Route path="/user/orders" element={<Order />} />
      <Route path="/user/profile" element={<Profile />} />
      <Route path="/user/settings" element={<Settings />} />
      <Route path="/user/inquiries" element={<MyInquiries />} />
      <Route path="/user/inquiries/:id" element={<InquiryDetail />} />

      {/* ================================================= */}
      {/* AUTHENTICATION */}
      {/* ================================================= */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-pass" element={<ForgotPass />} />

      {/* ================================================= */}
      {/* UI DEMO PAGE */}
      {/* ================================================= */}
      <Route path="/food-carousel" element={<FoodCarousel />} />

      {/* ================================================= */}
      {/* PRODUCT SYSTEM */}
      {/* ================================================= */}

      {/* All main categories */}
      <Route path="/products" element={<MainCategory />} />

      {/* Category product listing */}
      {/* Valid IDs: food | spices | agri | industrial */}
      <Route path="/products/:id" element={<ProductPage />} />

      {/* Future product detail page */}
      {/* Example URL → /products/food/f1 */}
      {/* <Route path="/products/:id/:productId" element={<ProductDetails />} /> */}

      {/* ================================================= */}
      {/* 404 FALLBACK */}
      {/* ================================================= */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
}

export default App;