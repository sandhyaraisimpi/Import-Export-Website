// src/pages/user/Settings.jsx
import React, { useState } from "react";
import Sidebar from "../../components/user/sidebar";
import Header from "../../components/user/Header";

export default function Settings() {
  // State for form inputs
  const [settings, setSettings] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    notifications: true,
    darkMode: false,
  });

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (settings.newPassword !== settings.confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }
    // Normally, here you would send data to backend
    alert("Settings updated successfully!");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <Header />

        <main className="flex-1 overflow-auto  mt-20 p-6">
          <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Settings</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Password Section */}
              <div>
                <label className="block text-gray-700">Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={settings.currentPassword}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={settings.newPassword}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700">Confirm New Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={settings.confirmPassword}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded px-3 py-2"
                  required
                />
              </div>

              {/* Notifications Toggle */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="notifications"
                  checked={settings.notifications}
                  onChange={handleChange}
                  className="h-5 w-5"
                />
                <label className="text-gray-700">Enable Notifications</label>
              </div>

              {/* Dark Mode Toggle
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="darkMode"
                  checked={settings.darkMode}
                  onChange={handleChange}
                  className="h-5 w-5"
                />
                <label className="text-gray-700">Enable Dark Mode</label>
              </div> */}

              {/* Save Button */}
              <div>
                <button
                  type="submit"
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
                >
                  Save Settings
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}