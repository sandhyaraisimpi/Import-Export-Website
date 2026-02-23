import AdminLayout from "../../layout/AdminLayout";
import {
  LineChart,
  AreaChart,
  Area,
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
  Factory,
  Shirt,
  Sun,
  Anchor,
} from "lucide-react";


export default function Dashboard() {

  const stats = [
    {
      title: "Total Categories",
      value: 124,
      icon: LayoutGrid,
      change: "+12%",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Sub Categories",
      value: 458,
      icon: FolderTree,
      change: "+5%",
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      title: "Active Products",
      value: "12,840",
      icon: Package,
      change: "+18%",
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      title: "New Inquiries",
      value: 86,
      icon: MessageSquare,
      change: "+24%",
      color: "text-orange-600",
      bg: "bg-orange-50",
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

  const topInquiredProducts = [
    { name: "Industrial Pumps V3", category: "Machinery", requests: 156, icon: Factory },
    { name: "Organic Cotton Fabric", category: "Textiles", requests: 112, icon: Shirt },
    { name: "Solar Panel - Mono", category: "Energy", requests: 98, icon: Sun },
    { name: "Marine Gearbox X4", category: "Maritime", requests: 84, icon: Anchor },
  ];

  return (
    <AdminLayout>



        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              Dashboard Overview
            </h1>
            <p className="text-slate-500 mt-1">
              Real-time insights into your import-export operations
            </p>
          </div>

          <div className="flex gap-3 mt-4 md:mt-0">
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl bg-white hover:bg-slate-100 shadow-sm text-sm font-medium">
              <Download size={16} />
              Export Data
            </button>

            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 text-sm font-medium">
              <Plus size={16} />
              New Product
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition"
              >
                <div className="flex justify-between items-center mb-5">
                  <div className={`p-3 rounded-xl ${stat.bg}`}>
                    <Icon className={`${stat.color}`} size={22} />
                  </div>

                  <span className="text-xs font-semibold bg-emerald-100 text-emerald-600 px-2 py-1 rounded-full">
                    {stat.change}
                  </span>
                </div>

                <p className="text-slate-500 text-xs uppercase tracking-wide">
                  {stat.title}
                </p>

                <h2 className="text-3xl font-bold mt-2 text-slate-800">
                  {stat.value}
                </h2>
              </div>
            );
          })}
        </div>


        {/* Top Section */}
        <div className="grid xl:grid-cols-3 gap-6 mb-8">

          {/* Recent Inquiries */}
          <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100 bg-slate-50">
              <h3 className="font-semibold text-slate-800">
                Recent Inquiries
              </h3>
              <button className="text-blue-600 text-sm font-medium">
                View All
              </button>
            </div>

            <table className="w-full text-sm">
              <thead className="text-slate-500 uppercase text-xs bg-white">
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
                  <tr key={item.id} className="border-t border-slate-100 hover:bg-slate-50 transition">
                    <td className="p-4 font-medium text-slate-700">{item.company}</td>
                    <td className="p-4 text-slate-600">{item.subject}</td>
                    <td className="p-4 text-slate-500">{item.date}</td>
                    <td className="p-4">
                      <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-600">
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button>
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>


          {/* Recently Added */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 font-semibold text-slate-800">
              Recently Added
            </div>

            <div className="p-5 space-y-4">
              {recentProducts.map((product, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center hover:bg-slate-50 p-3 rounded-xl transition cursor-pointer"
                >
                  <div>
                    <p className="font-medium text-slate-700">{product.name}</p>
                    <p className="text-xs text-slate-500">Added {product.time}</p>
                    <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded mt-1 inline-block">
                      {product.category}
                    </span>
                  </div>
                  <MoreVertical size={16} />
                </div>
              ))}
            </div>
          </div>
        </div>


        {/* Chart + Top Products */}
<div className="grid xl:grid-cols-3 gap-6">

  {/* Gradient Area Chart */}
  <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 h-[420px] flex flex-col">

    <h3 className="font-semibold text-slate-800 mb-6">
      Monthly Inquiry Trend
    </h3>

    <div className="flex-1">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={monthlyData}>

          <defs>
            <linearGradient id="colorInquiry" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563eb" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#2563eb" stopOpacity={0.05} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />

          <XAxis
            dataKey="month"
            stroke="#94a3b8"
            tick={{ fontSize: 12 }}
          />

          <YAxis
            stroke="#94a3b8"
            tick={{ fontSize: 12 }}
          />

          <Tooltip
            contentStyle={{
              borderRadius: "12px",
              border: "1px solid #e2e8f0",
            }}
          />

          <Area
            type="monotone"
            dataKey="inquiries"
            stroke="#2563eb"
            strokeWidth={3}
            fill="url(#colorInquiry)"
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />

        </AreaChart>
      </ResponsiveContainer>
    </div>

  </div>


  {/* Top Inquired Products */}
  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[420px]">

    <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
      <h3 className="font-semibold text-slate-800">
        Top Inquired Products
      </h3>
    </div>

    <div className="p-5 space-y-4 flex-1 overflow-y-auto">

      {topInquiredProducts.map((product, index) => {
        const Icon = product.icon;

        return (
          <div
            key={index}
            className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-xl transition cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
              <Icon size={18} className="text-slate-500" />
            </div>

            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-800">
                {product.name}
              </p>
              <p className="text-xs text-slate-500">
                Category: {product.category}
              </p>
            </div>

            <div className="text-right">
              <p className="text-sm font-bold text-slate-800">
                {product.requests}
              </p>
              <p className="text-[10px] text-slate-400 uppercase font-semibold">
                Requests
              </p>
            </div>
          </div>
        );
      })}

    </div>

    <div className="p-4 border-t border-slate-100">
      <button className="w-full py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-semibold text-slate-700 transition">
        DOWNLOAD PRODUCT REPORT
      </button>
    </div>

  </div>

</div>

    </AdminLayout>
  );
}