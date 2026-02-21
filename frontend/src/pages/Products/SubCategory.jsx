import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Search,
  ArrowUpRight,
  Activity,
  LayoutGrid,
  List,
  Info,
  Globe2,
  Anchor,
  Truck,
  FileText
} from 'lucide-react';

/* =========================================================
    ENHANCED DATA ARCHITECTURE
========================================================= */
const categoryData = {
  food: {
    title: "Global Food Systems",
    id: "UNIT-01",
    description: "Architectural grade supply chain solutions for the global food industry. We manage end-to-end procurement for the world's most demanding hospitality and retail groups.",
    banner: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=1600",
    stats: { capacity: "50k Tons/mo", global: "25+ Ports", transit: "14 Days Avg" },
    filters: ["All Commodities", "Grains", "Oils", "Organic", "Specialty"],
    logistics: [
      { icon: <Anchor size={18} />, label: "Maritime", detail: "FOB/CIF Incoterms" },
      { icon: <Truck size={18} />, label: "Ground", detail: "Cold Chain Ready" },
      { icon: <FileText size={18} />, label: "Compliance", detail: "SGS/ISO 22000" }
    ],
    subCategories: [
      { id: "p1", name: "Basmati Rice", type: "Grains", detail: "Long-grain aromatic rice sourced from Himalayan foothills. Aged for 24 months.", grade: "AAA Export", moq: "20 Tons", origin: "India", metric: "8.5g Protein", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=600" },
      { id: "p2", name: "Refined Oils", type: "Oils", detail: "Multi-stage filtered vegetable and sunflower oils. High smoke point for industrial use.", grade: "Food Grade", moq: "10,000L", origin: "Malaysia", metric: "Pure Lipid", image: "https://images.unsplash.com/photo-1474979266404-7eaacbad8a0f?auto=format&fit=crop&q=80&w=600" },
      { id: "p3", name: "Processed Pulses", type: "Grains", detail: "Sorted and cleaned legumes for international retail. Triple-washed and laser-sorted.", grade: "Premium", moq: "15 Tons", origin: "Canada", metric: "21g Protein", image: "https://images.unsplash.com/photo-1515942400420-2b98fed1f515?auto=format&fit=crop&q=80&w=600" },
      { id: "p4", name: "Avocado Oil", type: "Oils", detail: "Cold-pressed extra virgin avocado oil. Sourced from Michoacán volcanic soil.", grade: "A-Grade", moq: "5,000L", origin: "Mexico", metric: "9.2/10 Purity", image: "https://images.unsplash.com/photo-1524638067-feba7e8ed70f?auto=format&fit=crop&q=80&w=600" },
      { id: "p5", name: "Ancient Grains", type: "Specialty", detail: "Organic Quinoa and Amaranth blends for high-end health retailers.", grade: "Certified Organic", moq: "2 Tons", origin: "Peru", metric: "14% Fiber", image: "https://images.unsplash.com/photo-1509475826633-fed5bb193c66?auto=format&fit=crop&q=80&w=600" }
    ]
  }
};

const CategoryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All Commodities");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewLayout, setViewLayout] = useState("grid");

  const data = categoryData[id] || categoryData.food;

  const filteredItems = useMemo(() => {
    return data.subCategories.filter(item => {
      const matchesFilter = activeFilter === "All Commodities" || item.type === activeFilter;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery, data]);

  return (
    <div className="bg-[#F2F0EB] min-h-screen font-sans text-[#1A1A1A]">
      
      {/* 1. HERO WITH DYNAMIC STATS */}
      <section className="relative h-[85vh] flex flex-col justify-end px-6 md:px-20 pb-20 bg-[#141414] overflow-hidden">
        <div className="absolute inset-0">
          <img src={data.banner} className="w-full h-full object-cover opacity-30 grayscale" alt="" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
        </div>
        
        <div className="relative z-10 w-full max-w-7xl">
           <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
             <button onClick={() => navigate(-1)} className="group flex items-center gap-3 text-white/40 hover:text-[#C36A4D] text-[10px] font-black uppercase tracking-[0.5em] mb-12">
               <ArrowLeft size={14} className="group-hover:-translate-x-2 transition-transform"/> Back to Index
             </button>
             
             <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                <div className="max-w-4xl">
                  <span className="text-[#C36A4D] text-[12px] font-black tracking-[0.4em] uppercase mb-4 block">{data.id} // SYSTEM ACTIVATED</span>
                  <h1 className="text-white text-[12vw] md:text-[8rem] font-black uppercase leading-[0.75] tracking-tighter mb-8">
                    {data.title}
                  </h1>
                  <p className="text-white/50 text-xl font-light max-w-2xl leading-relaxed border-l border-white/20 pl-8">
                    {data.description}
                  </p>
                </div>
                
                {/* SIDE STATS */}
                <div className="grid grid-cols-2 md:grid-cols-1 gap-8 md:text-right border-t border-white/10 pt-8 md:border-t-0">
                  <div>
                    <p className="text-white/30 text-[9px] font-black uppercase tracking-widest mb-1">Mo. Yield</p>
                    <p className="text-white text-3xl font-light italic">{data.stats.capacity}</p>
                  </div>
                  <div>
                    <p className="text-white/30 text-[9px] font-black uppercase tracking-widest mb-1">Transit Time</p>
                    <p className="text-white text-3xl font-light italic">{data.stats.transit}</p>
                  </div>
                </div>
             </div>
           </motion.div>
        </div>
      </section>

   

      {/* 3. TOOLBAR */}
      <div className=" top-0 z-50 bg-[#F2F0EB]/90 backdrop-blur-xl border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col lg:flex-row gap-8 items-center justify-between">
          <div className="flex items-center gap-6 w-full lg:w-auto overflow-x-auto no-scrollbar">
            <div className="flex bg-black/5 p-1 rounded-full">
              <button onClick={() => setViewLayout('grid')} className={`p-3 rounded-full transition ${viewLayout === 'grid' ? 'bg-white text-black shadow-md' : 'text-black/30'}`}><LayoutGrid size={16} /></button>
              <button onClick={() => setViewLayout('list')} className={`p-3 rounded-full transition ${viewLayout === 'list' ? 'bg-white text-black shadow-md' : 'text-black/30'}`}><List size={16} /></button>
            </div>
            {data.filters.map(f => (
              <button key={f} onClick={() => setActiveFilter(f)}
                className={`whitespace-nowrap text-[10px] font-black uppercase tracking-[0.2em] transition-all px-2 py-1 ${activeFilter === f ? 'text-[#C36A4D] border-b-2 border-[#C36A4D]' : 'text-black/30 hover:text-black'}`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="relative w-full lg:w-96 group">
            <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-black/20 group-focus-within:text-[#C36A4D] transition-colors" size={16} />
            <input type="text" placeholder="REFINE SEARCH..."
              className="w-full bg-black/5 border border-transparent rounded-full px-8 py-4 text-[10px] font-black uppercase tracking-widest outline-none focus:bg-white focus:border-black/10 transition-all"
              value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* 4. PRODUCT ENGINE */}
      <section className="max-w-7xl mx-auto py-24 px-6">
        <div className="flex items-center gap-4 mb-12">
          <Activity size={20} className="text-[#C36A4D] animate-pulse" />
          <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-black/40">Available Inventory Units</h2>
        </div>

        <motion.div layout className={viewLayout === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10" : "flex flex-col gap-6"}>
          <AnimatePresence>
            {filteredItems.map((sub, index) => (
              <ProductCard key={sub.id} sub={sub} index={index} layout={viewLayout} categoryId={id} navigate={navigate} />
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

    
    </div>
  );
};

/* =========================================================
    PRODUCT CARD WITH DEEP LINKING
========================================================= */
const ProductCard = ({ sub, index, layout, categoryId, navigate }) => {
  const isGrid = layout === 'grid';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      // NAVIGATE TO PRODUCT DETAIL PAGE
      onClick={() => navigate(`/category/${categoryId}/product/${sub.id}`)}
      className={`group cursor-pointer bg-white border border-black/5 overflow-hidden transition-all duration-700 
        ${isGrid ? 'flex flex-col rounded-[2rem] p-4 pb-8' : 'flex-row items-center p-6 rounded-2xl flex'}
      `}
    >
      <div className={`${isGrid ? 'h-72 w-full rounded-[1.5rem]' : 'h-32 w-32 rounded-xl'} overflow-hidden bg-[#F2F0EB] relative flex-shrink-0`}>
        <img src={sub.image} alt={sub.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
        <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md text-white px-3 py-1 text-[8px] font-black uppercase tracking-[0.2em] rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          Ready to Ship
        </div>
      </div>

      <div className={`flex flex-col justify-between flex-1 ${isGrid ? 'px-4 pt-8' : 'px-10'}`}>
        <div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-[9px] font-black uppercase tracking-widest text-[#C36A4D]">{sub.type}</span>
            <span className="text-[9px] font-black uppercase tracking-widest text-black/20">Grade: {sub.grade}</span>
          </div>
          <h3 className={`${isGrid ? 'text-3xl' : 'text-2xl'} font-black uppercase tracking-tighter mb-4 group-hover:text-[#C36A4D] transition-colors`}>
            {sub.name}
          </h3>
          <p className="text-black/40 text-sm font-medium leading-relaxed line-clamp-2 mb-8">
            {sub.detail}
          </p>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-black/5">
          <div className="flex gap-8">
            <div>
              <p className="text-[8px] font-black text-black/20 uppercase tracking-widest mb-1">Origin</p>
              <p className="text-[10px] font-bold uppercase">{sub.origin}</p>
            </div>
            <div>
              <p className="text-[8px] font-black text-black/20 uppercase tracking-widest mb-1">Purity/Value</p>
              <p className="text-[10px] font-bold text-[#C36A4D] uppercase">{sub.metric}</p>
            </div>
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