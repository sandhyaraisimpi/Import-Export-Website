import { useEffect, useMemo, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import { Pencil, Trash2 } from "lucide-react";

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
    setPage(1);
    return subCategories.filter((s) => {
      const matchName = s.name.toLowerCase().includes(search.toLowerCase());
      const matchParent = parentFilter ? s.parentId === parentFilter : true;
      return matchName && matchParent;
    });
  }, [search, parentFilter, subCategories]);

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  /* ================= ACTIONS ================= */
  const toggleStatus = (id) => {
    saveSubs(subCategories.map((s) =>
      s.id === id ? { ...s, status: !s.status } : s
    ));
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
      saveSubs(subCategories.map((s) =>
        s.id === editId ? { ...s, name, parentId, status: enabled } : s
      ));
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

  /* ================= UI ================= */
  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Sub-Category Management</h1>
        <p className="text-gray-500 text-sm">
          Manage product sub-categories with hierarchy & visibility controls
        </p>
      </div>

      {/* FILTER BAR */}
      <div className="bg-white p-4 rounded-xl shadow mb-5 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search sub-category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-4 py-2 w-72 text-sm"
        />

        <div className="flex gap-3">
          <select
            value={parentFilter}
            onChange={(e) => setParentFilter(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm"
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          <button
            onClick={() => setModal(true)}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm"
          >
            + Add Sub-Category
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 text-left font-medium">Parent Category</th>
              <th className="p-4 text-left font-medium">Sub-Category</th>
              <th className="p-4 text-left font-medium">Products</th>
              <th className="p-4 text-left font-medium">Status</th>
              <th className="p-4 text-right font-medium">Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.map((s) => {
              const parent = categories.find((c) => c.id === s.parentId);

              return (
                <tr key={s.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <span className="bg-gray-100 px-3 py-1 rounded-full text-xs">
                      {parent?.name}
                    </span>
                  </td>

                  <td className="p-4 font-medium">{s.name}</td>
                  <td className="p-4 text-gray-600">{s.items}</td>

                  <td className="p-4">
                    <button
                      onClick={() => toggleStatus(s.id)}
                      className={`w-11 h-6 flex items-center rounded-full p-1 transition ${
                        s.status ? "bg-blue-600" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`bg-white w-4 h-4 rounded-full transform transition ${
                          s.status ? "translate-x-5" : ""
                        }`}
                      />
                    </button>
                  </td>

                  <td className="p-4 text-right flex justify-end gap-4">
                    <button
                      onClick={() => openEdit(s)}
                      className="text-blue-600 hover:scale-110 transition"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => deleteSub(s.id)}
                      className="text-red-600 hover:scale-110 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div className="flex justify-between items-center p-4 text-sm">
          <span className="text-gray-500">
            Page {page} of {totalPages}
          </span>

          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-3 py-1 border rounded disabled:opacity-40"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-3 py-1 rounded border ${
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
              className="px-3 py-1 border rounded disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {modal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4">
              {editId ? "Edit Sub-Category" : "Add Sub-Category"}
            </h2>

            <input
              className="w-full border rounded-lg px-3 py-2 mb-3 text-sm"
              placeholder="Sub-category name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <select
              className="w-full border rounded-lg px-3 py-2 mb-4 text-sm"
              value={parentId}
              onChange={(e) => setParentId(e.target.value)}
            >
              <option value="">Select Parent Category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>

            <label className="flex items-center gap-2 mb-5 text-sm">
              <input
                type="checkbox"
                checked={enabled}
                onChange={() => setEnabled(!enabled)}
              />
              Active
            </label>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setModal(false);
                  resetForm();
                }}
                className="border px-4 py-2 rounded-lg text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
