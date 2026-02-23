import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  Settings,
  MessageSquare,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";
import logo from "../../assets/logo/logo.webp";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  const navItem =
    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition";

  const activeStyle = "bg-gray-100 text-black";
  const normalStyle = "text-gray-600 hover:bg-gray-50";

  return (
    <>
      {/* ✅ Mobile Toggle Button */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-40 bg-white p-2 rounded-lg shadow"
      >
        <Menu size={22} />
      </button>

      {/* ✅ Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ✅ Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-sm z-50
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
      >
        {/* Logo + Close Button */}
        <div className="px-6 py-6 border-b border-gray-200 flex justify-between items-center">
          <img src={logo} alt="Logo" className="h-10 object-contain" />

          {/* Close Button (Mobile Only) */}
          <button
            onClick={() => setOpen(false)}
            className="md:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col justify-between h-[calc(100vh-88px)] p-4">

          <div className="flex flex-col gap-2">

            <NavLink
              to="/user/dashboard"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `${navItem} ${isActive ? activeStyle : normalStyle}`
              }
            >
              <LayoutDashboard size={18} />
              Dashboard
            </NavLink>

            <NavLink
              to="/user/inquiries"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `${navItem} ${isActive ? activeStyle : normalStyle}`
              }
            >
              <MessageSquare size={18} />
              My Inquiries
            </NavLink>

            <NavLink
              to="/user/profile"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `${navItem} ${isActive ? activeStyle : normalStyle}`
              }
            >
              <User size={18} />
              Profile
            </NavLink>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <NavLink
              to="/user/settings"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `${navItem} ${isActive ? activeStyle : normalStyle}`
              }
            >
              <Settings size={18} />
              Settings
            </NavLink>
          </div>

        </nav>
      </div>
    </>
  );
}