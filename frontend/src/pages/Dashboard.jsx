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

import {
  Package,
  FolderTree,
  MessageSquare,
  LayoutGrid,
  Download,
  Plus,
  MoreVertical,
} from "lucide-react";

export default function Dashboard() {

  const stats = [
    {
      title: "Total Categories",
      value: 124,
      icon: LayoutGrid,
      change: "+12%",
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      title: "Sub Categories",
      value: 458,
      icon: FolderTree,
      change: "+5%",
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
    {
      title: "Active Products",
      value: "12,840",
      icon: Package,
      change: "+18%",
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      title: "New Inquiries",
      value: 86,
      icon: MessageSquare,
      change: "+24%",
      color: "text-orange-600",
      bg: "bg-orange-100",
    },
  ];

  const monthlyData = [
    { month: "Jan", inquiries: 12 },
    { month: "Feb", inquiries: 18 },
    { month: "Mar", inquiries: 9 },
    { month: "Apr", inquiries: 22 },
    { month: "May", inquiries: 30 },
    { month: "Jun", inquiries: 11 },
    { month: "Jul", inquiries: 27 },
    { month: "Aug", inquiries: 19 },
    { month: "Sep", inquiries: 25 },
    { month: "Oct", inquiries: 32 },
    { month: "Nov", inquiries: 14 },
    { month: "Dec", inquiries: 28 },
  ];

  const recentInquiries = [
    {
      id: 1,
      company: "Global Krafts Co.",
      subject: "Bulk container inquiry",
      date: "Oct 24, 2023",
      status: "New",
    },
    {
      id: 2,
      company: "Apex Logistics",
      subject: "Machinery export quote",
      date: "Oct 23, 2023",
      status: "Read",
    },
    {
      id: 3,
      company: "Raw Material Inc.",
      subject: "Sample request",
      date: "Oct 22, 2023",
      status: "Responded",
    },
  ];

  const recentProducts = [
    {
      name: "Premium Basmati Rice",
      category: "Grains",
      time: "2 hours ago",
    },
    {
      name: "Hydraulic Press X200",
      category: "Machinery",
      time: "5 hours ago",
    },
    {
      name: "Organic Turmeric",
      category: "Spices",
      time: "1 day ago",
    },
  ];

  return (
    <AdminLayout>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">

        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Overview Dashboard
          </h1>

          <p className="text-gray-500 text-sm">
            Manage your import-export operations and inquiries
          </p>
        </div>

        <div className="flex gap-3 mt-4 md:mt-0">

          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg bg-white hover:bg-gray-50 shadow-sm">
            <Download size={18} />
            Export Data
          </button>

          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
            <Plus size={18} />
            New Product
          </button>

        </div>

      </div>


      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

        {stats.map((stat, index) => {

          const Icon = stat.icon;

          return (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm border hover:border-blue-400 transition"
            >

              <div className="flex justify-between items-center mb-4">

                <div className={`p-3 rounded-lg ${stat.bg}`}>
                  <Icon className={`${stat.color}`} size={24} />
                </div>

                <span className="text-green-600 text-xs font-semibold bg-green-100 px-2 py-1 rounded-full">
                  {stat.change}
                </span>

              </div>

              <p className="text-gray-500 text-sm uppercase">
                {stat.title}
              </p>

              <h2 className="text-3xl font-bold mt-1">
                {stat.value}
              </h2>

            </div>
          );
        })}

      </div>



      {/* Main section */}
      <div className="grid xl:grid-cols-3 gap-6">

        {/* Recent inquiries */}
        <div className="xl:col-span-2 bg-white rounded-xl shadow border">

          <div className="flex justify-between items-center p-5 border-b bg-gray-50">
            <h3 className="font-semibold">
              Recent Inquiries
            </h3>

            <button className="text-blue-600 text-sm font-medium">
              View All
            </button>
          </div>


          <table className="w-full text-sm">

            <thead className="text-gray-500 uppercase text-xs">

              <tr>
                <th className="p-4 text-left">Company</th>
                <th className="p-4 text-left">Subject</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>

            </thead>


            <tbody>

              {recentInquiries.map((item) => (

                <tr key={item.id} className="border-t hover:bg-gray-50">

                  <td className="p-4 font-medium">
                    {item.company}
                  </td>

                  <td className="p-4 text-gray-600">
                    {item.subject}
                  </td>

                  <td className="p-4 text-gray-500">
                    {item.date}
                  </td>

                  <td className="p-4">

                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-600">
                      {item.status}
                    </span>

                  </td>

                  <td className="p-4 text-right">

                    <button>
                      <MoreVertical size={18} />
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>


        {/* Recently added products */}
        <div className="bg-white rounded-xl shadow border flex flex-col">

          <div className="p-5 border-b bg-gray-50 font-semibold">
            Recently Added
          </div>

          <div className="p-4 space-y-4">

            {recentProducts.map((product, index) => (

              <div
                key={index}
                className="flex justify-between items-center hover:bg-gray-50 p-3 rounded-lg cursor-pointer"
              >

                <div>

                  <p className="font-medium">
                    {product.name}
                  </p>

                  <p className="text-xs text-gray-500">
                    Added {product.time}
                  </p>

                  <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
                    {product.category}
                  </span>

                </div>

                <MoreVertical size={18} />

              </div>

            ))}

          </div>


          <div className="p-4 border-t">

            <button className="w-full py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium">
              View Full Inventory
            </button>

          </div>

        </div>


      </div>


      {/* Chart */}
      <div className="bg-white p-6 rounded-xl shadow border mt-6">

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


    </AdminLayout>
  );
}