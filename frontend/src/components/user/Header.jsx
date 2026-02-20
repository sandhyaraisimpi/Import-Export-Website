import { Bell, User, LogOut } from "lucide-react";
import logo from "../../assets/logo/logo.webp"; // apna logo path
import { useState } from "react";

export default function Header() {
  const [openUserMenu, setOpenUserMenu] = useState(false);

  return (
    <div className="fixed top-0 left-64 right-0 h-18 bg-white/80 backdrop-blur-lg shadow-md flex items-center justify-between px-6 z-40 ">
      
      {/* Left: Logo / Title */}
      <div className="flex text-4xl items-center gap-4">
       My Dashboard
       
      </div>

      {/* Right: Icons */}
      <div className="flex items-center gap-6 relative">

        {/* Notification */}
        <button className="relative text-gray-600 hover:text-gray-900 transition">
          <Bell size={24} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
            3
          </span>
        </button>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setOpenUserMenu(!openUserMenu)}
            className="flex items-center gap-2 border rounded-xl px-3 py-1 hover:shadow-md transition"
          >
            <User size={20} />
            <span className="text-gray-700 font-medium">Akhil</span>
          </button>

          {openUserMenu && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border py-2">
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                <User size={16} /> Profile
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}