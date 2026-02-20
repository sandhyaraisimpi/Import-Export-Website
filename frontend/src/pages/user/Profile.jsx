// src/pages/user/Profile.jsx
import React from "react";
import Sidebar from "../../components/user/sidebar"; // tumhara existing Sidebar
import Header from "../../components/user/Header";   // tumhara existing Header
import { User } from "lucide-react";
import user from "../../assets/userProfile/user.webp";

export default function Profile() {
  // Dummy user data (tum API se fetch kar sakte ho)
  const userData = {
    name: "Akhil Jha",
    email: "akhil@example.com",
    phone: "+91 9876543210",
    role: "Admin",
    avatar: user,
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Page content */}
        <main className="p-6 ml-20 mt-20 overflow-auto">
          <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6">
            <div className="flex items-center space-x-6">
              {/* Avatar */}
              <img
                src={userData.avatar}
                alt="User Avatar"
                className="w-24 h-24 rounded-full border-2 border-indigo-500"
              />

              {/* User Info */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{userData.name}</h2>
                <p className="text-gray-500">{userData.role}</p>
                <p className="mt-2 text-gray-600">Email: {userData.email}</p>
                <p className="text-gray-600">Phone: {userData.phone}</p>
              </div>
            </div>

            {/* Edit Profile Button */}
            <div className="mt-6">
              <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition">
                Edit Profile
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}