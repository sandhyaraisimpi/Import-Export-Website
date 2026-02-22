import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Sidebar() {
  const location = useLocation();

  // Dropdown open state based on current URL
  const [openCategory, setOpenCategory] = useState(false);
  const [openProducts, setOpenProducts] = useState(false);

  useEffect(() => {
    if (location.pathname.startsWith("/admin/categories")) {
      setOpenCategory(true);
    }

    if (location.pathname.startsWith("/admin/products") ||
        location.pathname.startsWith("/admin/product-images")) {
      setOpenProducts(true);
    }
  }, [location.pathname]);

  return (
    <aside className="w-64 bg-white shadow-md p-5 min-h-screen">
      <h1 className="text-xl font-bold text-blue-600 mb-8">
        Admin Panel
      </h1>

      <nav className="space-y-2">

        {/* Dashboard */}
        <Link
          to="/admin/dashboard"
          className={`block p-2 rounded hover:bg-blue-50 ${
            location.pathname === "/admin/dashboard"
              ? "bg-blue-100 text-blue-600 font-semibold"
              : "text-gray-700"
          }`}
        >
          Dashboard
        </Link>

        {/* CATEGORY DROPDOWN */}
        <div>
          <button
            onClick={() => setOpenCategory(!openCategory)}
            className="w-full flex justify-between items-center p-2 rounded hover:bg-blue-50 text-gray-700"
          >
            <span>Categories</span>
            <span
              className={`transition-transform duration-200 ${
                openCategory ? "rotate-90" : ""
              }`}
            >
              ▶
            </span>
          </button>

          {openCategory && (
            <div className="ml-4 mt-1 space-y-1">

              <Link
                to="/admin/categories"
                className={`block p-2 rounded text-sm hover:bg-blue-50 ${
                  location.pathname === "/admin/categories"
                    ? "bg-blue-100 text-blue-600 font-semibold"
                    : "text-gray-600"
                }`}
              >
                All Categories
              </Link>

            </div>
          )}
        </div>


        {/* PRODUCTS DROPDOWN */}
        <div>
          <button
            onClick={() => setOpenProducts(!openProducts)}
            className="w-full flex justify-between items-center p-2 rounded hover:bg-blue-50 text-gray-700"
          >
            <span>Products</span>
            <span
              className={`transition-transform duration-200 ${
                openProducts ? "rotate-90" : ""
              }`}
            >
              ▶
            </span>
          </button>

          {openProducts && (
            <div className="ml-4 mt-1 space-y-1">

              <Link
                to="/admin/products"
                className={`block p-2 rounded text-sm hover:bg-blue-50 ${
                  location.pathname === "/admin/products"
                    ? "bg-blue-100 text-blue-600 font-semibold"
                    : "text-gray-600"
                }`}
              >
                Product Management
              </Link>

              <Link
                to="/admin/product-images"
                className={`block p-2 rounded text-sm hover:bg-blue-50 ${
                  location.pathname === "/admin/product-images"
                    ? "bg-blue-100 text-blue-600 font-semibold"
                    : "text-gray-600"
                }`}
              >
                Image Management
              </Link>

            </div>
          )}
        </div>


        {/* Inquiries */}
        <Link
          to="/admin/inquiries"
          className={`block p-2 rounded hover:bg-blue-50 ${
            location.pathname === "/admin/inquiries"
              ? "bg-blue-100 text-blue-600 font-semibold"
              : "text-gray-700"
          }`}
        >
          Inquiries
        </Link>


        {/* Customers */}
        <Link
          to="/admin/customers"
          className={`block p-2 rounded hover:bg-blue-50 ${
            location.pathname === "/admin/customers"
              ? "bg-blue-100 text-blue-600 font-semibold"
              : "text-gray-700"
          }`}
        >
          Customers
        </Link>


        {/* Settings */}
        <Link
          to="/admin/settings"
          className={`block p-2 rounded hover:bg-blue-50 ${
            location.pathname === "/admin/settings"
              ? "bg-blue-100 text-blue-600 font-semibold"
              : "text-gray-700"
          }`}
        >
          Settings
        </Link>

      </nav>
    </aside>
  );
}