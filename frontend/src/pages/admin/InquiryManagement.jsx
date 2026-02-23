import { useState } from "react";
import AdminLayout from "../../layout/AdminLayout";
import {
  Inbox,
  Clock,
  CheckCircle,
  Search,
  Eye,
  Trash2,
  ChevronLeft,
  ChevronRight,
  X,
  TrendingUp,
  Reply,
  CheckCircle2,
  FileDown,
} from "lucide-react";

export default function InquiryManagement() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);

  const inquiries = [
    {
      id: "#INQ-9281",
      product: "Steel Turbine X1",
      name: "Alex Rivera",
      company: "IndusTech GmbH",
      country: "Germany",
      qty: "500 PCS",
      message:
        "We are looking for a reliable supplier for our Q4 manufacturing cycle.",
      date: "Oct 24, 2:15 PM",
      status: "NEW",
    },
    {
      id: "#INQ-9275",
      product: "Solar Panels V3",
      name: "Chen Wei",
      company: "SolarMax China",
      country: "China",
      qty: "1200 PCS",
      message: "Interested in bulk order for infrastructure project.",
      date: "Oct 23, 11:30 AM",
      status: "RESPONDED",
    },
  ];

  const toggleSelect = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const selected =
    selectedIndex !== null ? inquiries[selectedIndex] : null;

  return (
    <AdminLayout>
      <div className="space-y-8">

        {/* PAGE TITLE */}
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Inquiry Management
          </h1>
          <p className="text-gray-500 text-sm">
            Manage and track global product inquiries efficiently.
          </p>
        </div>

        {/* STAT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            icon={<Inbox size={22} />}
            title="Total Inquiries"
            value="1,284"
            badge="12%"
            badgeIcon={<TrendingUp size={14} />}
            badgeColor="text-green-600 bg-green-50"
          />
          <StatCard
            icon={<Clock size={22} />}
            title="Pending Requests"
            value="42"
            badge="New"
            badgeColor="text-amber-600 bg-amber-50"
          />
          <StatCard
            icon={<CheckCircle size={22} />}
            title="Responded Today"
            value="156"
          />
        </div>

        {/* MAIN CONTENT */}
        <div className="flex gap-6">

          {/* TABLE SECTION */}
          <div className="flex-1 bg-white rounded-xl shadow border overflow-hidden flex flex-col">

            {/* FILTER HEADER */}
            <div className="flex justify-between items-center px-6 py-4 border-b bg-gray-50">
              <div className="flex gap-2">
                <button className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-xs font-semibold">
                  All
                </button>
                <button className="px-4 py-1.5 rounded-full text-xs text-gray-500 hover:bg-gray-100">
                  New
                </button>
                <button className="px-4 py-1.5 rounded-full text-xs text-gray-500 hover:bg-gray-100">
                  Responded
                </button>
              </div>

              <div className="relative w-64">
                <Search
                  size={16}
                  className="absolute left-3 top-2.5 text-gray-400"
                />
                <input
                  placeholder="Search..."
                  className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            {/* TABLE */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-400 uppercase text-xs border-b">
                  <tr>
                    <th className="p-4"></th>
                    <th className="p-4 text-left">Inquiry ID</th>
                    <th className="p-4 text-left">Product</th>
                    <th className="p-4 text-left">Buyer / Company</th>
                    <th className="p-4 text-left">Country</th>
                    <th className="p-4 text-left">Status</th>
                    <th className="p-4 text-left">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {inquiries.map((item, index) => (
                    <tr
                      key={item.id}
                      className="border-b hover:bg-blue-50 transition group"
                    >
                      <td className="p-4">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item.id)}
                          onChange={() => toggleSelect(item.id)}
                        />
                      </td>

                      <td className="p-4 font-mono text-blue-600 font-medium">
                        {item.id}
                      </td>

                      <td className="p-4 font-medium">
                        {item.product}
                      </td>

                      <td className="p-4">
                        <div className="font-semibold">
                          {item.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {item.company}
                        </div>
                      </td>

                      <td className="p-4">{item.country}</td>

                      <td className="p-4">
                        <span
                          className={`px-2 py-1 text-xs rounded-full font-semibold ${
                            item.status === "NEW"
                              ? "bg-blue-100 text-blue-600"
                              : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>

                      <td className="p-4 flex gap-3 opacity-0 group-hover:opacity-100 transition">
                        <button
                          onClick={() => setSelectedIndex(index)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Eye size={18} />
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* PAGINATION */}
            <div className="flex justify-between items-center px-6 py-4 bg-gray-50 border-t text-sm">
              <p className="text-gray-500">
                Showing 1-2 of {inquiries.length}
              </p>
              <div className="flex gap-2">
                <button className="border rounded px-3 py-1">
                  <ChevronLeft size={16} />
                </button>
                <button className="bg-blue-600 text-white px-3 py-1 rounded">
                  1
                </button>
                <button className="border rounded px-3 py-1">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT DETAIL PANEL */}
          {selected && (
            <div className="w-[380px] bg-white rounded-xl shadow-xl border p-6 space-y-6 sticky top-6 h-fit">
              <div className="flex justify-between">
                <h3 className="font-bold text-lg">
                  Inquiry Details
                </h3>
                <button onClick={() => setSelectedIndex(null)}>
                  <X size={18} />
                </button>
              </div>

              <div>
                <p className="text-xs text-gray-400 uppercase">
                  Reference
                </p>
                <p className="font-mono font-bold text-blue-600">
                  {selected.id}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400 uppercase mb-2">
                  Customer
                </p>
                <p className="font-semibold">{selected.name}</p>
                <p className="text-sm text-gray-500">
                  {selected.company}
                </p>
                <p className="text-sm text-gray-500">
                  {selected.country}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400 uppercase mb-2">
                  Message
                </p>
                <div className="bg-gray-50 p-4 rounded text-sm italic">
                  "{selected.message}"
                </div>
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg flex justify-center gap-2">
                <Reply size={16} />
                Mark as Responded
              </button>
            </div>
          )}
        </div>

        {/* BULK ACTION BAR */}
        {selectedItems.length > 0 && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-4xl px-6">
            <div className="bg-white shadow-2xl border rounded-2xl px-6 py-4 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 text-blue-600 rounded-full w-10 h-10 flex items-center justify-center font-bold">
                  {selectedItems.length}
                </div>
                <div>
                  <p className="font-bold text-sm">
                    Items Selected
                  </p>
                  <p className="text-xs text-gray-500">
                    Bulk actions available
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 size={16} />
                  Respond
                </button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2">
                  <FileDown size={16} />
                  Export
                </button>
                <button className="bg-red-500 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2">
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>

              <button
                onClick={() => setSelectedItems([])}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

/* STAT CARD */
function StatCard({ icon, title, value, badge, badgeIcon, badgeColor }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow border flex items-center gap-4">
      <div className="bg-blue-50 text-blue-600 p-3 rounded-lg">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
      </div>
      {badge && (
        <div
          className={`ml-auto text-xs font-semibold px-2 py-1 rounded ${badgeColor}`}
        >
          {badgeIcon} {badge}
        </div>
      )}
    </div>
  );
}