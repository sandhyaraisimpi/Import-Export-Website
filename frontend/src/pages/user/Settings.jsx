import { useState, useRef } from "react";
import Sidebar from "../../components/user/sidebar";
import Header from "../../components/user/Header";

export default function Profile() {
  const fileInputRef = useRef(null);

  const [twoFactor, setTwoFactor] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const [user, setUser] = useState({
    name: "Akhil Jha",
    email: "akhil@example.com",
    phone: "9876543210",
    gender: "Male",
    dob: "1995-08-12",
    city: "Madhubani",
    state: "Bihar",
    accountType: "Premium User",
    createdAt: "15 Jan 2024",
    verified: true,
    lastLogin: "20 Feb 2026, 10:45 AM",
    profileImage: "https://i.pravatar.cc/300?img=12",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setUser({ ...user, profileImage: imageURL });
    }
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="flex bg-gray-50">
      <Sidebar />

      <div className="flex-1 md:ml-64 pt-24 px-4 md:px-8 min-h-screen pb-16">
        <Header />

        <div className="space-y-8">

          {/* Profile Card */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">

              {/* Profile Image */}
              <div className="relative">
                <img
                  src={user.profileImage}
                  alt="Profile"
                  className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border"
                />

                {isEditing && (
                  <>
                    <button
                      onClick={() => fileInputRef.current.click()}
                      className="absolute bottom-0 right-0 bg-black text-white text-xs px-3 py-1 rounded-full"
                    >
                      Change
                    </button>

                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 text-center md:text-left">
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                    className="text-xl md:text-2xl font-semibold border-b w-full outline-none"
                  />
                ) : (
                  <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
                    {user.name}
                  </h2>
                )}

                <p className="text-gray-500 text-sm mt-1">
                  {user.email}
                  {user.verified && (
                    <span className="ml-2 text-green-600 text-xs font-medium">
                      ✔ Verified
                    </span>
                  )}
                </p>

                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="mt-4 px-4 py-2 bg-black text-white rounded-lg text-sm"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <div className="mt-4 flex gap-3 justify-center md:justify-start">
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-black text-white rounded-lg text-sm"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 border rounded-lg text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Editable Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 text-sm">

              {/* Mobile Number (Non Editable) */}
<div>
  <label className="text-gray-500 text-xs">Mobile Number</label>

  <div className="flex items-center justify-between  rounded-lg px-3 py-2 mt-1">

    <div className="flex items-center gap-2">
      <span className="text-gray-800 font-medium">
        +91 {user.phone}
      </span>

      <span className="text-green-600 text-xs font-medium">
        ✔ Verified
      </span>
    </div>

 

  </div>

  <p className="text-xs text-gray-400 mt-1">
    Mobile number cannot be changed.
  </p>
</div>

              {/* Gender Dropdown */}
              <div>
                <label className="text-gray-500 text-xs">Gender</label>
                {isEditing ? (
                  <select
                    name="gender"
                    value={user.gender}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2 mt-1"
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                ) : (
                  <p className="font-medium text-gray-800 mt-1">
                    {user.gender}
                  </p>
                )}
              </div>

              {/* Date Picker */}
              <div>
                <label className="text-gray-500 text-xs">Date of Birth</label>
                {isEditing ? (
                  <input
                    type="date"
                    name="dob"
                    value={user.dob}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2 mt-1"
                  />
                ) : (
                  <p className="font-medium text-gray-800 mt-1">
                    {user.dob}
                  </p>
                )}
              </div>

              <div>
                <label className="text-gray-500 text-xs">City</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="city"
                    value={user.city}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2 mt-1"
                  />
                ) : (
                  <p className="font-medium text-gray-800 mt-1">
                    {user.city}
                  </p>
                )}
              </div>

            </div>
          </div>

          {/* Account Status */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
              Account Status
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <p className="text-gray-500">Account Type</p>
                <p className="font-medium">{user.accountType}</p>
              </div>

              <div>
                <p className="text-gray-500">Created On</p>
                <p className="font-medium">{user.createdAt}</p>
              </div>

              <div>
                <p className="text-gray-500">Last Login</p>
                <p className="font-medium">{user.lastLogin}</p>
              </div>

              <div>
                <p className="text-gray-500">Verification</p>
                <p className="font-medium text-green-600">
                  {user.verified ? "Verified" : "Not Verified"}
                </p>
              </div>
            </div>
          </div>

          

        </div>
      </div>
    </div>
  );
}