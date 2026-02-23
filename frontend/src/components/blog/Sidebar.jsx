import { Link } from "react-router-dom";

export default function Sidebar() {
  const categories = [
    "Export Guide",
    "Import Guide",
    "Documentation",
    "Shipping",
    "Business Tips",
  ];

  const popularPosts = [
    { id: 1, title: "How to Start Export Business" },
    { id: 2, title: "IEC Registration Process" },
    { id: 3, title: "Top Export Products 2026" },
  ];

  const tags = [
    "IEC",
    "DGFT",
    "Shipping",
    "Logistics",
    "FOB",
    "CIF",
    "Export India",
  ];

  return (
    <div className="space-y-8">

      {/* Categories */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h3 className="text-lg font-semibold mb-4 border-b pb-2">
          Categories
        </h3>
        <ul className="space-y-2">
          {categories.map((cat, index) => (
            <li key={index}>
              <button className="text-gray-600 hover:text-blue-600 transition">
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Popular Posts */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h3 className="text-lg font-semibold mb-4 border-b pb-2">
          Popular Posts
        </h3>
        <ul className="space-y-3">
          {popularPosts.map((post) => (
            <li key={post.id}>
              <Link
                to={`/blog/${post.id}`}
                className="text-gray-700 hover:text-blue-600 transition text-sm"
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/*Newsletter Box */}
      <div className="bg-black/80 text-white p-6 rounded-2xl shadow-lg">
        <h3 className="text-lg font-semibold mb-3">
          Subscribe Newsletter
        </h3>
        <p className="text-sm mb-4 opacity-90">
          Get latest export import insights directly in your inbox.
        </p>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-3 py-2 rounded-lg text-black mb-3 outline-none"
        />

        <button className="w-full bg-white text-black/80 hover:text-black font-semibold py-2 rounded-lg hover:bg-gray-100 transition">
          Subscribe
        </button>
      </div>

      {/*  Export Tip Card */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h3 className="text-lg font-semibold mb-3 border-b pb-2">
          Export Tip
        </h3>
        <p className="text-sm text-gray-600">
          Always verify buyer credibility before shipment. Use advance payment
          or LC for safer international trade transactions.
        </p>
      </div>

      {/* Tags Section */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h3 className="text-lg font-semibold mb-4 border-b pb-2">
          Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-100 text-sm rounded-full hover:bg-blue-100 hover:text-blue-600 cursor-pointer transition"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

    </div>
  );
}