import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../../components/user/sidebar";
import Header from "../../components/user/Header";

export default function MyInquiries() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const inquiries = [
    {
      id: "1",
      product: "Industrial Drill Machine",
      quantity: 10,
      message: "Need bulk order pricing details.",
      date: "20 Feb 2026",
      status: "New",
      image: "https://images.unsplash.com/photo-1581092918484-8313f22a0fbb?auto=format&fit=crop&w=600&q=60",
    },
    {
      id: "2",
      product: "Steel Pipes",
      quantity: 200,
      message: "Looking for export quality pipes.",
      date: "18 Feb 2026",
      status: "In Progress",
      image: "https://images.unsplash.com/photo-1581093458791-9d2f1a9e6b8b?auto=format&fit=crop&w=600&q=60",
    },
    {
      id: "3",
      product: "Safety Helmets",
      quantity: 150,
      message: "Need ISI certified helmets.",
      date: "15 Feb 2026",
      status: "Contacted",
      image: "https://images.unsplash.com/photo-1581091012184-5c59d8f3c1e4?auto=format&fit=crop&w=600&q=60",
    },
    {
      id: "4",
      product: "Hydraulic Pump",
      quantity: 5,
      message: "Urgent requirement for export.",
      date: "10 Feb 2026",
      status: "Closed",
      image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=600&q=60",
    },
    {
      id: "5",
      product: "Packaging Boxes",
      quantity: 1000,
      message: "Need bulk pricing.",
      date: "08 Feb 2026",
      status: "New",
      image: "https://images.unsplash.com/photo-1600891963935-9eacb75f04c6?auto=format&fit=crop&w=600&q=60",
    },
    {
      id: "6",
      product: "Aluminium Sheets",
      quantity: 300,
      message: "Need 2mm thickness sheets.",
      date: "05 Feb 2026",
      status: "In Progress",
      image: "https://images.unsplash.com/photo-1581091870627-3d5c8d1f6b29?auto=format&fit=crop&w=600&q=60",
    },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case "New":
        return "bg-yellow-100 text-yellow-600";
      case "Contacted":
        return "bg-blue-100 text-blue-600";
      case "In Progress":
        return "bg-purple-100 text-purple-600";
      case "Closed":
        return "bg-green-100 text-green-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const filteredInquiries = inquiries.filter((item) => {
    const matchesSearch = item.product
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 ml-64">
        <Header />

        <div className="p-8 min-h-screen bg-gray-50">

          {/* 🔥 Detail Page */}
          {id ? (
            (() => {
              const inquiry = inquiries.find((item) => item.id === id);
              if (!inquiry) return <h2>Inquiry Not Found</h2>;

              return (
                <>
                  <button
                    onClick={() => navigate("/user/inquiries")}
                    className="mb-6 px-4 py-2 bg-gray-200 rounded-xl hover:bg-gray-300 transition"
                  >
                    ← Back
                  </button>

                  <div className="bg-white shadow-2xl rounded-3xl p-8 grid md:grid-cols-2 gap-10">
                    <img
                      src={inquiry.image}
                      alt={inquiry.product}
                      className="rounded-2xl shadow-lg w-full h-96 object-cover"
                    />

                    <div className="flex flex-col gap-5">
                      <h2 className="text-3xl font-bold">{inquiry.product}</h2>

                      <p><span className="font-semibold">Quantity:</span> {inquiry.quantity}</p>
                      <p><span className="font-semibold">Message:</span> {inquiry.message}</p>
                      <p><span className="font-semibold">Inquiry Date:</span> {inquiry.date}</p>

                      <span className={`px-4 py-2 rounded-full w-fit font-semibold ${getStatusStyle(inquiry.status)}`}>
                        {inquiry.status}
                      </span>
                    </div>
                  </div>
                </>
              );
            })()
          ) : (
            <>
              {/* Header Section */}
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">My Inquiries</h1>
                <div className="bg-white shadow-md px-4 py-2 rounded-xl">
                  Total: {filteredInquiries.length}
                </div>
              </div>

              {/* Search + Filter */}
              <div className="flex gap-4 mb-6">
                <input
                  type="text"
                  placeholder="Search product..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="px-4 py-2 rounded-xl shadow-md w-1/3 focus:outline-none"
                />

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 rounded-xl shadow-md focus:outline-none"
                >
                  <option value="All">All Status</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              {/* Table */}
              <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-gray-100 text-gray-600 text-sm uppercase">
                    <tr>
                      <th className="p-4">Product</th>
                      <th className="p-4">Quantity</th>
                      <th className="p-4">Date</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-center">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredInquiries.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50 transition">
                        <td className="p-4 font-medium">{item.product}</td>
                        <td className="p-4">{item.quantity}</td>
                        <td className="p-4">{item.date}</td>
                        <td className="p-4">
                          <span className={`px-3 py-1 text-xs rounded-full font-semibold ${getStatusStyle(item.status)}`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <button
                            onClick={() => navigate(`/user/inquiries/${item.id}`)}
                            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-md hover:scale-105 transition"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}