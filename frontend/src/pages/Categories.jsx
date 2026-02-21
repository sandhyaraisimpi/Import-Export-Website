import { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import { Pencil, Trash2 } from "lucide-react";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [parentId, setParentId] = useState("");
  const [description, setDescription] = useState("");
  const [enabled, setEnabled] = useState(true);

  /* ================= PAGINATION ================= */
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;

  /* ================= INIT DATA ================= */
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("categories")) || [];

    if (saved.length === 0) {
      const dummy = [
        { id: 1, name: "Consumer Electronics", products: 248, status: "Active", created: "Oct 12, 2023" },
        { id: 2, name: "Textiles & Apparel", products: 120, status: "Active", created: "Sep 28, 2023" },
        { id: 3, name: "Industrial Machinery", products: 86, status: "Inactive", created: "Aug 15, 2023" },
        { id: 4, name: "Fine Chemicals", products: 52, status: "Active", created: "Jul 20, 2023" },
        { id: 5, name: "Agricultural Goods", products: 405, status: "Active", created: "Jun 05, 2023" },
      ];
      setCategories(dummy);
      localStorage.setItem("categories", JSON.stringify(dummy));
    } else {
      setCategories(saved);
    }
  }, []);

  /* ================= AUTO SLUG ================= */
  useEffect(() => {
    const generated = name.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
    setSlug(generated);
  }, [name]);

  const saveData = (data) => {
    setCategories(data);
    localStorage.setItem("categories", JSON.stringify(data));
  };

  const handleSave = () => {
    if (!name.trim()) return;

    if (editId) {
      saveData(
        categories.map((c) =>
          c.id === editId
            ? { ...c, name, slug, parentId, description, status: enabled ? "Active" : "Inactive" }
            : c
        )
      );
    } else {
      saveData([
        ...categories,
        {
          id: Date.now(),
          name,
          slug,
          parentId,
          description,
          status: enabled ? "Active" : "Inactive",
          created: new Date().toLocaleDateString(),
          products: 0,
        },
      ]);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    saveData(categories.filter((c) => c.id !== id));
  };

  const toggleStatus = (id) => {
    saveData(
      categories.map((c) =>
        c.id === id ? { ...c, status: c.status === "Active" ? "Inactive" : "Active" } : c
      )
    );
  };

  const closeModal = () => {
    setModal(false);
    setEditId(null);
    setName("");
    setSlug("");
    setParentId("");
    setDescription("");
    setEnabled(true);
  };

  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  /* ================= PAGINATION LOGIC ================= */
  const totalPages = Math.ceil(filtered.length / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const paginatedData = filtered.slice(startIndex, startIndex + perPage);

  const activeCount = categories.filter((c) => c.status === "Active").length;

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Category Management</h1>
        <p className="text-gray-500 text-sm">
          Manage and organize your global product classifications.
        </p>
      </div>

      {/* Top Controls */}
      <div className="bg-white p-4 rounded-xl shadow mb-6 flex justify-between items-center gap-4">
        <input
          type="text"
          placeholder="Search by name, status or date..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="border rounded-lg px-4 py-2 w-80"
        />

        <div className="flex gap-3">
          <button className="border px-4 py-2 rounded-lg text-gray-600">Filter</button>
          <button className="border px-4 py-2 rounded-lg text-gray-600">Export</button>
          <button
            onClick={() => setModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
          >
            + Add Category
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 text-left">CATEGORY NAME</th>
              <th className="p-4 text-left">STATUS</th>
              <th className="p-4 text-left">CREATED DATE</th>
              <th className="p-4 text-right">ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.map((c) => (
              <tr key={c.id} className="border-b hover:bg-gray-50">
                <td className="p-4">
                  <div className="font-medium">{c.name}</div>
                  <div className="text-xs text-gray-500">{c.products} products in stock</div>
                </td>

                <td className="p-4">
                  <button
                    onClick={() => toggleStatus(c.id)}
                    className={`px-3 py-1 rounded-full text-xs ${
                      c.status === "Active"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {c.status}
                  </button>
                </td>

                <td className="p-4 text-gray-600">{c.created}</td>

                <td className="p-4 text-right">
                  <button
                    onClick={() => {
                      setEditId(c.id);
                      setName(c.name);
                      setSlug(c.slug || "");
                      setParentId(c.parentId || "");
                      setDescription(c.description || "");
                      setEnabled(c.status === "Active");
                      setModal(true);
                    }}
                    className="mr-3 text-blue-600 hover:text-blue-800"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => handleDelete(c.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINATION NUMBERS */}
        <div className="flex justify-center items-center gap-2 p-4 border-t bg-gray-50">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded-lg border ${
                currentPage === page
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-600"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-6 mt-6">
        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-sm text-gray-500">Total Categories</p>
          <h2 className="text-2xl font-bold">{categories.length}</h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-sm text-gray-500">Active Status</p>
          <h2 className="text-2xl font-bold">{activeCount}</h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-sm text-gray-500">Top Performing</p>
          <h2 className="text-2xl font-bold">Textiles</h2>
        </div>
      </div>

      {/* FULL MODAL UI SAME AS BEFORE */}
      {modal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl p-8">
            <h2 className="text-2xl font-semibold mb-6">
              {editId ? "Edit Category" : "Add New Category"}
            </h2>

            <div className="mb-5">
              <label className="block font-medium mb-2">Category Name *</label>
              <input
                type="text"
                placeholder="e.g. Pharmaceutical Logistics"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded-xl p-3"
              />
            </div>

            <div className="grid grid-cols-2 gap-5 mb-5">
              <div>
                <label className="block font-medium mb-2">Slug ID</label>
                <input
                  type="text"
                  value={slug}
                  disabled
                  className="w-full border rounded-xl p-3 bg-gray-100"
                />
              </div>

              <div>
                <label className="block font-medium mb-2">Parent Category</label>
                <select
                  value={parentId}
                  onChange={(e) => setParentId(e.target.value)}
                  className="w-full border rounded-xl p-3"
                >
                  <option value="">None (Main)</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-5">
              <label className="block font-medium mb-2">Description</label>
              <textarea
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border rounded-xl p-3"
              />
            </div>

            <div className="flex items-center gap-3 mb-8">
              <input
                type="checkbox"
                checked={enabled}
                onChange={() => setEnabled(!enabled)}
                className="w-5 h-5 accent-blue-600"
              />
              <span>Enable Category on Creation</span>
            </div>

            <div className="flex justify-end gap-4">
              <button onClick={closeModal} className="px-6 py-2 border rounded-lg">
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg"
              >
                {editId ? "Update Category" : "Create Category"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}