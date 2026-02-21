import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/user/sidebar";
import Header from "../../components/user/Header";
import {
  PlusCircle,
  Truck,
  X,
  Package,
  Calendar,
  Hash,
  Search,
} from "lucide-react";

export default function OrderManagement() {
  const navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortOrder, setSortOrder] = useState("Newest");
  const [currentPage, setCurrentPage] = useState(1);

  const ordersPerPage = 4;

  const [orders, setOrders] = useState([
    { id: "ORD001", product: "Laptop", date: "2026-02-15", quantity: 2, status: "Processing" },
    { id: "ORD002", product: "Textile Fabrics", date: "2026-02-14", quantity: 10, status: "Shipped" },
    { id: "ORD003", product: "Electronics", date: "2026-02-13", quantity: 1, status: "Delivered" },
    { id: "ORD004", product: "Furniture", date: "2026-02-12", quantity: 5, status: "Processing" },
    { id: "ORD005", product: "Mobile", date: "2026-02-10", quantity: 3, status: "Cancelled" },
  ]);

  const statusColor = (status) => {
    if (status === "Processing") return "bg-yellow-100 text-yellow-600 animate-pulse";
    if (status === "Shipped") return "bg-purple-100 text-purple-600";
    if (status === "Delivered") return "bg-green-100 text-green-600";
    if (status === "Cancelled") return "bg-red-100 text-red-600";
  };

  const filteredOrders = useMemo(() => {
    let data = orders.filter((order) =>
      (filterStatus === "All" || order.status === filterStatus) &&
      order.product.toLowerCase().includes(search.toLowerCase())
    );

    data.sort((a, b) =>
      sortOrder === "Newest"
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date)
    );

    return data;
  }, [orders, filterStatus, search, sortOrder]);

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  const cancelOrder = (id) => {
    setOrders(
      orders.map((o) =>
        o.id === id ? { ...o, status: "Cancelled" } : o
      )
    );
  };

  return (
    <>
      <div className="flex min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
        <Sidebar />

        <div className="flex-1 ml-64 mt-16 p-8 space-y-8">
          <Header />

          <div className="space-y-8">

            {/* Top */}
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">My Orders</h1>
              <button
                onClick={() => navigate("/maincategory")}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-3 rounded-2xl shadow-lg hover:scale-105 transition"
              >
                <PlusCircle size={18} /> New Order
              </button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: "Total Orders", value: orders.length },
                { label: "Processing", value: orders.filter(o => o.status === "Processing").length },
                { label: "Delivered", value: orders.filter(o => o.status === "Delivered").length },
              ].map((card, index) => (
                <div key={index} className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition">
                  <p className="text-gray-500 text-sm">{card.label}</p>
                  <h2 className="text-2xl font-bold">{card.value}</h2>
                </div>
              ))}
            </div>

            {/* Filters */}
            <div className="bg-white p-5 rounded-2xl shadow-xl space-y-4">

              <div className="flex flex-wrap gap-3">
                {["All", "Processing", "Shipped", "Delivered", "Cancelled"].map((status) => (
                  <button
                    key={status}
                    onClick={() => { setFilterStatus(status); setCurrentPage(1); }}
                    className={`px-4 py-2 rounded-full text-sm transition ${
                      filterStatus === status
                        ? "bg-black text-white shadow-md"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 items-center justify-between">
                <div className="flex items-center gap-2 border px-4 py-2 rounded-xl">
                  <Search size={18} />
                  <input
                    type="text"
                    placeholder="Search product..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="outline-none"
                  />
                </div>

                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="px-4 py-2 border rounded-xl"
                >
                  <option value="Newest">Newest</option>
                  <option value="Oldest">Oldest</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white p-6 rounded-3xl shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-gray-500 border-b">
                      <th className="pb-3 text-left">Order ID</th>
                      <th className="pb-3 text-left">Product</th>
                      <th className="pb-3 text-left">Qty</th>
                      <th className="pb-3 text-left">Date</th>
                      <th className="pb-3 text-left">Status</th>
                      <th className="pb-3 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedOrders.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center py-12 text-gray-400">
                          <Package size={40} className="mx-auto mb-3 opacity-40" />
                          No orders found
                        </td>
                      </tr>
                    ) : (
                      paginatedOrders.map((order) => (
                        <tr key={order.id} className="border-b hover:bg-gray-50 transition">
                          <td className="py-3 font-medium">{order.id}</td>
                          <td>{order.product}</td>
                          <td>{order.quantity}</td>
                          <td>{order.date}</td>
                          <td>
                            <button
                              onClick={() => setSelectedOrder(order)}
                              className={`px-3 py-1 rounded-full text-xs font-medium transition hover:scale-105 ${statusColor(order.status)}`}
                            >
                              {order.status}
                            </button>
                          </td>
                          <td>
                            {order.status !== "Delivered" && order.status !== "Cancelled" && (
                              <button
                                onClick={() => cancelOrder(order.id)}
                                className="text-red-500 text-xs hover:underline"
                              >
                                Cancel
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-end gap-2 mt-6">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="px-3 py-1 bg-gray-100 rounded disabled:opacity-50"
                  >
                    Prev
                  </button>
                  <span className="px-3 py-1 bg-black text-white rounded">
                    {currentPage}
                  </span>
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="px-3 py-1 bg-gray-100 rounded disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-lg rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.15)] p-8 relative">

              <button
                onClick={() => setSelectedOrder(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-black"
              >
                <X />
              </button>

              <h2 className="text-2xl font-bold mb-6">Order Details</h2>

              <div className="space-y-4 text-sm">
                <div className="flex items-center gap-3">
                  <Hash size={18} />
                  <span><strong>ID:</strong> {selectedOrder.id}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Package size={18} />
                  <span><strong>Product:</strong> {selectedOrder.product}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar size={18} />
                  <span><strong>Date:</strong> {selectedOrder.date}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Truck size={18} />
                  <span><strong>Status:</strong> {selectedOrder.status}</span>
                </div>

                <button className="mt-6 w-full py-3 bg-black text-white rounded-xl hover:opacity-90 transition">
                  Download Invoice
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

