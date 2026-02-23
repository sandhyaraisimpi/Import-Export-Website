import { useEffect, useMemo, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import { Pencil, Trash2 } from "lucide-react";

const PAGE_SIZE = 5;

export default function Products() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [page, setPage] = useState(1);

  const [modal, setModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [enabled, setEnabled] = useState(true);

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    const cats =
      JSON.parse(localStorage.getItem("productCategories")) || [
        { id: "1", name: "Food Products" },
        { id: "2", name: "Spices" },
        { id: "3", name: "Agricultural Goods" },
        { id: "4", name: "Industrial Products" },
      ];

    const prods =
      JSON.parse(localStorage.getItem("products")) || [
        // FOOD PRODUCTS
        { id: 1, name: "Biscuits & Cookies", categoryId: "1", stock: 120, status: true },
        { id: 2, name: "Instant Noodles", categoryId: "1", stock: 90, status: true },
        { id: 3, name: "Milk Powder", categoryId: "1", stock: 60, status: true },
        { id: 4, name: "Fruit Juices", categoryId: "1", stock: 150, status: true },
        { id: 5, name: "Frozen Vegetables", categoryId: "1", stock: 70, status: true },
        { id: 6, name: "Ready-to-Eat Meals", categoryId: "1", stock: 40, status: true },

        // SPICES
        { id: 7, name: "Turmeric Powder", categoryId: "2", stock: 200, status: true },
        { id: 8, name: "Black Pepper", categoryId: "2", stock: 140, status: true },
        { id: 9, name: "Red Chilli Powder", categoryId: "2", stock: 180, status: true },
        { id: 10, name: "Garam Masala", categoryId: "2", stock: 110, status: true },
        { id: 11, name: "Cardamom", categoryId: "2", stock: 50, status: true },
        { id: 12, name: "Cumin Seeds", categoryId: "2", stock: 160, status: true },

        // AGRI GOODS
        { id: 13, name: "Basmati Rice", categoryId: "3", stock: 300, status: true },
        { id: 14, name: "Wheat", categoryId: "3", stock: 250, status: true },
        { id: 15, name: "Mango", categoryId: "3", stock: 120, status: true },
        { id: 16, name: "Onion", categoryId: "3", stock: 500, status: true },
        { id: 17, name: "Groundnuts", categoryId: "3", stock: 220, status: true },
        { id: 18, name: "Lentils (Dal)", categoryId: "3", stock: 270, status: true },

        // INDUSTRIAL
        { id: 19, name: "Industrial Machinery", categoryId: "4", stock: 10, status: true },
        { id: 20, name: "Steel Rods", categoryId: "4", stock: 400, status: true },
        { id: 21, name: "Industrial Chemicals", categoryId: "4", stock: 95, status: true },
        { id: 22, name: "Corrugated Boxes", categoryId: "4", stock: 600, status: true },
        { id: 23, name: "Aluminum Sheets", categoryId: "4", stock: 130, status: true },
        { id: 24, name: "Industrial Tools", categoryId: "4", stock: 80, status: true },
      ];

    setCategories(cats);
    setProducts(prods);

    localStorage.setItem("productCategories", JSON.stringify(cats));
    localStorage.setItem("products", JSON.stringify(prods));
  }, []);

  const saveProducts = (data) => {
    setProducts(data);
    localStorage.setItem("products", JSON.stringify(data));
  };

  /* ================= FILTER ================= */
  const filtered = useMemo(() => {
    setPage(1);
    return products.filter((p) => {
      const matchName = p.name.toLowerCase().includes(search.toLowerCase());
      const matchCategory = categoryFilter ? p.categoryId === categoryFilter : true;
      return matchName && matchCategory;
    });
  }, [search, categoryFilter, products]);

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  /* ================= ACTIONS ================= */
  const toggleStatus = (id) => {
    saveProducts(products.map((p) =>
      p.id === id ? { ...p, status: !p.status } : p
    ));
  };

  const deleteProduct = (id) => {
    if (!window.confirm("Delete this product?")) return;
    saveProducts(products.filter((p) => p.id !== id));
  };

  const openEdit = (p) => {
    setEditId(p.id);
    setName(p.name);
    setCategoryId(p.categoryId);
    setEnabled(p.status);
    setModal(true);
  };

  const resetForm = () => {
    setEditId(null);
    setName("");
    setCategoryId("");
    setEnabled(true);
  };

  const handleSave = () => {
    if (!name || !categoryId) return;

    if (editId) {
      saveProducts(products.map((p) =>
        p.id === editId ? { ...p, name, categoryId, status: enabled } : p
      ));
    } else {
      saveProducts([
        ...products,
        {
          id: Date.now(),
          name,
          categoryId,
          stock: Math.floor(Math.random() * 500),
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
        <h1 className="text-2xl font-semibold">Product Management</h1>
        <p className="text-gray-500 text-sm">
          Manage all products with category & visibility controls
        </p>
      </div>

      {/* FILTER BAR */}
      <div className="bg-white p-4 rounded-xl shadow mb-5 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-4 py-2 w-72 text-sm"
        />

        <div className="flex gap-3">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
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
            + Add Product
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 text-left font-medium">Category</th>
              <th className="p-4 text-left font-medium">Product</th>
              <th className="p-4 text-left font-medium">Stock</th>
              <th className="p-4 text-left font-medium">Status</th>
              <th className="p-4 text-right font-medium">Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.map((p) => {
              const cat = categories.find((c) => c.id === p.categoryId);

              return (
                <tr key={p.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <span className="bg-gray-100 px-3 py-1 rounded-full text-xs">
                      {cat?.name}
                    </span>
                  </td>

                  <td className="p-4 font-medium">{p.name}</td>
                  <td className="p-4 text-gray-600">{p.stock}</td>

                  <td className="p-4">
                    <button
                      onClick={() => toggleStatus(p.id)}
                      className={`w-11 h-6 flex items-center rounded-full p-1 ${
                        p.status ? "bg-blue-600" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`bg-white w-4 h-4 rounded-full transform ${
                          p.status ? "translate-x-5" : ""
                        }`}
                      />
                    </button>
                  </td>

                  <td className="p-4 text-right flex justify-end gap-4">
                    <button onClick={() => openEdit(p)} className="text-blue-600">
                      <Pencil size={18} />
                    </button>
                    <button onClick={() => deleteProduct(p.id)} className="text-red-600">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {modal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white w-full max-w-md rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4">
              {editId ? "Edit Product" : "Add Product"}
            </h2>

            <input
              className="w-full border rounded-lg px-3 py-2 mb-3 text-sm"
              placeholder="Product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <select
              className="w-full border rounded-lg px-3 py-2 mb-4 text-sm"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option value="">Select Category</option>
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