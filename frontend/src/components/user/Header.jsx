import { Bell, User, LogOut } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function Header() {
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);

  const notificationRef = useRef(null);
  const userMenuRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target)
      ) {
        setOpenNotification(false);
      }

      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target)
      ) {
        setOpenUserMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const notifications = [
    { id: 1, text: "Your order has been shipped." },
    { id: 2, text: "New offer available." },
    { id: 3, text: "Account verified successfully." },
  ];

  return (
    <header className="fixed top-0 md:left-64 left-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between pl-14 pr-4 md:px-8 z-30">

      {/* Left Section */}
      <div className="flex items-center gap-4">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
          My Dashboard
        </h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6 relative">

        {/* Notification */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => setOpenNotification(!openNotification)}
            className="relative text-gray-500 hover:text-gray-800 transition"
          >
            <Bell size={22} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-medium rounded-full w-4 h-4 flex items-center justify-center">
              {notifications.length}
            </span>
          </button>

          {openNotification && (
  <>
    {/* Mobile Overlay */}
    <div className="fixed inset-0 bg-black/30 z-40 md:hidden"
      onClick={() => setOpenNotification(false)}
    ></div>

    {/* Notification Panel */}
    <div className="
      fixed md:absolute
      top-16 md:top-auto
      left-1/2 md:left-auto
      -translate-x-1/2 md:translate-x-0
      md:right-0
      w-[95%] md:w-80
      max-w-md
      bg-white
      rounded-2xl
      shadow-xl
      border border-gray-100
      z-50
      overflow-hidden
    ">

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b bg-gray-50">
        <h3 className="text-sm font-semibold text-gray-800">
          Notifications
        </h3>
        <span className="text-xs text-blue-600 cursor-pointer hover:underline">
          Mark all as read
        </span>
      </div>

      {/* List */}
      <div className="max-h-80 overflow-y-auto">
        {notifications.map((item) => (
          <div
            key={item.id}
            className="flex gap-3 px-4 py-3 hover:bg-gray-50 transition cursor-pointer border-b"
          >
            <div className="w-9 h-9 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
              🔔
            </div>

            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">
                {item.text}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                2 min ago
              </p>
            </div>

            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="text-center py-3 text-sm text-blue-600 hover:bg-gray-50 cursor-pointer">
        View All Notifications
      </div>

    </div>
  </>
)}
        </div>

        {/* User Menu */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setOpenUserMenu(!openUserMenu)}
            className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 px-3 py-2 rounded-lg transition"
          >
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm font-medium text-white">
              A
            </div>
            <span className="hidden md:block text-sm font-medium text-gray-700">
              Akhil
            </span>
          </button>

          {openUserMenu && (
            <div className="absolute right-0 mt-3 w-44 bg-white rounded-xl shadow-lg border border-gray-200 py-2">
             
              <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2 text-red-600">
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}