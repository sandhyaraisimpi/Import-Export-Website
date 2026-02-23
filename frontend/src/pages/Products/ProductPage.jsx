import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Search,
  ArrowUpRight,
  Activity,
  LayoutGrid,
  List
} from 'lucide-react';
import { getService } from '../../service/axios';

const CategoryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { category } = location.state || {};

  const [searchQuery, setSearchQuery] = useState("");
  const [viewLayout, setViewLayout] = useState("grid");

  const [subcategories, setSubcategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const limit = 9;

  const fetchSubcategories = async (page = 1) => {
    try {
      const response = await getService(
        `/customer/product/subcategorybycategoryId?categoryId=${category._id}&page=${page}&limit=${limit}`
      );

      const result = response?.data?.data;

      setSubcategories(result?.subcategoryList || []);
      setTotalPage(result?.totalPage || 1);

    } catch (error) {
      console.log(error);
    }
  };


  const handleSearch = async (page = 1) => {
    try {
      const response = await getService(
        `/customer/search/subcategory?categoryId=${category._id}&keyword=${searchQuery}&page=${page}&limit=${limit}`
      );


      const result = response?.data?.data;

      setSubcategories(result?.subcategories || []);
      setTotalPage(result?.pagination?.totalPages || 1);

    } catch (error) {
      console.log(error);
    }
  };


  const fetchSuggestions = async (value) => {
    try {
      const response = await getService(
        `/customer/search/suggestion/subcategory?categoryId=${category._id}&keyword=${value}&limit=5`
      );

      setSuggestions(response?.data?.data?.subcategories || []);
      setShowSuggestions(true);

    } catch (error) {
      setSuggestions([]);
    }
  };


  useEffect(() => {
    if (!category?._id) return;
    fetchSubcategories(1);
  }, [category]);


  useEffect(() => {
    if (!category?._id) return;

    if (searchQuery.trim()) {
      handleSearch(currentPage);
    } else {
      fetchSubcategories(currentPage);
    }

  }, [currentPage]);

  return (
    <div className="bg-[#F2F0EB] min-h-screen font-sans text-[#1A1A1A]">

      {/* HERO */}
      <section className="relative h-[85vh] flex flex-col justify-end px-6 md:px-20 pb-20 bg-[#141414] overflow-hidden">
        <div className="absolute inset-0">
          <img src={category?.categoryImage} className="w-full h-full object-cover opacity-30 grayscale" alt="" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-7xl">
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-3 text-white/40 hover:text-[#C36A4D] text-[10px] font-black uppercase tracking-[0.5em] mb-12"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-2 transition-transform"/> Back
          </button>

          <h1 className="text-white text-[12vw] md:text-[8rem] font-black uppercase tracking-tighter leading-[0.75] mb-8">
            {category?.name}
          </h1>

          <p className="text-white/50 text-xl max-w-2xl border-l border-white/20 pl-8">
            {category?.decription}
          </p>
        </div>
      </section>

      {/* TOOLBAR */}
      <div className="sticky top-0 z-50 bg-[#F2F0EB]/90 backdrop-blur-xl border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col lg:flex-row gap-8 items-center justify-between">

          <div className="flex items-center gap-6">
            <div className="flex bg-black/5 p-1 rounded-full">
              <button
                onClick={() => setViewLayout('grid')}
                className={`p-3 rounded-full transition ${viewLayout === 'grid' ? 'bg-white shadow-md' : 'text-black/30'}`}
              >
                <LayoutGrid size={16} />
              </button>
              <button
                onClick={() => setViewLayout('list')}
                className={`p-3 rounded-full transition ${viewLayout === 'list' ? 'bg-white shadow-md' : 'text-black/30'}`}
              >
                <List size={16} />
              </button>
            </div>
          </div>

          <div className="relative w-full lg:w-96 group">
            <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-black/20 group-focus-within:text-[#C36A4D]" size={16} />

            <input
              type="text"
              placeholder="REFINE SEARCH..."
              className="w-full bg-black/5 border border-transparent rounded-full px-8 py-4 text-[10px] font-black uppercase tracking-widest outline-none focus:bg-white focus:border-black/10 transition-all"
              value={searchQuery}
              onChange={(e) => {
                const value = e.target.value;
                setSearchQuery(value);
                setCurrentPage(1);

                if (value.trim()) {
                  fetchSuggestions(value);
                } else {
                  setSuggestions([]);
                  fetchSubcategories(1);
                }
              }}
            />

            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full mt-2 w-full bg-white shadow-xl rounded-xl z-50 overflow-hidden">
                {suggestions.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setSearchQuery(item.name);
                      setShowSuggestions(false);
                      setCurrentPage(1);
                      handleSearch(1);
                    }}
                    className="px-4 py-3 text-sm hover:bg-black/5 cursor-pointer"
                  >
                    {item.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* PRODUCTS */}
      <section className="max-w-7xl mx-auto py-24 px-6">
        <div className="flex items-center gap-4 mb-12">
          <Activity size={20} className="text-[#C36A4D] animate-pulse" />
          <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-black/40">
            Available Inventory Units
          </h2>
        </div>

        <motion.div
          layout
          className={viewLayout === 'grid'
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
            : "flex flex-col gap-6"}
        >
          <AnimatePresence>
            {subcategories.map((sub, index) => (
              <ProductCard
                key={sub._id}
                sub={{
                  id: sub._id,
                  name: sub.name,
                  decription: sub.decription,
                  origin: "Global",
                  image: sub.subcategoryImage
                }}
                index={index}
                layout={viewLayout}
                navigate={navigate}
                categoryId={category?._id}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* PAGINATION */}
        <div className="flex justify-center items-center gap-4 mt-16">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
            className="px-4 py-2 bg-black text-white rounded disabled:opacity-30"
          >
            Prev
          </button>

          <span className="text-sm font-bold">
            Page {currentPage} of {totalPage}
          </span>

          <button
            disabled={currentPage === totalPage}
            onClick={() => setCurrentPage(prev => prev + 1)}
            className="px-4 py-2 bg-black text-white rounded disabled:opacity-30"
          >
            Next
          </button>
        </div>
      </section>
    </div>
  );
};

const ProductCard = ({ sub, layout, categoryId, navigate, index }) => {
  const isGrid = layout === 'grid';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      onClick={() => navigate(`/category/${categoryId}/product/${sub.id}`)}
      className={`group cursor-pointer bg-white border border-black/5 overflow-hidden transition-all duration-700
        hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)]
        ${isGrid ? 'flex flex-col rounded-[2rem] p-4 pb-8 hover:-translate-y-2' : 'flex-row items-center p-6 rounded-2xl flex'}
      `}
    >
      <div className={`${isGrid ? 'h-72 w-full rounded-[1.5rem]' : 'h-32 w-32 rounded-xl'} overflow-hidden bg-[#F2F0EB] relative flex-shrink-0`}>
        <img
          src={sub.image}
          alt={sub.name}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
        />
      </div>

      <div className={`flex flex-col justify-between flex-1 ${isGrid ? 'px-4 pt-8' : 'px-10'}`}>
        <div>
          <h3 className={`${isGrid ? 'text-3xl' : 'text-2xl'} font-black uppercase tracking-tighter mb-4 group-hover:text-[#C36A4D] transition-colors`}>
            {sub.name}
          </h3>

          <p className="text-black/40 text-sm font-medium leading-relaxed line-clamp-2 mb-8">
            {sub.decription}
          </p>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-black/5">
          <div>
            <p className="text-[8px] font-black text-black/20 uppercase tracking-widest mb-1">Origin</p>
            <p className="text-[10px] font-bold uppercase">{sub.origin}</p>
          </div>

          <div className="h-10 w-10 rounded-full bg-black flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform">
            <ArrowUpRight size={18} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryDetail;