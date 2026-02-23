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
  Upload,
  Boxes,
  CheckCircle,
  FileText,
  AlertTriangle,
} from "lucide-react";

const CATEGORY_OPTIONS = [
  "None (Main)",
  "Textiles & Apparel",
  "Industrial Machinery",
  "Fine Chemicals",
  "Agricultural Goods",
  "Consumer Electronics",
];

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
    image: "",
  };

  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyProduct);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(saved);
  }, []);

  const saveProducts = (data) => {
    setProducts(data);
    localStorage.setItem("products", JSON.stringify(data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.id) {
      saveProducts(products.map((p) => (p.id === form.id ? form : p)));
    } else {
      saveProducts([...products, { ...form, id: Date.now() }]);
    }
    setForm(emptyProduct);
  };

  const handleDelete = (id) =>
    saveProducts(products.filter((p) => p.id !== id));

  const toggleStatus = (id) =>
    saveProducts(
      products.map((p) =>
        p.id === id
          ? { ...p, status: p.status === "Active" ? "Draft" : "Active" }
          : p
      )
    );

  const handleEdit = (product) => {
    setForm(product);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      (filterCategory ? p.category === filterCategory : true)
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const stats = {
    total: products.length,
    active: products.filter((p) => p.status === "Active").length,
    draft: products.filter((p) => p.status === "Draft").length,
    out: products.filter((p) => p.status === "Out").length,
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Product Management</h1>
        <p className="text-gray-500 text-sm">
          Add and catalog international inventory
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatCard icon={Boxes} label="Total Products" value={stats.total} />
        <StatCard
          icon={CheckCircle}
          label="Active"
          value={stats.active}
          green
        />
        <StatCard
          icon={FileText}
          label="Draft"
          value={stats.draft}
          yellow
        />
        <StatCard
          icon={AlertTriangle}
          label="Out of Stock"
          value={stats.out}
          red
        />
      </div>

      {/* Product Configuration */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Package size={18} />
          <h2 className="font-semibold">Product Configuration</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Basic Info */}
            <div>
              <h3 className="text-xs font-semibold text-gray-400 mb-2">
                BASIC INFORMATION
              </h3>

              <div className="space-y-3">
                <Input label="Product Name" value={form.name} onChange={(v)=>setForm({...form,name:v})} />

                <textarea className="input" placeholder="Description"
                  value={form.description}
                  onChange={(e)=>setForm({...form,description:e.target.value})}
                />

                <Select
                  label="Parent Category"
                  value={form.category}
                  options={CATEGORY_OPTIONS}
                  onChange={(v)=>setForm({...form,category:v})}
                />

                <Select
                  label="Sub Category"
                  value={form.subcategory}
                  options={CATEGORY_OPTIONS}
                  onChange={(v)=>setForm({...form,subcategory:v})}
                />

                {/* Image Upload */}
                <label className="border-dashed border-2 rounded-lg p-4 flex items-center gap-3 cursor-pointer">
                  <Upload size={18} />
                  <span>Upload Product Image</span>
                  <input type="file" hidden
                    onChange={(e)=>{
                      const file = e.target.files[0];
                      if(file){
                        const reader = new FileReader();
                        reader.onload = ()=>setForm({...form,image:reader.result});
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </label>

                {form.image && (
                  <img
                    src={form.image}
                    className="h-32 rounded-lg object-cover"
                  />
                )}
              </div>
            </div>

            {/* Specs */}
            <div>
              <h3 className="text-xs font-semibold text-gray-400 mb-2">
                SPECIFICATIONS & LOGISTICS
              </h3>

              <div className="space-y-3">
                <Input label="MOQ" value={form.moq} onChange={(v)=>setForm({...form,moq:v})} />
                <Input label="Packaging" value={form.packaging} onChange={(v)=>setForm({...form,packaging:v})} />
                <Input label="Country of Origin" value={form.origin} onChange={(v)=>setForm({...form,origin:v})} />

                <textarea className="input" placeholder="Specifications"
                  value={form.specs}
                  onChange={(e)=>setForm({...form,specs:e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button type="button" onClick={()=>setForm(emptyProduct)}
              className="px-4 py-2 border rounded-lg">
              Clear
            </button>

            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg">
              <Save size={16} />
              {form.id ? "Update Product" : "Save Product"}
            </button>
          </div>
        </form>
      </div>

      {/* Inventory List */}
      <div className="bg-white rounded-xl shadow">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-semibold">Inventory List</h2>
          <div className="flex gap-3">
            <input className="input w-48" placeholder="Search..."
              value={search} onChange={(e)=>setSearch(e.target.value)} />
            <select className="input w-40"
              value={filterCategory}
              onChange={(e)=>setFilterCategory(e.target.value)}>
              <option value="">All</option>
              {CATEGORY_OPTIONS.map((c)=>(
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="p-3 text-left">PRODUCT</th>
              <th className="p-3">CATEGORY</th>
              <th className="p-3">ORIGIN</th>
              <th className="p-3">MOQ</th>
              <th className="p-3">STATUS</th>
              <th className="p-3">ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {currentProducts.map((p)=>(
              <tr key={p.id} className="border-t">
                <td className="p-3 font-medium">{p.name}</td>
                <td className="p-3">{p.category}</td>
                <td className="p-3">{p.origin}</td>
                <td className="p-3">{p.moq}</td>
                <td className="p-3">{p.status}</td>
                <td className="p-3 flex gap-3">
                  <button onClick={()=>handleEdit(p)} className="text-blue-600">
                    <Pencil size={16} />
                  </button>
                  <button onClick={()=>toggleStatus(p.id)}>
                    {p.status==="Active" ? <EyeOff size={16}/> : <Eye size={16}/>}
                  </button>
                  <button onClick={()=>handleDelete(p.id)} className="text-red-600">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}

/* Components */
const StatCard = ({ icon: Icon, label, value, green, yellow, red }) => (
  <div className="bg-white rounded-xl shadow p-4 flex items-center gap-3">
    <Icon className={`${green?"text-green-600":yellow?"text-yellow-500":red?"text-red-600":"text-blue-600"}`} />
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  </div>
);

const Input = ({ label, value, onChange }) => (
  <input className="input" placeholder={label} value={value}
    onChange={(e)=>onChange(e.target.value)} />
);

const Select = ({ label, value, options, onChange }) => (
  <select className="input" value={value} onChange={(e)=>onChange(e.target.value)}>
    <option value="">{label}</option>
    {options.map((o)=><option key={o}>{o}</option>)}
  </select>
);