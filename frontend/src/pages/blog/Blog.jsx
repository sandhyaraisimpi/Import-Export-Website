import { useEffect } from "react";
import { Link } from "react-router-dom";
import blogs from "../../data/blogData";
import Sidebar from "../../components/blog/Sidebar";

export default function Blog() {

  useEffect(() => {
    document.title = "Import Export Insights & Guides";
  }, []);

  const getOnlineImage = (title) => {
    return `https://source.unsplash.com/600x400/?export,shipping,logistics,${encodeURIComponent(
      title
    )}`;
  };


  const allBlogs = blogs.map((blog) => ({
    ...blog,
    image: blog.image ? blog.image : getOnlineImage(blog.title),
  }));

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">

      {/*  HERO SECTION */}
      <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">

        {/* Background Image */}
        <img
          src="https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55"
          alt="Import Export Logistics"
          className="w-full h-full object-cover scale-105"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
          <h1 className="text-3xl md:text-5xl font-bold max-w-4xl leading-tight">
            Import Export Insights & Guides
          </h1>

          <p className="mt-4 max-w-2xl text-lg opacity-90">
            Practical strategies, documentation help, global trade insights and
            step-by-step guides to grow your international business.
          </p>

          <Link
            to="/contact"
            className="mt-6 inline-block bg-black/80 hover:bg-black px-6 py-3 rounded-xl font-semibold transition shadow-lg"
          >
            Get Expert Guidance →
          </Link>
        </div>
      </div>

      {/* Blog Layout */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-10 lg:grid-cols-4">

          {/* Blog Grid */}
          <div className="lg:col-span-3 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {allBlogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition duration-300 overflow-hidden group flex flex-col"
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="h-48 w-full object-cover group-hover:scale-105 transition duration-300"
                />

                <div className="p-5 flex flex-col flex-grow">
                  <h2 className="font-semibold text-lg mb-2 text-black/70 group-hover:text-black transition">
                    {blog.title}
                  </h2>

                  <p className="text-sm text-gray-500 mb-4">
                    {blog.author} • {blog.date}
                  </p>

                  <div className="mt-auto">
                    <Link
                      to={`/blog/${blog.id}`}
                      className="inline-block px-4 py-2 bg-black/80 text-white rounded-lg text-sm font-medium hover:bg-black transition"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <Sidebar />
        </div>
      </div>
    </div>
  );
}