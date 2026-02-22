import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Search,
  ArrowUpRight,
  Activity,
  LayoutGrid,
  List
} from 'lucide-react';

/* =========================================================
   COMPLETE CATEGORY DATA (FINAL STRUCTURE USER REQUESTED)
========================================================= */
const categoryData = {

/* ========================================================= FOOD ========================================================= */
food: {
  title: "Global Food Systems",
  id: "UNIT-01",
  description: "Architectural grade supply chain solutions for global food trade and distribution.",
  banner: "https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&q=80&w=1600",
  stats: { capacity: "50k Tons/mo", global: "25+ Ports", transit: "14 Days Avg" },
  filters: ["All Commodities", "Rice", "Oils", "Pulses", "Flour", "Processed"],
  subCategories: [
    { id: "f1", name: "Basmati Rice", type: "Rice", detail: "Premium aged aromatic rice export quality.", grade: "AAA Export", moq: "20 Tons", origin: "India", metric: "8.5g Protein", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=600" },
    { id: "f2", name: "Edible Oils", type: "Oils", detail: "Sunflower, palm and soybean refined oils.", grade: "Food Grade", moq: "10k Liters", origin: "Malaysia", metric: "High Purity", image: "https://i.pinimg.com/736x/e7/eb/fe/e7ebfedbaf9f3cbf03b363928d3af7c7.jpg?auto=format&fit=crop&q=80&w=500" },
    { id: "f3", name: "Pulses & Lentils", type: "Pulses", detail: "Toor, chana and masoor export grade.", grade: "Premium", moq: "15 Tons", origin: "India", metric: "High Protein", image: "https://i.pinimg.com/1200x/50/f6/c3/50f6c3f013911974e45a687aca4c5ee5.jpg?auto=format&fit=crop&q=80&w=600" },
    { id: "f4", name: "Wheat & Flour Products", type: "Flour", detail: "Whole wheat and refined flour.", grade: "Grade A", moq: "25 Tons", origin: "Australia", metric: "12% Protein", image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&q=80&w=600" },
    { id: "f5", name: "Processed & Packaged Foods", type: "Processed", detail: "Ready to cook and packaged food products.", grade: "Export Packed", moq: "5 Tons", origin: "Global", metric: "Retail Ready", image: "https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&q=80&w=600" }
  ]
},

/* ========================================================= SPICES ========================================================= */
spices: {
  title: "Spice & Aromatics",
  id: "UNIT-02",
  description: "Premium spice sourcing and global distribution.",
  banner: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=1600",
  stats: { capacity: "12k Tons/mo", global: "18+ Regions", transit: "21 Days Avg" },
  filters: ["All Commodities", "Turmeric", "Whole Spices", "Powdered", "Organic", "Blends"],
  subCategories: [
    { id: "s1", name: "Turmeric Products", type: "Turmeric", detail: "Turmeric fingers and powder with high curcumin content.", grade: "Medicinal Grade", moq: "1 Ton", origin: "India", metric: "6% Curcumin", image: "https://i.pinimg.com/736x/3d/87/67/3d8767fd77923e6c82b511fbc3967d13.jpg?auto=format&fit=crop&q=80&w=600" },
    { id: "s2", name: "Black Pepper & Whole Spices", type: "Whole Spices", detail: "Whole spices including pepper, cloves and cardamom.", grade: "Premium", moq: "500kg", origin: "India", metric: "High Oil", image: "https://i.pinimg.com/1200x/91/8c/9f/918c9f4dec6a7fa054ef6c20b3b0384e.jpg?auto=format&fit=crop&q=80&w=600" },
    { id: "s3", name: "Ground Spice Powders", type: "Powdered", detail: "Finely ground chilli, coriander and cumin powders.", grade: "Export Quality", moq: "1 Ton", origin: "India", metric: "Fresh Ground", image: "https://i.pinimg.com/1200x/50/e8/36/50e8362e6fea4533dc209ada63478c82.jpg?auto=format&fit=crop&q=80&w=600" },
    { id: "s4", name: "Premium Organic Spices", type: "Organic", detail: "Certified organic spices sourced from sustainable farms.", grade: "Certified Organic", moq: "200kg", origin: "Sri Lanka", metric: "Eco Certified", image: "https://i.pinimg.com/736x/a7/c0/61/a7c0611feecd22e869dbac961b983e87.jpg?auto=format&fit=crop&q=80&w=600" },
    { id: "s5", name: "Spice Blends", type: "Blends", detail: "Garam masala, curry powder and custom spice mixes.", grade: "Chef Grade", moq: "500kg", origin: "India", metric: "Custom Mix", image: "https://i.pinimg.com/736x/0c/e3/f2/0ce3f215fa23e1014dffcba50299df59.jpg?auto=format&fit=crop&q=80&w=600" }
  ]
},

/* ========================================================= AGRI ========================================================= */
agri: {
  title: "Agricultural Goods",
  id: "UNIT-03",
  description: "Bulk agricultural commodities and farming produce exports.",
  banner: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1600",
  stats: { capacity: "120k Tons/mo", global: "40+ Hubs", transit: "30 Days Avg" },
  filters: ["All Commodities", "Grains", "Fruits", "Vegetables", "Feed", "Oil Seeds"],
  subCategories: [
    { id: "a1", name: "Raw Grains & Cereals", type: "Grains", detail: "Bulk wheat, corn and barley supply.", grade: "Export Grade", moq: "500 Tons", origin: "USA", metric: "Bulk Supply", image: "https://i.pinimg.com/736x/80/71/02/807102da9615d56de02ab98285fec564.jpg?auto=format&fit=crop&q=80&w=600" },
    { id: "a2", name: "Fresh Fruits Export", type: "Fruits", detail: "Fresh apples, mangoes and citrus export.", grade: "Fresh Grade", moq: "20 Tons", origin: "Global", metric: "Cold Chain", image: "https://i.pinimg.com/736x/fa/e8/e1/fae8e1ae1d362a44860b1f009c4404f0.jpg?auto=format&fit=crop&q=80&w=600" },
    { id: "a5", name: "Oil Seeds", type: "Oil Seeds", detail: "Soybean, mustard and sesame seeds.", grade: "Premium", moq: "200 Tons", origin: "Canada", metric: "High Oil", image: "https://i.pinimg.com/736x/b8/5b/f4/b85bf4138310a3ea1466b3af220a92bf.jpg?auto=format&fit=crop&q=80&w=600" },
    { id: "a3", name: "Vegetables Bulk Supply", type: "Vegetables", detail: "Bulk onion, potato and tomato distribution.", grade: "Farm Fresh", moq: "30 Tons", origin: "India", metric: "Daily Harvest", image: "https://i.pinimg.com/736x/e1/97/54/e197541134f94ba268224cc0daf6397d.jpg?auto=format&fit=crop&q=80&w=600" },
    { id: "a4", name: "Animal Feed & Fodder", type: "Feed", detail: "Livestock feed including corn and soybean mix.", grade: "Nutrition Grade", moq: "100 Tons", origin: "Brazil", metric: "High Protein", image: "https://i.pinimg.com/1200x/bc/b9/34/bcb93455b86f3d516e1fc3bfa457fef2.jpg?auto=format&fit=crop&q=80&w=600" }
  ]
},

/* ========================================================= INDUSTRIAL ========================================================= */
industrial: {
  title: "Industrial Materials",
  id: "UNIT-04",
  description: "Industrial raw materials and manufacturing supply chains.",
  banner: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1600",
  stats: { capacity: "200k Tons/mo", global: "12+ Mines", transit: "45 Days Avg" },
  filters: ["All Commodities", "Chemicals", "Construction", "Plastic", "Textile", "Machinery"],
  subCategories: [
    { id: "i1", name: "Chemicals & Solvents", type: "Chemicals", detail: "Industrial chemicals for manufacturing processes.", grade: "Industrial", moq: "50 Tons", origin: "China", metric: "99% Purity", image: "https://i.pinimg.com/736x/ac/c5/af/acc5af1fac4ec657005dfc7d45da764f.jpg?auto=format&fit=crop&q=80&w=600" },
    { id: "i2", name: "Construction Materials", type: "Construction", detail: "Cement, steel and building materials.", grade: "Structural", moq: "500 Tons", origin: "Vietnam", metric: "High Strength", image: "https://i.pinimg.com/736x/2d/2f/b6/2d2fb6f590b4c24053e2bb80ef4bdb3b.jpg?auto=format&fit=crop&q=80&w=600" },
    { id: "i3", name: "Plastic Raw Materials", type: "Plastic", detail: "HDPE and polymer resins for manufacturing.", grade: "Virgin", moq: "25 Tons", origin: "UAE", metric: "0.95 Density", image: "https://i.pinimg.com/1200x/6c/ab/00/6cab00c018e7a1215d73b46751eaaa27.jpg?auto=format&fit=crop&q=80&w=600" },
    { id: "i4", name: "Textile Raw Materials", type: "Textile", detail: "Cotton fiber and yarn supply.", grade: "Premium", moq: "100 Bales", origin: "Egypt", metric: "Long Staple", image: "https://i.pinimg.com/736x/9d/a9/c7/9da9c7e17d6e6dc3fcbcfe6d13da545d.jpg?auto=format&fit=crop&q=80&w=600" },
    { id: "i5", name: "Machinery & Equipment Parts", type: "Machinery", detail: "Industrial machine components and spare parts.", grade: "OEM", moq: "10 Units", origin: "Germany", metric: "Precision", image: "https://i.pinimg.com/1200x/e8/c1/e4/e8c1e4bed67102545a3918dcc74a3760.jpg?auto=format&fit=crop&q=80&w=600" }
  ]
}
};

/* ========================================================= MAIN COMPONENT ========================================================= */
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

      {/* HERO */}
      <section className="relative h-[85vh] flex flex-col justify-end px-6 md:px-20 pb-20 bg-[#141414] overflow-hidden">
        <div className="absolute inset-0">
          <img src={data.banner} className="w-full h-full object-cover opacity-30 grayscale" alt="" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-7xl">
          <button onClick={() => navigate(-1)} className="group flex items-center gap-3 text-white/40 hover:text-[#C36A4D] text-[10px] font-black uppercase tracking-[0.5em] mb-12">
            <ArrowLeft size={14} className="group-hover:-translate-x-2 transition-transform"/> Back
          </button>

          <h1 className="text-white text-[12vw] md:text-[8rem] font-black uppercase tracking-tighter leading-[0.75] mb-8">
            {data.title}
          </h1>

          <p className="text-white/50 text-xl max-w-2xl border-l border-white/20 pl-8">
            {data.description}
          </p>
        </div>
      </section>


      {/* TOOLBAR */}
      <div className="sticky top-0 z-50 bg-[#F2F0EB]/90 backdrop-blur-xl border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col lg:flex-row gap-8 items-center justify-between">

          <div className="flex items-center gap-6">
            <div className="flex bg-black/5 p-1 rounded-full">
              <button onClick={() => setViewLayout('grid')} className={`p-3 rounded-full transition ${viewLayout === 'grid' ? 'bg-white shadow-md' : 'text-black/30'}`}><LayoutGrid size={16}/></button>
              <button onClick={() => setViewLayout('list')} className={`p-3 rounded-full transition ${viewLayout === 'list' ? 'bg-white shadow-md' : 'text-black/30'}`}><List size={16}/></button>
            </div>

            {data.filters.map(f => (
              <button key={f}
                onClick={() => setActiveFilter(f)}
                className={`text-[10px] font-black uppercase tracking-[0.3em] transition-all ${activeFilter === f ? 'text-[#C36A4D] border-b-2 border-[#C36A4D]' : 'text-black/30 hover:text-black'}`}>
                {f}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-96 group">
            <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-black/20 group-focus-within:text-[#C36A4D] transition-colors" size={16}/>
            <input
              type="text"
              placeholder="REFINE SEARCH..."
              className="w-full bg-black/5 border border-transparent rounded-full px-8 py-4 text-[10px] font-black uppercase tracking-widest outline-none focus:bg-white focus:border-black/10 transition-all"
              value={searchQuery}
              onChange={(e)=>setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>


      {/* PRODUCTS */}
      <section className="max-w-7xl mx-auto py-24 px-6">
        <div className="flex items-center gap-4 mb-12">
          <Activity size={20} className="text-[#C36A4D] animate-pulse" />
          <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-black/40">Available Inventory Units</h2>
        </div>

        <motion.div layout className={viewLayout === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10" : "flex flex-col gap-6"}>
          <AnimatePresence>
            {filteredItems.map((sub,index)=> (
              <ProductCard key={sub.id} sub={sub} index={index} layout={viewLayout} navigate={navigate} categoryId={id}/>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </div>
  );
};


/* ========================================================= PRODUCT CARD (RESTORED PREMIUM STYLE) ========================================================= */
const ProductCard = ({ sub, layout, categoryId, navigate, index }) => {
  const isGrid = layout === 'grid';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay:index*0.05, duration:0.4 }}
      onClick={() => navigate(`/category/${categoryId}/product/${sub.id}`)}
      className={`group cursor-pointer bg-white border border-black/5 overflow-hidden transition-all duration-700
        hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)]
        ${isGrid ? 'flex flex-col rounded-[2rem] p-4 pb-8 hover:-translate-y-2' : 'flex-row items-center p-6 rounded-2xl flex'}
      `}
    >

      {/* IMAGE */}
      <div className={`${isGrid ? 'h-72 w-full rounded-[1.5rem]' : 'h-32 w-32 rounded-xl'} overflow-hidden bg-[#F2F0EB] relative flex-shrink-0`}>
        <img
          src={sub.image}
          alt={sub.name}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
        />

        <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md text-white px-3 py-1 text-[8px] font-black uppercase tracking-[0.2em] rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          Ready to Ship
        </div>
      </div>


      {/* CONTENT */}
      <div className={`flex flex-col justify-between flex-1 ${isGrid ? 'px-4 pt-8' : 'px-10'}`}>

        <div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-[9px] font-black uppercase tracking-widest text-[#C36A4D]">{sub.type}</span>
            <span className="text-[9px] font-black uppercase tracking-widest text-black/20">Grade {sub.grade}</span>
          </div>

          <h3 className={`${isGrid ? 'text-3xl' : 'text-2xl'} font-black uppercase tracking-tighter mb-4 group-hover:text-[#C36A4D] transition-colors`}>
            {sub.name}
          </h3>

          <p className="text-black/40 text-sm font-medium leading-relaxed line-clamp-2 mb-8">
            {sub.detail}
          </p>
        </div>


        {/* FOOTER */}
        <div className="flex items-center justify-between pt-6 border-t border-black/5">
          <div className="flex gap-8">
            <div>
              <p className="text-[8px] font-black text-black/20 uppercase tracking-widest mb-1">Origin</p>
              <p className="text-[10px] font-bold uppercase">{sub.origin}</p>
            </div>
            <div>
              <p className="text-[8px] font-black text-black/20 uppercase tracking-widest mb-1">Metric</p>
              <p className="text-[10px] font-bold text-[#C36A4D] uppercase">{sub.metric}</p>
            </div>
          </div>

          <div className="h-10 w-10 rounded-full bg-black flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform">
            <ArrowUpRight size={18}/>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryDetail;