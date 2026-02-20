import { useState } from "react";
import Sidebar from "../../components/user/sidebar";
import Header from "../../components/user/Header";
import {
  PlusCircle,
  ClipboardList,
  Clock,
  Loader,
  CheckCircle,
  Truck,
} from "lucide-react";

export default function OrderManagement() {
  const [openForm, setOpenForm] = useState(false);

  // 🔹 Static Orders Data
  const orders = [
    { id: "ORD001", product: "Laptop", date: "2026-02-15", quantity: 2, status: "Processing" },
    { id: "ORD002", product: "Textile Fabrics", date: "2026-02-14", quantity: 10, status: "Shipped" },
    { id: "ORD003", product: "Electronics", date: "2026-02-13", quantity: 1, status: "Delivered" },
    { id: "ORD004", product: "Furniture", date: "2026-02-12", quantity: 5, status: "Processing" },
  ];

  const statusColor = (status) => {
    if (status === "Processing") return "bg-yellow-100 text-yellow-600";
    if (status === "Shipped") return "bg-purple-100 text-purple-600";
    if (status === "Delivered") return "bg-green-100 text-green-600";
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 ml-64 mt-16 p-8 space-y-8"> {/* mt-16 for header */}
        
        {/* Header */}
        <Header />

        {/* Orders Section */}
        <div className="space-y-6">

          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">My Orders</h1>
            <button
              onClick={() => setOpenForm(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-3 rounded-2xl shadow-md hover:scale-105 transition"
            >
              <PlusCircle size={18} /> New Order
            </button>
          </div>

          {/* Orders Table */}
          <div className="bg-white p-6 rounded-3xl shadow-lg border">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-500 border-b">
                    <th className="pb-3 text-left">Order ID</th>
                    <th className="pb-3 text-left">Product</th>
                    <th className="pb-3 text-left">Quantity</th>
                    <th className="pb-3 text-left">Date</th>
                    <th className="pb-3 text-left">Status</th>
                    <th className="pb-3 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50 transition">
                      <td className="py-3">{order.id}</td>
                      <td>{order.product}</td>
                      <td>{order.quantity}</td>
                      <td>{order.date}</td>
                      <td>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td>
                        <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs flex items-center gap-1">
                          <Truck size={14} /> Track
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>

      {/* 🔹 Optional Modal for New Order (Static) */}
      {openForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-8 relative animate-fadeIn">

            <button
              onClick={() => setOpenForm(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black"
            >
              X
            </button>

            <h2 className="text-2xl font-bold mb-6">Create New Order</h2>

            <form className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-1">Product Name</label>
                <input type="text" placeholder="Enter product" className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Quantity</label>
                <input type="number" placeholder="Enter quantity" className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none">
                  <option>Electronics</option>
                  <option>Textiles</option>
                  <option>Furniture</option>
                  <option>Others</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setOpenForm(false)} className="px-5 py-2 rounded-xl border">Cancel</button>
                <button type="button" className="px-6 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md hover:scale-105 transition">Submit Order</button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}