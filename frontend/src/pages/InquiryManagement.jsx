import { useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import {
  Download,
  ChevronRight,
  Calendar,
  X,
} from "lucide-react";

export default function InquiryManagement() {

  const [selectedIndex, setSelectedIndex] = useState(null);

  const inquiries = [
    {
      id: 1,
      product: "Steel Turbine X1",
      name: "Alex Rivera",
      email: "a.rivera@indus.com",
      company: "IndusTech GmbH",
      country: "Germany",
      qty: "500 PCS",
      message:
        "We are looking for a reliable supplier for our Q4 manufacturing cycle.",
      date: "Oct 24, 2:15 PM",
      status: "NEW",
    },
    {
      id: 2,
      product: "Solar Panels V3",
      name: "Chen Wei",
      email: "wei.chen@solar.cn",
      company: "SolarMax China",
      country: "China",
      qty: "1200 PCS",
      message:
        "Interested in bulk order for infrastructure project.",
      date: "Oct 23, 11:30 AM",
      status: "RESPONDED",
    },
    {
      id: 3,
      product: "Copper Wire 10mm",
      name: "Maria Garcia",
      email: "maria.garcia@wire.com",
      company: "WireTech Solutions",
      country: "Spain",
      qty: "2000 PCS",
      message:
        "Requesting samples for quality testing.",
      date: "Oct 22, 4:45 PM",
      status: "NEW",
    },
    {
      id: 4,
      product: "Aluminum Sheets 5mm",
      name: "John Smith",
      email: "john.smith@aluminum.com",
      company: "Aluminum Innovations",
      country: "USA",
      qty: "1500 PCS",
      message:
        "Looking for bulk pricing on aluminum sheets.",
      date: "Oct 21, 9:20 AM",
      status: "NEW",
    },
    {
      id: 5,
      product: "Plastic Granules",
      name: "Sofia Martinez",
      email: "sofia.martinez@plastic.com",
      company: "Plastic Solutions Ltd",
      country: "Mexico",
      qty: "1000 PCS",
      message:
        "Requesting pricing for bulk orders of plastic granules.",
      date: "Oct 20, 3:30 PM",
      status: "NEW",
    },
  ];

  const selected = selectedIndex !== null ? inquiries[selectedIndex] : null;

  return (
    <AdminLayout>

        {/* Header */}
        <div className="flex justify-between items-end mb-6">
          <div>
            <h1 className="text-3xl font-bold">
              Inquiry Management
            </h1>
            <p className="text-gray-500 mt-1">
              You have{" "}
              <span className="text-blue-600 font-bold">
                12 new
              </span>{" "}
              trade inquiries today.
            </p>
          </div>

          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700">
            <Download size={16} />
            Export CSV
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-xl border mb-6 flex gap-4">
          <select className="border rounded-lg px-3 py-2 text-sm">
            <option>All Products</option>
          </select>

          <select className="border rounded-lg px-3 py-2 text-sm">
            <option>All Countries</option>
          </select>

          <div className="relative">
            <Calendar
              size={16}
              className="absolute left-2 top-3 text-gray-400"
            />
            <input
              className="border rounded-lg pl-8 pr-3 py-2 text-sm"
              placeholder="Date"
            />
          </div>
        </div>

        {/* TABLE FULL WIDTH */}
        <div className="bg-white rounded-xl border overflow-hidden">

          <table className="w-full text-sm">

            <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
              <tr>
                <th className="p-4 text-left">Product</th>
                <th className="p-4 text-left">Sender</th>
                <th className="p-4 text-left">Company</th>
                <th className="p-4 text-right">Qty</th>
                <th className="p-4 text-left">Message</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {inquiries.map((item, index) => (
                <tr
                  key={item.id}
                  onClick={() => setSelectedIndex(index)}
                  className="border-t cursor-pointer hover:bg-blue-50 transition"
                >
                  <td className="p-4 font-semibold">
                    {item.product}
                  </td>

                  <td className="p-4">
                    <div>
                      <div className="font-semibold">
                        {item.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {item.email}
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    {item.company}
                  </td>

                  <td className="p-4 text-right font-semibold">
                    {item.qty}
                  </td>

                  <td className="p-4 truncate max-w-xs">
                    {item.message}
                  </td>

                  <td className="p-4 text-xs text-gray-500">
                    {item.date}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-2 py-1 text-xs font-bold rounded-full ${
                        item.status === "NEW"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>

          {/* Pagination */}
          <div className="flex justify-between items-center p-4 border-t bg-gray-50">
            <span className="text-xs text-gray-500">
              Showing 1 to 10 of 48 inquiries
            </span>

            <div className="flex gap-2">
              <button className="px-3 py-1 border rounded text-gray-400 cursor-not-allowed">
                Previous
              </button>

              <button className="px-3 py-1 border rounded bg-blue-600 text-white">
                1
              </button>

              <button className="px-3 py-1 border rounded">
                2
              </button>

              <button className="px-3 py-1 border rounded">
                3
              </button>

              <button className="px-3 py-1 border rounded">
                Next
              </button>
            </div>
          </div>

        </div>

      {/* POPUP DRAWER */}
      {selected && (
        <div className="fixed inset-0 z-50 flex">

          {/* Overlay */}
          <div
            className="flex-1 bg-black/40"
            onClick={() => setSelectedIndex(null)}
          />

          {/* Slide Panel */}
          <div className="w-[450px] bg-white shadow-xl transform transition-transform duration-300 translate-x-0">

            <div className="p-6 border-b flex justify-between items-start">
              <div>
                <h3 className="font-bold text-xl">
                  {selected.product}
                </h3>
                <p className="text-sm text-gray-500">
                  {selected.name} • {selected.company}
                </p>
              </div>

              <button
                onClick={() => setSelectedIndex(null)}
                className="text-gray-500 hover:text-black"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6">
              <h4 className="text-xs text-gray-400 uppercase mb-2">
                Message
              </h4>

              <div className="bg-gray-50 p-4 rounded mb-6">
                {selected.message}
              </div>

              <textarea
                className="w-full border rounded-lg p-3 text-sm mb-3"
                placeholder="Type reply..."
              />

              <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold mb-2 hover:bg-blue-700">
                Send Response
              </button>

              <button className="w-full bg-gray-200 py-2 rounded-lg font-semibold hover:bg-gray-300">
                Archive
              </button>
            </div>

          </div>

        </div>
      )}

    </AdminLayout>
  );
}