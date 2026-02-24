import { useState } from "react";
import AdminLayout from "../../layout/AdminLayout";
import {
  Trash2,
  Upload,
  BookOpen,
  ToggleLeft,
  ToggleRight,
  Search,
  Calendar,
  User,
  X,
  Eye,
  FileText,
} from "lucide-react";

/* ============================================================
   🔧 DUMMY DATA — Replace with real API calls later
   ============================================================ */

const DUMMY_BLOGS = [
  {
    id: 1,
    title: "Top 10 Export Trends in 2025",
    author: "Alex Rivera",
    description: "A deep dive into the most important export trends shaping global trade this year and how businesses can adapt...",
    status: true,
    blogMedia: ["https://placehold.co/600x400?text=Blog+1"],
    createdAt: "Oct 12, 2024",
  },
  {
    id: 2,
    title: "How to Navigate Import Regulations",
    author: "Jordan Smith",
    description: "Understanding customs, duties, and documentation required for smooth imports across international borders...",
    status: true,
    blogMedia: ["https://placehold.co/600x400?text=Blog+2"],
    createdAt: "Sep 28, 2024",
  },
  {
    id: 3,
    title: "Packaging Standards for International Shipments",
    author: "Taylor Wong",
    description: "Proper packaging is critical to ensure products arrive safely across borders without damage or compliance issues...",
    status: false,
    blogMedia: ["https://placehold.co/600x400?text=Blog+3"],
    createdAt: "Aug 15, 2024",
  },
];

/* ============================================================ */

const emptyForm = {
  title: "",
  author: "",
  description: "",
  status: true,
  blogMedia: [],
};

export default function Blogs() {
  const [blogs, setBlogs]       = useState(DUMMY_BLOGS);
  const [form, setForm]         = useState(emptyForm);
  const [search, setSearch]     = useState("");
  const [previewBlog, setPreviewBlog] = useState(null);
  const [errors, setErrors]     = useState({});

  /* ── Stats ── */
  const publishedCount = blogs.filter((b) => b.status).length;
  const draftCount     = blogs.filter((b) => !b.status).length;

  /* ── Validation ── */
  const validate = () => {
    const err = {};
    if (!form.title.trim())       err.title       = "Title is required";
    if (!form.author.trim())      err.author      = "Author is required";
    if (!form.description.trim()) err.description = "Description is required";
    if (form.blogMedia.length === 0) err.blogMedia = "At least one image is required";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  /* ── Submit ── */
  const handleSubmit = () => {
    if (!validate()) return;
    setBlogs([
      {
        id: Date.now(),
        ...form,
        createdAt: new Date().toLocaleDateString("en-US", {
          month: "short", day: "numeric", year: "numeric",
        }),
      },
      ...blogs,
    ]);
    setForm(emptyForm);
    setErrors({});
  };

  /* ── Delete ── */
  const handleDelete = (id) => {
    if (!window.confirm("Delete this blog?")) return;
    setBlogs(blogs.filter((b) => b.id !== id));
  };

  /* ── Toggle status ── */
  const toggleStatus = (id) => {
    setBlogs(blogs.map((b) => (b.id === id ? { ...b, status: !b.status } : b)));
  };

  /* ── Image upload ── */
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setForm((prev) => ({
          ...prev,
          blogMedia: [...prev.blogMedia, reader.result],
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setForm((prev) => ({
      ...prev,
      blogMedia: prev.blogMedia.filter((_, i) => i !== index),
    }));
  };

  /* ── Filtered blogs ── */
  const filtered = blogs.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>

      {/* ── Header ── */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight">Blog Management</h1>
        <p className="text-gray-500 mt-1">Create and publish promotional blog content.</p>
      </div>

      {/* ══════════════════════════════════════
          MAIN LAYOUT — Form left, Recent right
      ══════════════════════════════════════ */}
      <div className="grid xl:grid-cols-3 gap-8 items-start">

        {/* ─────────────────────────────────────
            LEFT — Create Blog Form (2/3 width)
        ───────────────────────────────────── */}
        <div className="xl:col-span-2 bg-white rounded-2xl border shadow-sm">

          <div className="px-7 py-5 border-b bg-gray-50 rounded-t-2xl">
            <h2 className="text-lg font-bold text-slate-800">Create New Blog</h2>
            <p className="text-sm text-gray-400 mt-0.5">Fill in the details below to publish a new blog post.</p>
          </div>

          <div className="p-7 space-y-6">

            {/* Title */}
            <div>
              <label className="block text-sm font-semibold mb-1.5">
                Blog Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Top Export Trends in 2025"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.title ? "border-red-400" : ""}`}
              />
              {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
            </div>

            {/* Author */}
            <div>
              <label className="block text-sm font-semibold mb-1.5">
                Author <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Alex Rivera"
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.author ? "border-red-400" : ""}`}
              />
              {errors.author && <p className="text-red-500 text-xs mt-1">{errors.author}</p>}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold mb-1.5">
                Blog Content <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={10}
                placeholder="Write your full blog content here..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${errors.description ? "border-red-400" : ""}`}
              />
              {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-semibold mb-1.5">
                Blog Images <span className="text-red-500">*</span>
              </label>

              <label className={`cursor-pointer border-2 border-dashed rounded-xl py-10 flex flex-col items-center justify-center hover:border-blue-500 hover:bg-blue-50 transition ${errors.blogMedia ? "border-red-400" : "border-gray-200"}`}>
                <Upload size={32} className="text-gray-400 mb-2" />
                <p className="text-sm font-medium text-gray-500">Click to upload images</p>
                <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP supported</p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
              {errors.blogMedia && <p className="text-red-500 text-xs mt-1">{errors.blogMedia}</p>}

              {/* Image previews */}
              {form.blogMedia.length > 0 && (
                <div className="flex gap-3 mt-4 flex-wrap">
                  {form.blogMedia.map((src, i) => (
                    <div key={i} className="relative w-24 h-24 rounded-xl overflow-hidden border shadow-sm">
                      <img src={src} alt="" className="w-full h-full object-cover" />
                      <button
                        onClick={() => removeImage(i)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600"
                      >
                        <X size={10} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Status Toggle */}
            <div className="flex items-center justify-between border rounded-xl px-5 py-4 bg-gray-50">
              <div>
                <p className="text-sm font-semibold">Publish Blog</p>
                <p className="text-xs text-gray-400 mt-0.5">Toggle off to save as draft</p>
              </div>
              <button onClick={() => setForm({ ...form, status: !form.status })}>
                {form.status
                  ? <ToggleRight size={36} className="text-green-500" />
                  : <ToggleLeft  size={36} className="text-gray-400" />
                }
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => { setForm(emptyForm); setErrors({}); }}
                className="px-6 py-2.5 border rounded-xl text-sm font-medium hover:bg-gray-50 transition"
              >
                Clear
              </button>
              <button
                onClick={handleSubmit}
                className="px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold shadow transition"
              >
                {form.status ? "Publish Blog" : "Save as Draft"}
              </button>
            </div>

          </div>
        </div>

        {/* ─────────────────────────────────────
            RIGHT — Recent Blogs (1/3 width)
        ───────────────────────────────────── */}
        <div className="space-y-4">

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white border rounded-xl p-4 shadow-sm text-center">
              <p className="text-2xl font-bold text-green-600">{publishedCount}</p>
              <p className="text-xs text-gray-500 mt-1">Published</p>
            </div>
            <div className="bg-white border rounded-xl p-4 shadow-sm text-center">
              <p className="text-2xl font-bold text-orange-500">{draftCount}</p>
              <p className="text-xs text-gray-500 mt-1">Drafts</p>
            </div>
          </div>

          {/* Recent Blogs */}
          <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">

            <div className="px-4 py-3 border-b bg-gray-50 flex justify-between items-center">
              <h3 className="font-bold text-sm text-slate-700">Recent Blogs</h3>
              <span className="text-xs text-gray-400">{blogs.length} total</span>
            </div>

            {/* Search */}
            <div className="px-4 py-3 border-b flex items-center gap-2">
              <Search size={14} className="text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Search blogs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 text-xs outline-none"
              />
            </div>

            {/* Blog List */}
            <div className="divide-y max-h-[600px] overflow-y-auto">
              {filtered.length === 0 ? (
                <div className="py-10 text-center text-gray-400">
                  <BookOpen size={28} className="mx-auto mb-2 opacity-30" />
                  <p className="text-xs">No blogs found</p>
                </div>
              ) : (
                filtered.map((blog) => (
                  <div key={blog.id} className="p-4 hover:bg-gray-50 transition">

                    {/* Title + status */}
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="text-sm font-semibold text-slate-800 line-clamp-1 flex-1">
                        {blog.title}
                      </p>
                      <span className={`shrink-0 text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                        blog.status ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"
                      }`}>
                        {blog.status ? "Live" : "Draft"}
                      </span>
                    </div>

                    {/* Meta */}
                    <div className="flex items-center gap-3 text-[11px] text-gray-400 mb-3">
                      <span className="flex items-center gap-1"><User size={11} />{blog.author}</span>
                      <span className="flex items-center gap-1"><Calendar size={11} />{blog.createdAt}</span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleStatus(blog.id)}
                        className="flex items-center gap-1 text-[11px] text-gray-400 hover:text-blue-600 transition"
                      >
                        {blog.status
                          ? <ToggleRight size={15} className="text-green-500" />
                          : <ToggleLeft  size={15} />
                        }
                        {blog.status ? "Published" : "Draft"}
                      </button>

                      <div className="ml-auto flex gap-1">
                        <button
                          onClick={() => setPreviewBlog(blog)}
                          className="p-1.5 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition"
                        >
                          <Eye size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(blog.id)}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          PREVIEW MODAL
      ══════════════════════════════════════ */}
      {previewBlog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-y-auto max-h-[90vh]">

            {previewBlog.blogMedia?.[0] && (
              <img
                src={previewBlog.blogMedia[0]}
                alt={previewBlog.title}
                className="w-full h-56 object-cover rounded-t-2xl"
              />
            )}

            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  previewBlog.status ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"
                }`}>
                  {previewBlog.status ? "Published" : "Draft"}
                </span>
                <button onClick={() => setPreviewBlog(null)} className="text-gray-400 hover:text-gray-600">
                  <X size={20} />
                </button>
              </div>

              <h2 className="text-2xl font-bold text-slate-800 mb-3">{previewBlog.title}</h2>

              <div className="flex items-center gap-4 text-xs text-gray-400 mb-5">
                <span className="flex items-center gap-1"><User size={13} /> {previewBlog.author}</span>
                <span className="flex items-center gap-1"><Calendar size={13} /> {previewBlog.createdAt}</span>
              </div>

              <p className="text-gray-600 leading-relaxed text-sm whitespace-pre-line">
                {previewBlog.description}
              </p>
            </div>
          </div>
        </div>
      )}

    </AdminLayout>
  );
}