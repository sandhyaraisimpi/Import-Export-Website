import { useState } from "react";
import Sidebar from "../../components/user/sidebar";
import Header from "../../components/user/Header";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getService } from "../../service/axios";

export default function Profile() {
  const navigate = useNavigate();

  const [twoFactor, setTwoFactor] = useState(true);
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

  useEffect(() => {
    ; (
      async () => {
        const apiResponse = await getService("/customer/auth/myprofile");

        if (!apiResponse.ok) {
          console.log(apiResponse.message);
          return
        }

        setUser(apiResponse.data.data)

      }
    )()
  }, [])

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 ml-64">
        <Header />

        <div className="p-8 min-h-screen mt-15 bg-gray-50 space-y-8">

          {/*  Basic Profile Info */}
          <div className="bg-white rounded-3xl shadow-xl p-8 flex items-center gap-6">
            <img
              src={user.profileImage}
              alt="Profile"
              className="w-28 h-28 rounded-full shadow-md object-cover"
            />

            <div>
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-gray-500">
                {user.email}
                {user.verified && (
                  <span className="ml-2 text-green-600 font-semibold text-sm">
                    ✔ Verified
                  </span>
                )}
              </p>
            </div>
          </div>

          {/*  Account Status */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h3 className="text-xl font-bold mb-4">Account Status</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              {/* <p><strong>Account Type:</strong> {user.accountType}</p> */}
              <p><strong>Account Created:</strong> {new Date(user.createdAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric"
              })}</p>
              {/* <p><strong>Verification:</strong> {user.verified ? "Verified" : "Not Verified"}</p> */}
              <p><strong>Verification:</strong> Verified</p>
              {/* <p><strong>Last Login:</strong> {user.lastLogin}</p> */}
              <p><strong>Last Login:</strong> 20 Feb 2026, 10:45 AM</p>
            </div>
          </div>





        </div>
      </div>
    </div>
  );
}