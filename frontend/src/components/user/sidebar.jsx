import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  User,
  Settings,
  MessageSquare,   // 👈 Inquiry icon
} from "lucide-react";
import logo from "../../assets/logo/logo.webp";

export default function Sidebar() {
  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-white shadow-2xl flex flex-col">

      {/* Logo */}
      <div className="p-6">
        <img
          src={logo}
          alt="Logo"
          className="h-20 w-52 object-contain"
        />
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-3 px-4 pb-6 h-full">

        {/* Dashboard */}
        <NavLink
          to="/user/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 
            ${isActive 
                ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg" 
                : "text-gray-700 hover:bg-gray-100"}`
          }
        >
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        {/* Orders */}
        <NavLink
          to="/user/orders"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 
             ${isActive 
                ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg" 
                : "text-gray-700 hover:bg-gray-100"}`
          }
        >
          <ClipboardList size={18} />
          Orders
        </NavLink>

        {/* 🔥 My Inquiries (NEW ADDED) */}
        <NavLink
          to="/user/inquiries"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 
             ${isActive 
                ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg" 
                : "text-gray-700 hover:bg-gray-100"}`
          }
        >
          <MessageSquare size={18} />
          My Inquiries
        </NavLink>

        {/* Profile */}
        <NavLink
          to="/user/profile"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 
             ${isActive 
                ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg" 
                : "text-gray-700 hover:bg-gray-100"}`
          }
        >
          <User size={18} />
          Profile
        </NavLink>

        {/* Settings (Bottom) */}
        <NavLink
          to="/user/settings"
          className={({ isActive }) =>
            `mt-auto flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 
             ${isActive 
                ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg" 
                : "text-gray-700 hover:bg-gray-100"}`
          }
        >
          <Settings size={18} />
          Settings
        </NavLink>

      </nav>
    </div>
  );
}