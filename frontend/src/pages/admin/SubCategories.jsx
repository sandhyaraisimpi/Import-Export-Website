import { useEffect, useMemo, useState } from "react";
import AdminLayout from "../../layout/AdminLayout";
import {
  Pencil,
  Trash2,
  Plus,
  Download,
  Settings2,
  BarChart3,
  CheckCircle2,
  AlertTriangle,
  X,
} from "lucide-react";

const PAGE_SIZE = 5;

export default function SubCategories() {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const [search, setSearch] = useState("");
  const [parentFilter, setParentFilter] = useState("");
  const [page, setPage] = useState(1);

  const [modal, setModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const [name, setName] = useState("");
  const [parentId, setParentId] = useState("");
  const [enabled, setEnabled] = useState(true);

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    const cats =
      JSON.parse(localStorage.getItem("categories")) || [
        { id: "1", name: "Electronics & Tech" },
        { id: "2", name: "Heavy Machinery" },
        { id: "3", name: "Textiles & Apparel" },
        { id: "4", name: "Chemicals & Raw Materials" },
      ];

    const subs =
      JSON.parse(localStorage.getItem("subCategories")) || [
        { id: 1, name: "Semiconductors & Chips", parentId: "1", items: 1204, status: true },
        { id: 2, name: "Excavators & Drills", parentId: "2", items: 850, status: true },
        { id: 3, name: "Raw Silk Imports", parentId: "3", items: 432, status: false },
        { id: 4, name: "Industrial Polymers", parentId: "4", items: 2110, status: true },
        { id: 5, name: "Renewable Energy Cells", parentId: "1", items: 67, status: true },
        { id: 6, name: "Printed Circuit Boards", parentId: "1", items: 312, status: true },
      ];

    setCategories(cats);
    setSubCategories(subs);

    localStorage.setItem("categories", JSON.stringify(cats));
    localStorage.setItem("subCategories", JSON.stringify(subs));
  }, []);

  const saveSubs = (data) => {
    setSubCategories(data);
    localStorage.setItem("subCategories", JSON.stringify(data));
  };

  /* ================= FILTER ================= */
  const filtered = useMemo(() => {
    return subCategories.filter((s) => {
      const matchName = s.name.toLowerCase().includes(search.toLowerCase());
      const matchParent = parentFilter ? s.parentId === parentFilter : true;
      return matchName && matchParent;
    });
  }, [search, parentFilter, subCategories]);

  useEffect(() => {
    setPage(1);
  }, [search, parentFilter]);

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const startIndex = (page - 1) * PAGE_SIZE;
  const paginatedData = filtered.slice(startIndex, startIndex + PAGE_SIZE);

  /* ================= ACTIONS ================= */
  const toggleStatus = (id) => {
    saveSubs(
      subCategories.map((s) =>
        s.id === id ? { ...s, status: !s.status } : s
      )
    );
  };

  const deleteSub = (id) => {
    if (!window.confirm("Delete this sub-category?")) return;
    saveSubs(subCategories.filter((s) => s.id !== id));
  };

  const openEdit = (s) => {
    setEditId(s.id);
    setName(s.name);
    setParentId(s.parentId);
    setEnabled(s.status);
    setModal(true);
  };

  const resetForm = () => {
    setEditId(null);
    setName("");
    setParentId("");
    setEnabled(true);
  };

  const handleSave = () => {
    if (!name || !parentId) return;

    if (editId) {
      saveSubs(
        subCategories.map((s) =>
          s.id === editId ? { ...s, name, parentId, status: enabled } : s
        )
      );
    } else {
      saveSubs([
        ...subCategories,
        {
          id: Date.now(),
          name,
          parentId,
          items: Math.floor(Math.random() * 2000),
          status: enabled,
        },
      ]);
    }

    setModal(false);
    resetForm();
  };

  /* ================= STATS ================= */
  const total = subCategories.length;
  const active = subCategories.filter((s) => s.status).length;
  const inactive = subCategories.filter((s) => !s.status).length;

  /* ================= UI ================= */
  return (
    <AdminLayout>
      {/* HEADER */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Sub-Category Management
          </h1>
          <p className="text-gray-500 mt-1">
            Organize your trade products into specialized sub-hierarchies.
          </p>
        </div>

        <button
          onClick={() => setModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold shadow hover:bg-blue-700 transition"
        >
          <Plus size={18} />
          Add Sub-Category
        </button>
      </div>

      {/* FILTER TOOLBAR */}
      <div className="bg-white rounded-xl border shadow-sm mb-6">
        <div className="p-5 border-b flex flex-wrap gap-6 items-end bg-gray-50/60">

          <div>
            <label className="block text-xs font-bold uppercase text-gray-400 mb-1">
              Parent Category
            </label>
            <select
              value={parentFilter}
              onChange={(e) => setParentFilter(e.target.value)}
              className="border rounded-lg px-4 py-2 text-sm w-60 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-gray-400 mb-1">
              Sub-Category Name
            </label>
            <input
              type="text"
              placeholder="Filter by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded-lg px-4 py-2 text-sm w-60 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={() => {
              setSearch("");
              setParentFilter("");
            }}
            className="flex items-center gap-1 text-sm text-blue-600 font-semibold hover:underline"
          >
            <X size={14} /> Clear Filters
          </button>

          <div className="ml-auto flex gap-2">
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
              <Download size={18} />
            </button>
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
              <Settings2 size={18} />
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-bold tracking-wider">
              <tr>
                <th className="px-6 py-4 text-left">Parent Category</th>
                <th className="px-6 py-4 text-left">Sub-Category Name</th>
                <th className="px-6 py-4 text-left">Products</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {paginatedData.map((s) => {
                const parent = categories.find((c) => c.id === s.parentId);

                return (
                  <tr key={s.id} className="hover:bg-gray-50 group transition">
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-xs bg-gray-100">
                        {parent?.name}
                      </span>
                    </td>

                    <td className="px-6 py-4 font-semibold">
                      {s.name}
                    </td>

                    <td className="px-6 py-4 text-gray-500">
                      {s.items.toLocaleString()}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => toggleStatus(s.id)}
                          className={`relative w-11 h-6 rounded-full transition ${
                            s.status ? "bg-blue-600" : "bg-gray-300"
                          }`}
                        >
                          <span
                            className={`absolute top-[2px] left-[2px] w-5 h-5 bg-white rounded-full transition ${
                              s.status ? "translate-x-5" : ""
                            }`}
                          />
                        </button>
                        <span className="text-xs font-semibold text-gray-500">
                          {s.status ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition">
                        <button
                          onClick={() => openEdit(s)}
                          className="p-2 rounded-md hover:bg-blue-50 text-gray-500 hover:text-blue-600"
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          onClick={() => deleteSub(s.id)}
                          className="p-2 rounded-md hover:bg-red-50 text-gray-500 hover:text-red-600"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="px-6 py-4 border-t flex justify-between items-center bg-gray-50/40 text-sm">
          <p className="text-gray-500">
            Showing{" "}
            <span className="font-bold text-black">
              {startIndex + 1}-{Math.min(startIndex + PAGE_SIZE, filtered.length)}
            </span>{" "}
            of{" "}
            <span className="font-bold text-black">{filtered.length}</span>
          </p>

          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-3 py-1 border rounded-lg disabled:opacity-40"
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-8 h-8 rounded-lg text-sm font-bold ${
                  page === i + 1
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-3 py-1 border rounded-lg disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <StatCard
          icon={<BarChart3 size={22} />}
          label="Total Sub-Categories"
          value={total}
          color="blue"
        />
        <StatCard
          icon={<CheckCircle2 size={22} />}
          label="Active"
          value={active}
          color="green"
        />
        <StatCard
          icon={<AlertTriangle size={22} />}
          label="Inactive"
          value={inactive}
          color="orange"
        />
      </div>
    </AdminLayout>
  );
}

/* ================= STAT CARD ================= */

function StatCard({ icon, label, value, color }) {
  const colors = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    orange: "bg-orange-50 text-orange-600",
  };

  return (
    <div className="bg-white border rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <div className={`p-3 rounded-lg ${colors[color]}`}>
          {icon}
        </div>
        <span className="text-xs uppercase text-gray-400 font-bold">
          Overview
        </span>
      </div>

      <h4 className="text-2xl font-extrabold">{value}</h4>
      <p className="text-sm text-gray-500 mt-1">{label}</p>
    </div>
  );
}