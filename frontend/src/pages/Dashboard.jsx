import AdminLayout from "../layout/AdminLayout";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function Dashboard() {
  // 👉 dummy data (replace later with API)
  const stats = {
    categories: 6,
    products: 24,
    inquiries: 102,
  };

  const monthlyData = [
    { month: "Jan", inquiries: 12 },
    { month: "Feb", inquiries: 18 },
    { month: "Mar", inquiries: 9 },
    { month: "Apr", inquiries: 22 },
    { month: "May", inquiries: 30 },
    { month: "Jun", inquiries: 11 },
  ];

  const latestInquiries = [
    { id: 1, product: "Spice Powder", user: "John", country: "USA" },
    { id: 2, product: "Rice Export", user: "Ahmed", country: "UAE" },
    { id: 3, product: "Bricks", user: "Maria", country: "Spain" },
    { id: 4, product: "Food Oil", user: "Lee", country: "China" },
    { id: 5, product: "Wheat", user: "David", country: "UK" },
  ];

  const topProducts = [
    { name: "Spice Powder", count: 28 },
    { name: "Rice Export", count: 21 },
    { name: "Food Oil", count: 17 },
    { name: "Wheat", count: 12 },
  ];

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">
        Dashboard Overview
      </h1>

      {/* === Stats Cards === */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Categories" value={stats.categories} />
        <StatCard title="Total Products" value={stats.products} />
        <StatCard title="Total Inquiries" value={stats.inquiries} />
      </div>

      {/* === Graph + Top Products === */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">

        {/* Graph */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold mb-4">
            Monthly Inquiry Trend
          </h3>

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="inquiries"
                stroke="#2563eb"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top Products */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold mb-4">
            Most Inquired Products
          </h3>

          <ul className="space-y-3">
            {topProducts.map((p, i) => (
              <li
                key={i}
                className="flex justify-between border-b pb-2"
              >
                <span>{p.name}</span>
                <span className="font-semibold">
                  {p.count}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* === Latest Inquiries Table === */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="font-semibold mb-4">
          Latest Inquiries
        </h3>

        <table className="w-full text-sm">
          <thead className="text-left bg-gray-50">
            <tr>
              <th className="p-2">Product</th>
              <th className="p-2">Customer</th>
              <th className="p-2">Country</th>
            </tr>
          </thead>

          <tbody>
            {latestInquiries.map((inq) => (
              <tr key={inq.id} className="border-b">
                <td className="p-2">{inq.product}</td>
                <td className="p-2">{inq.user}</td>
                <td className="p-2">{inq.country}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}

/* reusable stat card */
function StatCard({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}
