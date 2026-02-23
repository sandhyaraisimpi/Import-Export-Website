import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import {
  LayoutDashboard,
  Folder,
  FolderTree,
  Package,
  Image,
  MessageSquare,
  Users,
  FileText,
  Settings,
  ChevronDown,
  ChevronRight,
  User,
  Bell,
  Globe,
  Sliders
} from "lucide-react";

import logo from "../assets/logo/logo.webp";

export default function Sidebar() {

  const location = useLocation();

  // Dropdown open state based on current URL
  const [openCategory, setOpenCategory] = useState(false);
  // const [openProducts, setOpenProducts] = useState(false);

  const [openProducts, setOpenProducts] = useState(
    location.pathname.startsWith("/products") ||
    location.pathname.startsWith("/product-images")
  );

  const [openSettings, setOpenSettings] = useState(
    location.pathname.startsWith("/settings")
  );

  const isActive = (path) => location.pathname === path;

  const isDropdownActive = (paths) =>
    paths.some(path => location.pathname.startsWith(path));

  const buttonClass = (active) =>
    `flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group
    ${active
      ? "bg-blue-100 text-blue-600 shadow-sm"
      : "text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:scale-[1.03]"
    }`;

  const subButtonClass = (active) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200
    ${active
      ? "bg-blue-100 text-blue-600 font-semibold"
      : "text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:scale-[1.03]"
    }`;

  return (

    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col justify-between">

      {/* TOP */}
      <div>

        {/* LOGO */}
        <div className="p-4 border-b border-gray-100">

          <img
            src={logo}
            alt="Logo"
            className="h-10 object-contain"
          />

        </div>


        {/* NAV */}
        <nav className="p-4 space-y-2">

          {/* Dashboard */}
          <Link to="/" className={buttonClass(isActive("/"))}>
            <div className="flex items-center gap-3">
              <LayoutDashboard size={18}/>
              Dashboard
            </div>
          </Link>


          {/* Categories */}
          <div>

            <button
              onClick={() => setOpenCategory(!openCategory)}
              className={buttonClass(
                isDropdownActive(["/categories", "/sub-categories"])
              )}
            >
              <div className="flex items-center gap-3">
                <Folder size={18}/>
                Categories
              </div>

              {openCategory ?
                <ChevronDown size={16}/> :
                <ChevronRight size={16}/>
              }

            </button>


            {openCategory && (

              <div className="ml-6 mt-1 space-y-1">

                <Link
                  to="/categories"
                  className={subButtonClass(isActive("/categories"))}
                >
                  <FolderTree size={16}/>
                  All Categories
                </Link>

                <Link
                  to="/sub-categories"
                  className={subButtonClass(isActive("/sub-categories"))}
                >
                  <FolderTree size={16}/>
                  Sub Categories
                </Link>

              </div>

            )}

          </div>


          {/* Products */}
          <div>

            <button
              onClick={() => setOpenProducts(!openProducts)}
              className={buttonClass(
                isDropdownActive(["/products", "/product-images"])
              )}
            >
              <div className="flex items-center gap-3">
                <Package size={18}/>
                Products
              </div>

              {openProducts ?
                <ChevronDown size={16}/> :
                <ChevronRight size={16}/>
              }

            </button>


            {openProducts && (

              <div className="ml-6 mt-1 space-y-1">

                <Link
                  to="/products"
                  className={subButtonClass(isActive("/products"))}
                >
                  <Package size={16}/>
                  Product Management
                </Link>

                <Link
                  to="/product-images"
                  className={subButtonClass(isActive("/product-images"))}
                >
                  <Image size={16}/>
                  Image Management
                </Link>

              </div>

            )}

          </div>


          {/* Inquiries */}
          <Link to="/inquiries" className={buttonClass(isActive("/inquiries"))}>
            <div className="flex items-center gap-3">
              <MessageSquare size={18}/>
              Inquiries
            </div>
          </Link>


          {/* Customers */}
          <Link to="/customers" className={buttonClass(isActive("/customers"))}>
            <div className="flex items-center gap-3">
              <Users size={18}/>
              Customers
            </div>
          </Link>


          {/* Terms */}
          <Link to="/team-roles" className={buttonClass(isActive("/team-roles"))}>
            <div className="flex items-center gap-3">
              <FileText size={18}/>
              Terms & Conditions
            </div>
          </Link>

        </nav>

      </div>


      {/* SETTINGS AT BOTTOM */}
<div className="p-4 border-t border-gray-100">

  <button
    onClick={() => setOpenSettings(!openSettings)}
    className={buttonClass(
      isDropdownActive(["/settings"])
    )}
  >

    <div className="flex items-center gap-3">
      <Settings size={18}/>
      Settings
    </div>

    {openSettings ?
      <ChevronDown size={16}/> :
      <ChevronRight size={16}/>
    }

  </button>


  {openSettings && (

    <div className="ml-6 mt-2 space-y-1">

      {/* MAIN SETTINGS PAGE */}
      <Link
        to="/settings"
        className={subButtonClass(isActive("/settings"))}
      >
        <Settings size={16}/>
        All Settings
      </Link>


      {/* GENERAL */}
      <Link
        to="/settings/general"
        className={subButtonClass(isActive("/settings/general"))}
      >
        <Sliders size={16}/>
        General Settings
      </Link>


      {/* PROFILE */}
      <Link
        to="/settings/profile"
        className={subButtonClass(isActive("/settings/profile"))}
      >
        <User size={16}/>
        Profile Settings
      </Link>


      {/* NOTIFICATION */}
      <Link
        to="/settings/notifications"
        className={subButtonClass(isActive("/settings/notifications"))}
      >
        <Bell size={16}/>
        Notification Settings
      </Link>


      {/* WEBSITE */}
      <Link
        to="/settings/website"
        className={subButtonClass(isActive("/settings/website"))}
      >
        <Globe size={16}/>
        Website Settings
      </Link>

    </div>

  )}

</div>
    </aside>

  );

}