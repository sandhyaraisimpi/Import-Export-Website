import { useState, useEffect } from "react";
import AdminLayout from "../layout/AdminLayout";

import {
  Plus,
  Package,
  Save,
  Trash2,
  Pencil,
  Eye,
  EyeOff,
  Filter,
} from "lucide-react";

export default function ProductManagement() {
  const emptyProduct = {
    id: null,
    name: "",
    description: "",
    specs: "",
    moq: "",
    packaging: "",
    origin: "",
    category: "",
    subcategory: "",
    status: "Active",
  };

  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyProduct);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // load products
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(saved);
  }, []);

  // save products
  const saveProducts = (data) => {
    setProducts(data);
    localStorage.setItem("products", JSON.stringify(data));
  };

  // add / edit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.id) {
      const updated = products.map((p) =>
        p.id === form.id ? form : p
      );
      saveProducts(updated);
    } else {
      const newProduct = { ...form, id: Date.now() };
      saveProducts([...products, newProduct]);
    }

    setForm(emptyProduct);
  };

  // delete
  const handleDelete = (id) => {
    const updated = products.filter((p) => p.id !== id);
    saveProducts(updated);
  };

  // toggle status
  const toggleStatus = (id) => {
    const updated = products.map((p) =>
      p.id === id
        ? {
            ...p,
            status:
              p.status === "Active"
                ? "Archived"
                : "Active",
          }
        : p
    );
    saveProducts(updated);
  };

  // edit
  const handleEdit = (product) => {
    setForm(product);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // filtering
  const filteredProducts = products.filter((p) => {
    return (
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      (filterCategory
        ? p.category
            .toLowerCase()
            .includes(filterCategory.toLowerCase())
        : true)
    );
  });

  // pagination logic
  const totalPages = Math.ceil(
    filteredProducts.length / itemsPerPage
  );

  const startIndex =
    (currentPage - 1) * itemsPerPage;

  const currentProducts =
    filteredProducts.slice(
      startIndex,
      startIndex + itemsPerPage
    );

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">
            Product Management
          </h1>
          <p className="text-gray-500 text-sm">
            Add and catalog international inventory
          </p>
        </div>
      </div>

      {/* Product Configuration Card */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">

        <div className="flex items-center gap-2 mb-4">
          <Package size={18} />
          <h2 className="font-semibold">
            Product Configuration
          </h2>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="grid md:grid-cols-2 gap-6">

            {/* BASIC INFO */}
            <div>
              <h3 className="text-xs font-semibold text-gray-400 mb-2">
                BASIC INFORMATION
              </h3>

              <div className="space-y-3">

                <Input
                  label="Product Name"
                  value={form.name}
                  onChange={(v) =>
                    setForm({
                      ...form,
                      name: v,
                    })
                  }
                />

                <textarea
                  placeholder="Description"
                  className="input"
                  value={form.description}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      description:
                        e.target.value,
                    })
                  }
                />

                <Input
                  label="Category"
                  value={form.category}
                  onChange={(v) =>
                    setForm({
                      ...form,
                      category: v,
                    })
                  }
                />

                <Input
                  label="Sub-category"
                  value={form.subcategory}
                  onChange={(v) =>
                    setForm({
                      ...form,
                      subcategory: v,
                    })
                  }
                />

              </div>
            </div>

            {/* SPECIFICATIONS */}
            <div>
              <h3 className="text-xs font-semibold text-gray-400 mb-2">
                SPECIFICATIONS & LOGISTICS
              </h3>

              <div className="space-y-3">

                <Input
                  label="MOQ"
                  value={form.moq}
                  onChange={(v) =>
                    setForm({
                      ...form,
                      moq: v,
                    })
                  }
                />

                <Input
                  label="Packaging"
                  value={form.packaging}
                  onChange={(v) =>
                    setForm({
                      ...form,
                      packaging: v,
                    })
                  }
                />

                <Input
                  label="Country of Origin"
                  value={form.origin}
                  onChange={(v) =>
                    setForm({
                      ...form,
                      origin: v,
                    })
                  }
                />

                <textarea
                  placeholder="Specifications"
                  className="input"
                  value={form.specs}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      specs:
                        e.target.value,
                    })
                  }
                />

              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-6">

            <button
              type="button"
              onClick={() =>
                setForm(emptyProduct)
              }
              className="px-4 py-2 border rounded-lg text-gray-600"
            >
              Clear
            </button>

            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg">
              <Save size={16} />
              {form.id
                ? "Update Product"
                : "Save Product"}
            </button>

          </div>
        </form>
      </div>

      {/* Inventory List */}
      <div className="bg-white rounded-xl shadow">

        {/* Top bar */}
        <div className="flex justify-between items-center p-4 border-b">

          <h2 className="font-semibold">
            Inventory List
          </h2>

          <div className="flex gap-3">

            <input
              placeholder="Search..."
              className="input w-48"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

            <input
              placeholder="Category"
              className="input w-40"
              value={filterCategory}
              onChange={(e) =>
                setFilterCategory(
                  e.target.value
                )
              }
            />

          </div>
        </div>

        {/* Table */}
        <table className="w-full text-sm">

          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="p-3 text-left">
                PRODUCT
              </th>
              <th className="p-3 text-left">
                CATEGORY
              </th>
              <th className="p-3 text-left">
                ORIGIN
              </th>
              <th className="p-3 text-left">
                MOQ
              </th>
              <th className="p-3 text-left">
                STATUS
              </th>
              <th className="p-3 text-left">
                ACTIONS
              </th>
            </tr>
          </thead>

          <tbody>
            {currentProducts.map(
              (p) => (
                <tr
                  key={p.id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="p-3 font-medium">
                    {p.name}
                  </td>

                  <td className="p-3">
                    {p.category}
                  </td>

                  <td className="p-3">
                    {p.origin}
                  </td>

                  <td className="p-3">
                    {p.moq}
                  </td>

                  <td className="p-3">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        p.status ===
                        "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>

                  <td className="p-3 flex gap-3">

                    <button
                      onClick={() =>
                        handleEdit(p)
                      }
                      className="text-blue-600"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      onClick={() =>
                        toggleStatus(
                          p.id
                        )
                      }
                      className="text-gray-600"
                    >
                      {p.status ===
                      "Active" ? (
                        <EyeOff
                          size={16}
                        />
                      ) : (
                        <Eye
                          size={16}
                        />
                      )}
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(
                          p.id
                        )
                      }
                      className="text-red-600"
                    >
                      <Trash2
                        size={16}
                      />
                    </button>

                  </td>
                </tr>
              )
            )}
          </tbody>

        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center p-4">

          <span className="text-sm text-gray-500">
            Showing{" "}
            {startIndex + 1}–
            {Math.min(
              startIndex +
                itemsPerPage,
              filteredProducts.length
            )}{" "}
            of{" "}
            {filteredProducts.length}
          </span>

          <div className="flex gap-2">

            <button
              disabled={
                currentPage === 1
              }
              onClick={() =>
                setCurrentPage(
                  currentPage - 1
                )
              }
              className="px-3 py-1 border rounded disabled:opacity-40"
            >
              Prev
            </button>

            {[...Array(totalPages)].map(
              (_, i) => (
                <button
                  key={i}
                  onClick={() =>
                    setCurrentPage(
                      i + 1
                    )
                  }
                  className={`px-3 py-1 border rounded ${
                    currentPage ===
                    i + 1
                      ? "bg-blue-600 text-white"
                      : ""
                  }`}
                >
                  {i + 1}
                </button>
              )
            )}

            <button
              disabled={
                currentPage ===
                totalPages
              }
              onClick={() =>
                setCurrentPage(
                  currentPage + 1
                )
              }
              className="px-3 py-1 border rounded disabled:opacity-40"
            >
              Next
            </button>

          </div>
        </div>

      </div>

    </AdminLayout>
  );
}

// reusable input
function Input({
  label,
  value,
  onChange,
}) {
  return (
    <input
      placeholder={label}
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
      className="input"
    />
  );
}