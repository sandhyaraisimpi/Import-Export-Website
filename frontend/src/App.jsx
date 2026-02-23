import { Routes, Route, Navigate } from "react-router-dom";

/* ================= CORE ================= */
import Homepage from "./Homepage";
import AppRoutes from "./routes/AppRoutes";

/* ================= USER PAGES ================= */
import Dashboard from "./pages/user/Dashboard";
import Profile from "./pages/user/Profile";
import Settings from "./pages/user/Settings";
import MyInquiries from "./pages/user/MyInquiries";
import InquiryDetail from "./pages/user/InquiryDetail";

/* BLOG PAGES */
import Blog from "./pages/blog/Blog";
import SingleBlog from "./pages/blog/SingleBlog";

/* ================= AUTH ================= */
import Login from "./pages/user/UserLogin";
import Signup from "./pages/user/UserSignup";
import ForgotPass from "./pages/user/ForgotPass";

/* ================= UI COMPONENTS ================= */
import FoodCarousel from "./components/FoodCarousel";

/* ================= PRODUCT SYSTEM ================= */
import MainCategory from "./pages/Products/MainCategory";
import CategoryProducts from "./pages/Products/CategoryProducts";
import PrductDetail from "./pages/Products/PrductDetail";


//Footer
import AboutUs from "./pages/user/AboutUs";


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
      <Route path="/user/profile" element={<Profile />} />
      <Route path="/user/settings" element={<Settings />} />
      <Route path="/user/inquiries" element={<MyInquiries />} />
      <Route path="/user/inquiries/:id" element={<InquiryDetail />} />

      {/* BLOG ROUTES */}
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:id" element={<SingleBlog />} />

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

        {/* User Routes */}
        <Route path="/user/dashboard" element={<Dashboard />} />
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/user/settings" element={<Settings />} />

      {/* Category product listing */}
      {/* Valid IDs: food | spices | agri | industrial */}
      <Route path="/MainCategory" element={<MainCategory />} />
      <Route path="/CategoryProducts" element={<CategoryProducts />} />
      <Route path="/products" element={<PrductDetail />} /> 

      {/* Future product detail page */}
      {/* Example URL → /products/food/f1 */}
      {/* <Route path="/products/:id/:productId" element={<ProductDetails />} /> */}
      <Route path="/AboutUs" element={<AboutUs />} /> 
   
      {/* ================================================= */}
      {/* 404 FALLBACK */}
      {/* ================================================= */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
}

export default App;