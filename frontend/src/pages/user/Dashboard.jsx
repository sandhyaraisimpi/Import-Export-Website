import Sidebar from "../../components/user/sidebar";
import Header from "../../components/user/Header"; // Add this
import { useState } from "react";
import {
  PlusCircle,
  ClipboardList,
  Clock,
  Loader,
  CheckCircle,
  X,
} from "lucide-react";

export default function Dashboard() {
  const [openForm, setOpenForm] = useState(false);

  const stats = {
    total: 24,
    pending: 6,
    inProgress: 10,
    closed: 8,
  };

  const recent = [
    { id: "INQ001", subject: "Import of Electronics", date: "2026-02-15", status: "Pending" },
    { id: "INQ002", subject: "Export of Textiles", date: "2026-02-14", status: "In Progress" },
    { id: "INQ003", subject: "Shipment Tracking Issue", date: "2026-02-13", status: "Closed" },
  ];

  const statusColor = (status) => {
    if (status === "Pending") return "bg-yellow-100 text-yellow-600";
    if (status === "In Progress") return "bg-purple-100 text-purple-600";
    if (status === "Closed") return "bg-green-100 text-green-600";
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

      <div className="flex-1 ml-64 pt-16 p-6 space-y-6 "> {/* pt-16 for Header height */}
        <Header />

        {/* Dashboard Content */}
        <div className="space-y-6">

          {/* Welcome */}
          <div className=" backdrop-blur-lg mt-10 p-6 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.12)]  flex justify-between items-center">
            <div>
              <h1 className="text-3xl text-black font-bold">Welcome, Akhil 👋</h1>
              <p className="text-gray-500 mt-2">Here’s a summary of your inquiries.</p>
            </div>
            <button
              onClick={() => setOpenForm(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-3 rounded-2xl shadow-md hover:scale-105 transition"
            >
              <PlusCircle size={18} /> New Inquiry
            </button>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2   xl:grid-cols-4 gap-6">
            <Card title="Total Inquiries" value={stats.total} icon={<ClipboardList className="text-blue-500" />} />
            <Card title="Pending" value={stats.pending} icon={<Clock className="text-yellow-500" />} />
            <Card title="In Progress" value={stats.inProgress} icon={<Loader className="text-purple-500" />} />
            <Card title="Closed" value={stats.closed} icon={<CheckCircle className="text-green-500" />} />
          </div>

          {/* Recent Table */}
          <div className="bg-white p-6 rounded-3xl shadow-xl">
            <h2 className="text-lg font-semibold mb-4">Recent Inquiries</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-500 border-b">
                  <th className="pb-3 text-left">ID</th>
                  <th className="pb-3 text-left">Subject</th>
                  <th className="pb-3 text-left">Date</th>
                  <th className="pb-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50 transition">
                    <td className="py-3">{item.id}</td>
                    <td>{item.subject}</td>
                    <td>{item.date}</td>
                    <td>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* New Inquiry Modal */}
        {openForm && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-8 relative animate-fadeIn">
              <button onClick={() => setOpenForm(false)} className="absolute top-4 right-4 text-gray-400 hover:text-black">
                <X />
              </button>
              <h2 className="text-2xl font-bold mb-6">Create New Inquiry</h2>
              <form className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-1">Subject</label>
                  <input type="text" placeholder="Enter subject" className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none">
                    <option>Import</option>
                    <option>Export</option>
                    <option>Shipment</option>
                    <option>Custom Clearance</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea rows="4" placeholder="Write your inquiry details..." className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <button type="button" onClick={() => setOpenForm(false)} className="px-5 py-2 rounded-xl border">Cancel</button>
                  <button type="button" className="px-6 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md hover:scale-105 transition">Submit Inquiry</button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

function Card({ title, value, icon }) {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 flex justify-between items-center">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h2 className="text-3xl font-bold mt-1">{value}</h2>
      </div>
      {icon}
    </div>
  );
}