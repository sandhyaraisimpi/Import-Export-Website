import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Sidebar() {
  const location = useLocation();

  const [openCategory, setOpenCategory] = useState(
    location.pathname.startsWith("/categories") ||
    location.pathname.startsWith("/sub-categories")
  );

  // ✅ NEW: Products dropdown state
  const [openProducts, setOpenProducts] = useState(
    location.pathname.startsWith("/products") ||
    location.pathname.startsWith("/product-images")
  );

  return (
    <aside className="w-64 bg-white shadow-md p-5 min-h-screen">
      <h1 className="text-xl font-bold text-blue-600 mb-8">
        Admin Panel
      </h1>

      <nav className="space-y-2">

        {/* Dashboard */}
        <Link
          to="/"
          className={`block p-2 rounded hover:bg-blue-50 ${
            location.pathname === "/"
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
                to="/categories"
                className={`block p-2 rounded text-sm hover:bg-blue-50 ${
                  location.pathname === "/categories"
                    ? "bg-blue-100 text-blue-600 font-semibold"
                    : "text-gray-600"
                }`}
              >
                All Categories
              </Link>

              <Link
                to="/sub-categories"
                className={`block p-2 rounded text-sm hover:bg-blue-50 ${
                  location.pathname === "/sub-categories"
                    ? "bg-blue-100 text-blue-600 font-semibold"
                    : "text-gray-600"
                }`}
              >
                Sub Categories
              </Link>

            </div>
          )}
        </div>


        {/* ✅ PRODUCTS DROPDOWN (NEW LOGIC) */}
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

              {/* Product Management */}
              <Link
                to="/products"
                className={`block p-2 rounded text-sm hover:bg-blue-50 ${
                  location.pathname === "/products"
                    ? "bg-blue-100 text-blue-600 font-semibold"
                    : "text-gray-600"
                }`}
              >
                Product Management
              </Link>


              {/* Image Management */}
              <Link
                to="/product-images"
                className={`block p-2 rounded text-sm hover:bg-blue-50 ${
                  location.pathname === "/product-images"
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
          to="/inquiries"
          className={`block p-2 rounded hover:bg-blue-50 ${
            location.pathname === "/inquiries"
              ? "bg-blue-100 text-blue-600 font-semibold"
              : "text-gray-700"
          }`}
        >
          Inquiries
        </Link>


        {/* Customers */}
        <Link
          to="/customers"
          className={`block p-2 rounded hover:bg-blue-50 ${
            location.pathname === "/customers"
              ? "bg-blue-100 text-blue-600 font-semibold"
              : "text-gray-700"
          }`}
        >
          Customers
        </Link>


        {/* Logistics */}
        <Link
          to="/logistics"
          className={`block p-2 rounded hover:bg-blue-50 ${
            location.pathname === "/logistics"
              ? "bg-blue-100 text-blue-600 font-semibold"
              : "text-gray-700"
          }`}
        >
          Logistics
        </Link>


        {/* Settings */}
        <Link
          to="/settings"
          className={`block p-2 rounded hover:bg-blue-50 ${
            location.pathname === "/settings"
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