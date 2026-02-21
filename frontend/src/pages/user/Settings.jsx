import { useState, useRef } from "react";
import Sidebar from "../../components/user/sidebar";
import Header from "../../components/user/Header";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [twoFactor, setTwoFactor] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);

  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [showDeactivateForm, setShowDeactivateForm] = useState(false);

  const [password, setPassword] = useState("");
  const [reason, setReason] = useState("");
  const [deleteText, setDeleteText] = useState("");

  const [user, setUser] = useState({
    name: "Akhil Jha",
    email: "akhil@example.com",
    phone: "+91 9876543210",
    gender: "Male",
    dob: "1995-08-12",
    city: "Madhubani",
    state: "Bihar",
    accountType: "Premium User",
    createdAt: "15 Jan 2024",
    verified: true,
    lastLogin: "20 Feb 2026, 10:45 AM",
    orders: 24,
    wishlist: 6,
    savedAddresses: 3,
    profileImage: "https://i.pravatar.cc/150?img=12",
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

  /* ---------------- FULL SCREEN DEACTIVATE ---------------- */
  if (showDeactivateModal) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-yellow-600 to-black flex items-center justify-center">
        <div className="bg-white p-10 rounded-2xl shadow-2xl text-center w-[420px]">

          <h2 className="text-2xl font-bold text-yellow-600 mb-4">
            Confirm Deactivation
          </h2>

          {!showDeactivateForm ? (
            <>
              <p className="text-gray-600 mb-6">
                You can reactivate anytime by logging in.
              </p>

              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setShowDeactivateModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded-lg"
                >
                  Cancel
                </button>

                <button
                  onClick={() => setShowDeactivateForm(true)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
                >
                  Deactivate
                </button>
              </div>
            </>
          ) : (
            <>
              <input
                type="password"
                placeholder="Enter Password"
                className="w-full p-2 border rounded mb-3"
                onChange={(e) => setPassword(e.target.value)}
              />

              <select
                className="w-full p-2 border rounded mb-4"
                onChange={(e) => setReason(e.target.value)}
              >
                <option value="">Select Reason</option>
                <option>Privacy concerns</option>
                <option>Temporary break</option>
                <option>Other</option>
              </select>

              <button
                onClick={handleDeactivateVerify}
                className="w-full bg-yellow-500 text-white py-2 rounded-lg"
              >
                Confirm Deactivate
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  /* FULL SCREEN DELETE  */
  if (showDeleteModal) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-red-900 to-black flex items-center justify-center">
        <div className="bg-white p-10 rounded-2xl shadow-2xl text-center w-[420px]">

          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Confirm Permanent Deletion
          </h2>

          {!showDeleteForm ? (
            <>
              <p className="text-gray-600 mb-6">
                This action is irreversible.
              </p>

              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded-lg"
                >
                  Cancel
                </button>

                <button
                  onClick={() => setShowDeleteForm(true)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg"
                >
                  Yes Delete
                </button>
              </div>
            </>
          ) : (
            <>
              <input
                type="password"
                placeholder="Enter Password"
                className="w-full p-2 border rounded mb-3"
                onChange={(e) => setPassword(e.target.value)}
              />

              <input
                type="text"
                placeholder='Type "DELETE"'
                className="w-full p-2 border rounded mb-4"
                onChange={(e) => setDeleteText(e.target.value)}
              />

              <button
                onClick={handleDeleteVerify}
                className="w-full bg-red-600 text-white py-2 rounded-lg"
              >
                Confirm Delete
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  /*  PERMANENT DELETE LOGIC  */
  const handleDeleteVerify = () => {
    if (password && deleteText === "DELETE") {
      localStorage.setItem("account_status", "pending_delete");
      navigate("/login");
    } else {
      alert("Security verification failed");
    }
  };

  /*   TEMPORARY DEACTIVATE LOGIC   */
  const handleDeactivateVerify = () => {
    if (password && reason) {
      localStorage.setItem("account_status", "deactivated");
      navigate("/login");
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 ml-64">
        <Header />

        <div className="p-8 min-h-screen mt-15 bg-gray-50 space-y-8">

          {/*   Basic Profile Info */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <div className="flex items-center gap-6">

              {/* Profile Image */}
              <div className="relative">
                <img
                  src={user.profileImage}
                  alt="Profile"
                  className="w-28 h-28 rounded-full shadow-md object-cover"
                />

                {isEditing && (
                  <>
                    <button
                      onClick={() => fileInputRef.current.click()}
                      className="absolute bottom-0 right-0 bg-blue-600 text-white text-xs px-3 py-1 rounded-full shadow hover:bg-blue-700"
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

              <div className="flex-1">
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                    className="text-2xl font-bold border-b w-full outline-none"
                  />
                ) : (
                  <h2 className="text-2xl font-bold">{user.name}</h2>
                )}

                <p className="text-gray-500">
                  {user.email}
                  {user.verified && (
                    <span className="ml-2 text-green-600 font-semibold text-sm">
                      ✔ Verified
                    </span>
                  )}
                </p>

                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <div className="mt-3 flex gap-3">
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 bg-gray-300 rounded-xl hover:bg-gray-400 transition"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Editable Fields */}
            <div className="grid md:grid-cols-2 gap-6 mt-8 text-sm">
              {["phone", "gender", "dob", "city", "state"].map((field) => (
                <div key={field}>
                  <strong className="capitalize">{field}:</strong>{" "}
                  {isEditing ? (
                    <input
                      type="text"
                      name={field}
                      value={user[field]}
                      onChange={handleChange}
                      className="border-b ml-2 outline-none"
                    />
                  ) : (
                    user[field]
                  )}
                </div>
              ))}
            </div>
          </div>

          {/*  Account Status */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h3 className="text-xl font-bold mb-4">Account Status</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <p><strong>Account Type:</strong> {user.accountType}</p>
              <p><strong>Account Created:</strong> {user.createdAt}</p>
              <p><strong>Verification:</strong> {user.verified ? "Verified" : "Not Verified"}</p>
              <p><strong>Last Login:</strong> {user.lastLogin}</p>
            </div>
          </div>

          {/*  Security */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h3 className="text-xl font-bold mb-4">Security</h3>

            <div className="flex justify-between items-center mb-4">
              <span>Two-Factor Authentication</span>
              <button
                onClick={() => setTwoFactor(!twoFactor)}
                className={`px-4 py-1 rounded-full text-sm ${
                  twoFactor ? "bg-green-100 text-green-600" : "bg-gray-200"
                }`}
              >
                {twoFactor ? "Enabled" : "Disabled"}
              </button>
            </div>

            <button
              onClick={() =>
                alert("You have been logged out from all devices successfully!")
              }
              className="px-4 py-2 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition"
            >
              Logout From All Devices
            </button>
          </div>

          {/*  Danger Zone */}
          <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-300 rounded-3xl p-8 shadow-xl">

            <h3 className="text-xl font-bold text-red-700 mb-3">
              Danger Zone
            </h3>

            <p className="text-sm text-red-600 mb-6">
              Once you delete your account, there is no going back.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setShowDeleteModal(true)}
                className="px-6 py-2 bg-red-600 text-white rounded-xl"
              >
                Delete Account Permanently
              </button>

              <button
                onClick={() => setShowDeactivateModal(true)}
                className="px-6 py-2 border border-red-400 text-red-600 rounded-xl"
              >
                Deactivate Temporarily
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}