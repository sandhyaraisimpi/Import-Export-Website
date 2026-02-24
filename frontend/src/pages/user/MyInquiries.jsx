import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
// import Sidebar from "../../components/user/sidebar";
// import Header from "../../components/user/Header";

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
      image:
        "https://images.unsplash.com/photo-1581092918484-8313f22a0fbb?auto=format&fit=crop&w=600&q=60",
    },
    {
      id: "2",
      product: "Steel Pipes",
      quantity: 200,
      message: "Looking for export quality pipes.",
      date: "18 Feb 2026",
      status: "In Progress",
      image:
        "https://images.unsplash.com/photo-1581093458791-9d2f1a9e6b8b?auto=format&fit=crop&w=600&q=60",
    },
    {
      id: "3",
      product: "Safety Helmets",
      quantity: 150,
      message: "Need ISI certified helmets.",
      date: "15 Feb 2026",
      status: "Contacted",
      image:
        "https://images.unsplash.com/photo-1581091012184-5c59d8f3c1e4?auto=format&fit=crop&w=600&q=60",
    },
    {
      id: "4",
      product: "Hydraulic Pump",
      quantity: 5,
      message: "Urgent requirement for export.",
      date: "10 Feb 2026",
      status: "Closed",
      image:
        "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=600&q=60",
    },
    {
      id: "5",
      product: "Packaging Boxes",
      quantity: 1000,
      message: "Need bulk pricing.",
      date: "08 Feb 2026",
      status: "New",
      image:
        "https://images.unsplash.com/photo-1600891963935-9eacb75f04c6?auto=format&fit=crop&w=600&q=60",
    },
    {
      id: "6",
      product: "Aluminium Sheets",
      quantity: 300,
      message: "Need 2mm thickness sheets.",
      date: "05 Feb 2026",
      status: "In Progress",
      image:
        "https://images.unsplash.com/photo-1581091870627-3d5c8d1f6b29?auto=format&fit=crop&w=600&q=60",
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
    <div className="flex bg-gray-50">
      <Sidebar />

      <div className="flex-1 md:ml-64 pt-24 px-4 md:px-8 min-h-screen pb-16">
        <Header />

        {id ? (
          (() => {
            const inquiry = inquiries.find((item) => item.id === id);
            if (!inquiry)
              return <h2 className="mt-10 text-lg">Inquiry Not Found</h2>;

            return (
              <>
                <button
                  onClick={() => navigate("/user/inquiries")}
                  className="mb-6 px-4 py-2 text-sm font-medium bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                >
                  ← Back
                </button>

                <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 grid md:grid-cols-2 gap-8">
                  <img
                    src={inquiry.image}
                    alt={inquiry.product}
                    className="rounded-xl w-full h-64 md:h-96 object-cover"
                  />

                  <div className="flex flex-col gap-4">
                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
                      {inquiry.product}
                    </h2>

                    <p className="text-gray-600">
                      <span className="font-medium text-gray-800">
                        Quantity:
                      </span>{" "}
                      {inquiry.quantity}
                    </p>

                    <p className="text-gray-600">
                      <span className="font-medium text-gray-800">
                        Message:
                      </span>{" "}
                      {inquiry.message}
                    </p>

                    <p className="text-gray-600">
                      <span className="font-medium text-gray-800">
                        Inquiry Date:
                      </span>{" "}
                      {inquiry.date}
                    </p>

                    <span
                      className={`px-4 py-2 rounded-full text-sm font-medium w-fit ${getStatusStyle(
                        inquiry.status
                      )}`}
                    >
                      {inquiry.status}
                    </span>
                  </div>
                </div>
              </>
            );
          })()
        ) : (
          <>
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
                My Inquiries
              </h1>

              <div className="bg-white border border-gray-200 px-4 py-2 rounded-xl text-sm font-medium text-gray-600">
                Total: {filteredInquiries.length}
              </div>
            </div>

            {/* Search + Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <input
                type="text"
                placeholder="Search product..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full md:w-72 px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 bg-white"
              />

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full md:w-56 px-4 py-2 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
                <option value="All">All Status</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
              </select>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block bg-white border border-gray-200 rounded-2xl overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                  <tr>
                    <th className="p-4 font-medium">Product</th>
                    <th className="p-4 font-medium">Quantity</th>
                    <th className="p-4 font-medium">Date</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 text-center font-medium">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredInquiries.map((item) => (
                    <tr
                      key={item.id}
                      className="border-t hover:bg-gray-50 transition"
                    >
                      <td className="p-4 font-medium text-gray-800">
                        {item.product}
                      </td>
                      <td className="p-4 text-gray-600">
                        {item.quantity}
                      </td>
                      <td className="p-4 text-gray-600">{item.date}</td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 text-xs rounded-full font-medium ${getStatusStyle(
                            item.status
                          )}`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() =>
                            navigate(`/user/inquiries/${item.id}`)
                          }
                          className="px-4 py-2 text-sm font-medium bg-black text-white rounded-lg hover:opacity-90 transition"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden flex flex-col gap-4">
              {filteredInquiries.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col gap-2"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-gray-800">
                      {item.product}
                    </h3>
                    <span
                      className={`px-3 py-1 text-xs rounded-full font-medium ${getStatusStyle(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600">
                    Qty: {item.quantity}
                  </p>
                  <p className="text-sm text-gray-500">
                    {item.date}
                  </p>

                  <button
                    onClick={() =>
                      navigate(`/user/inquiries/${item.id}`)
                    }
                    className="mt-2 px-4 py-2 text-sm font-medium bg-black text-white rounded-lg"
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}