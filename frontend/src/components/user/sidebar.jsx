import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  User,
  Settings,
} from "lucide-react";
import logo from "../../assets/logo/logo.webp"; 

export default function Sidebar() {
  return (
    <div className="fixed left-0 top-0 h-screen w-64bg-white/80  text-white flex flex-col  shadow-2xl ">

      {/* Title */}
      <div className="p-6 text-xlfont-bold  text-black ">
         <img src={logo} alt="Logo" className="h-20 w-52 object-contain" />
      </div>

      {/* Nav Links */}
      <nav className="flex flex-col gap-5 p-4 h-full">

        <NavLink
          to="/user/dashboard"
          className="flex items-center gap-3 px-4 py-3 rounded-4xl text-black hover:bg-gray-500 active:sclae-80 transition"
        >
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        <NavLink
          to="/user/orders"
           className="flex items-center gap-3 px-4 py-3 rounded-4xl text-black hover:bg-gray-500 active:sclae-80 transition"
        >
          <ClipboardList size={18} />
          Orders
        </NavLink>

        <NavLink
          to="/user/profile"
           className="flex items-center gap-3 px-4 py-3 rounded-4xl text-black hover:bg-gray-500 active:sclae-80 transition"
        >
          <User size={18} />
          Profile
        </NavLink>

        {/* Settings Bottom */}
        <NavLink
          to="/user/settings"
          className="mt-auto flex items-center gap-3 px-4 py-3 rounded-4xl text-black hover:bg-gray-500 transition"
        >
          <Settings size={18} />
          Settings
        </NavLink>

      </nav>
    </div>
  );
}