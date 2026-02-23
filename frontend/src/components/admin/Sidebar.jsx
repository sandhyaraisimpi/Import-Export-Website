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

import logo from "../../assets/logo/logo.webp";

export default function Sidebar() {

  const location = useLocation();

  const [openCategory, setOpenCategory] = useState(false);
  const [openProducts, setOpenProducts] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);

  // Auto open dropdown on route change
  useEffect(() => {
    setOpenCategory(
      location.pathname.startsWith("/admin/categories") ||
      location.pathname.startsWith("/admin/sub-categories")
    );

    setOpenProducts(
      location.pathname.startsWith("/admin/products") ||
      location.pathname.startsWith("/admin/product-images")
    );

    setOpenSettings(
      location.pathname.startsWith("/admin/settings")
    );
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;

  const isDropdownActive = (paths) =>
    paths.some(path => location.pathname.startsWith(path));

  const buttonClass = (active) =>
    `flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
    ${active
      ? "bg-blue-100 text-blue-600 shadow-sm"
      : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
    }`;

  const subButtonClass = (active) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200
    ${active
      ? "bg-blue-100 text-blue-600 font-semibold"
      : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
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
          <Link
            to="/admin/dashboard"
            className={buttonClass(isActive("/admin/dashboard"))}
          >
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
                isDropdownActive([
                  "/admin/categories",
                  "/admin/sub-categories"
                ])
              )}
            >
              <div className="flex items-center gap-3">
                <Folder size={18}/>
                Categories
              </div>
              {openCategory ? <ChevronDown size={16}/> : <ChevronRight size={16}/>}
            </button>

            {openCategory && (
              <div className="ml-6 mt-1 space-y-1">
                <Link
                  to="/admin/categories"
                  className={subButtonClass(isActive("/admin/categories"))}
                >
                  <FolderTree size={16}/>
                  All Categories
                </Link>

                <Link
                  to="/admin/sub-categories"
                  className={subButtonClass(isActive("/admin/sub-categories"))}
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
                isDropdownActive([
                  "/admin/products",
                  "/admin/product-images"
                ])
              )}
            >
              <div className="flex items-center gap-3">
                <Package size={18}/>
                Products
              </div>
              {openProducts ? <ChevronDown size={16}/> : <ChevronRight size={16}/>}
            </button>

            {openProducts && (
              <div className="ml-6 mt-1 space-y-1">
                <Link
                  to="/admin/products"
                  className={subButtonClass(isActive("/admin/products"))}
                >
                  <Package size={16}/>
                  Product Management
                </Link>

                <Link
                  to="/admin/product-images"
                  className={subButtonClass(isActive("/admin/product-images"))}
                >
                  <Image size={16}/>
                  Image Management
                </Link>
              </div>
            )}
          </div>

          {/* Inquiries */}
          <Link
            to="/admin/inquiries"
            className={buttonClass(isActive("/admin/inquiries"))}
          >
            <div className="flex items-center gap-3">
              <MessageSquare size={18}/>
              Inquiries
            </div>
          </Link>

          {/* Customers */}
          <Link
            to="/admin/customers"
            className={buttonClass(isActive("/admin/customers"))}
          >
            <div className="flex items-center gap-3">
              <Users size={18}/>
              Customers
            </div>
          </Link>

          {/* Terms */}
          <Link
            to="/admin/team-roles"
            className={buttonClass(isActive("/admin/team-roles"))}
          >
            <div className="flex items-center gap-3">
              <FileText size={18}/>
              Terms & Conditions
            </div>
          </Link>

        </nav>
      </div>

      {/* SETTINGS */}
      <div className="p-4 border-t border-gray-100">
        <button
          onClick={() => setOpenSettings(!openSettings)}
          className={buttonClass(
            isDropdownActive(["/admin/settings"])
          )}
        >
          <div className="flex items-center gap-3">
            <Settings size={18}/>
            Settings
          </div>
          {openSettings ? <ChevronDown size={16}/> : <ChevronRight size={16}/>}
        </button>

        {openSettings && (
          <div className="ml-6 mt-2 space-y-1">

            <Link
              to="/admin/settings"
              className={subButtonClass(isActive("/admin/settings"))}
            >
              <Settings size={16}/>
              All Settings
            </Link>

            <Link
              to="/admin/settings/general"
              className={subButtonClass(isActive("/admin/settings/general"))}
            >
              <Sliders size={16}/>
              General Settings
            </Link>

            <Link
              to="/admin/settings/profile"
              className={subButtonClass(isActive("/admin/settings/profile"))}
            >
              <User size={16}/>
              Profile Settings
            </Link>

            <Link
              to="/admin/settings/notifications"
              className={subButtonClass(isActive("/admin/settings/notifications"))}
            >
              <Bell size={16}/>
              Notification Settings
            </Link>

            <Link
              to="/admin/settings/website"
              className={subButtonClass(isActive("/admin/settings/website"))}
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