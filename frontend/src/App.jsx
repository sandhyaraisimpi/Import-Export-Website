import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/user/Dashboard";
import Order from "./pages/user/OrderManagement";
import Profile from "./pages/user/Profile";
import Settings from "./pages/user/Settings";

function App() {
  return (
    <Router>
      <Routes>

        {/* Redirect default */}
        <Route path="/" element={<Navigate to="/user/dashboard" />} />

        {/* Direct Pages */}
        <Route path="/user/dashboard" element={<Dashboard />} />
        <Route path="/user/orders" element={<Order />} />
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/user/settings" element={<Settings />} />
        

      </Routes>
    </Router>
  );
}

export default App;