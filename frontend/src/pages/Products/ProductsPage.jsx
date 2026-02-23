import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Search,
  ArrowUpRight,
  LayoutGrid,
  List,
  ChevronRight,
  Tag,
  Layers,
  CheckCircle2,
  XCircle,
} from "lucide-react";

// ═══════════════════════════════════════════════════════════════
//  MOCK DATA — Replace each section with your real API responses
// ═══════════════════════════════════════════════════════════════

const MOCK_CATEGORY = {
  _id: "cat_001",
  name: "Textiles",
  decription:
    "Premium-grade raw textile materials sourced from certified suppliers across South Asia, East Africa, and South America.",
  categoryImage:
    "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1600&q=80",
};

// Matches subCategory_Schema
const MOCK_SUBCATEGORIES = [
  {
    _id: "sub_001",
    categoryId: "cat_001",
    name: "Raw Cotton",
    skuId: "SKU-TC-001",
    decription: "Long-staple, unprocessed cotton bales from Gujarat. Low moisture content, high tensile strength.",
    status: "Available",
    subcategoryImage: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=800&q=80",
  },
  {
    _id: "sub_002",
    categoryId: "cat_001",
    name: "Mulberry Silk",
    skuId: "SKU-TC-002",
    decription: "Grade-A mulberry silk reeled from double-cocoon filaments. Exceptionally uniform denier.",
    status: "Available",
    subcategoryImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  },
  {
    _id: "sub_003",
    categoryId: "cat_001",
    name: "Merino Wool",
    skuId: "SKU-TC-003",
    decription: "Ultra-fine 17-micron Merino fleece sourced from free-range farms in Patagonia.",
    status: "Available",
    subcategoryImage: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800&q=80",
  },
  {
    _id: "sub_004",
    categoryId: "cat_001",
    name: "Linen Fibre",
    skuId: "SKU-TC-004",
    decription: "Wet-retted flax fibre with low lignin content. Exceptionally durable and biodegradable.",
    status: "Un-Available",
    subcategoryImage: "https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=800&q=80",
  },
  {
    _id: "sub_005",
    categoryId: "cat_001",
    name: "Bamboo Yarn",
    skuId: "SKU-TC-005",
    decription: "Mechanically processed bamboo yarn with antibacterial properties. Silky hand-feel.",
    status: "Available",
    subcategoryImage: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80",
  },
  {
    _id: "sub_006",
    categoryId: "cat_001",
    name: "Hemp Fabric",
    skuId: "SKU-TC-006",
    decription: "Industrial-grade hemp woven into base cloth. Resistant to mold, UV, and abrasion.",
    status: "Available",
    subcategoryImage: "https://images.unsplash.com/photo-1565035010268-a3816f98589a?w=800&q=80",
  },
];

// Matches productSchema — keyed by subCategoryId for easy lookup
// Replace with: products filtered by subCategoryId from your API
const MOCK_PRODUCTS = {
  sub_001: [
    {
      _id: "prod_001",
      categoryId: "cat_001",
      subCategoryId: "sub_001",
      name: "Gujarat Pima Bale",
      skuId: "SKU-P-0011",
      description: "Extra-long staple Pima cotton from Saurashtra region. 34mm fibre length, moisture below 8%. Ideal for combed yarn.",
      specifications: "Grade: ELS | Staple: 34mm | Mic: 3.8 | Moisture: <8% | Pack: 170kg bales",
      status: "Available",
      productImage: ["https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=600&q=80"],
    },
    {
      _id: "prod_002",
      categoryId: "cat_001",
      subCategoryId: "sub_001",
      name: "Shankar-6 Cotton",
      skuId: "SKU-P-0012",
      description: "Medium-staple Shankar-6 variety, most exported Indian cotton. Consistent quality, wide mill acceptance.",
      specifications: "Grade: S6 | Staple: 28mm | Mic: 4.2 | Moisture: <8.5% | Pack: 165kg bales",
      status: "Available",
      productImage: ["https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&q=80"],
    },
    {
      _id: "prod_003",
      categoryId: "cat_001",
      subCategoryId: "sub_001",
      name: "Organic Cotton Lint",
      skuId: "SKU-P-0013",
      description: "GOTS-certified organic cotton, pesticide-free cultivation. Premium pricing, niche but high-demand segment.",
      specifications: "Cert: GOTS | Staple: 30mm | Mic: 4.0 | Moisture: <7.5% | Pack: 160kg bales",
      status: "Un-Available",
      productImage: ["https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=80"],
    },
  ],
  sub_002: [
    {
      _id: "prod_004",
      categoryId: "cat_001",
      subCategoryId: "sub_002",
      name: "20/22D Raw Silk",
      skuId: "SKU-P-0021",
      description: "Reeled raw silk 20/22 denier, double-cocoon grade. Smooth hand-feel, low nep count, suitable for luxury warp weaving.",
      specifications: "Denier: 20/22D | Grade: 3A | Neatness: 95%+ | Sericin: 25% | Reel: 500m hanks",
      status: "Available",
      productImage: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80"],
    },
    {
      _id: "prod_005",
      categoryId: "cat_001",
      subCategoryId: "sub_002",
      name: "Spun Silk Yarn",
      skuId: "SKU-P-0022",
      description: "Spun from pierced cocoon waste. Slightly irregular texture adds character. Popular in artisan and handloom segments.",
      specifications: "Count: Nm120 | Grade: B | Twist: 600 TPM | Package: 100g cones",
      status: "Available",
      productImage: ["https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=80"],
    },
  ],
  sub_003: [
    {
      _id: "prod_006",
      categoryId: "cat_001",
      subCategoryId: "sub_003",
      name: "Superfine 17.5µ Fleece",
      skuId: "SKU-P-0031",
      description: "Patagonian Merino fleece, 17.5 micron. Certified non-mulesed. Exceptional softness for next-to-skin knitwear.",
      specifications: "Micron: 17.5µ | Length: 85mm | VM: <0.5% | Cert: ZQ, RWS | Pack: 200kg bales",
      status: "Available",
      productImage: ["https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=600&q=80"],
    },
  ],
  sub_004: [],
  sub_005: [
    {
      _id: "prod_007",
      categoryId: "cat_001",
      subCategoryId: "sub_005",
      name: "Bamboo Ring-Spun Yarn",
      skuId: "SKU-P-0051",
      description: "Ne30/1 ring-spun bamboo viscose yarn. High sheen, smooth surface, excellent drape for woven fabrics.",
      specifications: "Count: Ne30/1 | Twist: Z | Tenacity: 18cN/tex | Elongation: 18% | Package: 1kg cones",
      status: "Available",
      productImage: ["https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80"],
    },
    {
      _id: "prod_008",
      categoryId: "cat_001",
      subCategoryId: "sub_005",
      name: "Bamboo-Cotton Blend",
      skuId: "SKU-P-0052",
      description: "70/30 bamboo-cotton blend yarn. Combines softness with durability. Preferred for T-shirt and activewear knitting.",
      specifications: "Blend: 70% Bamboo / 30% Cotton | Count: Ne40/1 | Package: 1kg cones",
      status: "Available",
      productImage: ["https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=80"],
    },
  ],
  sub_006: [
    {
      _id: "prod_009",
      categoryId: "cat_001",
      subCategoryId: "sub_006",
      name: "Hemp Canvas 12oz",
      skuId: "SKU-P-0061",
      description: "12oz plain-weave hemp canvas. Heavy-duty, naturally anti-microbial. Suited for industrial bags and upholstery.",
      specifications: "Weight: 12oz/yd² | Width: 58\" | Weave: Plain | Finish: Unbleached | Roll: 50m",
      status: "Available",
      productImage: ["https://images.unsplash.com/photo-1565035010268-a3816f98589a?w=600&q=80"],
    },
  ],
};

// ═══════════════════════════════════════════════════════════════


// ── Subcategory Card ──────────────────────────────────────────
const SubcategoryCard = ({ sub, index, onClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    onClick={() => sub.status === "Available" && onClick(sub)}
    className={`group relative overflow-hidden rounded-3xl cursor-pointer border transition-all duration-500
      ${sub.status === "Available"
        ? "border-white/10 hover:border-[#C36A4D]/40 hover:shadow-[0_30px_60px_-15px_rgba(195,106,77,0.25)]"
        : "border-white/5 opacity-50 cursor-not-allowed"
      }`}
  >
    {/* Background Image */}
    <div className="absolute inset-0">
      <img
        src={sub.subcategoryImage}
        alt={sub.name}
        className="w-full h-full object-cover opacity-20 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/80 to-transparent" />
    </div>

    <div className="relative z-10 p-7 flex flex-col h-64 justify-between">
      <div className="flex items-start justify-between">
        <span className={`text-[9px] font-black tracking-[0.3em] uppercase px-3 py-1.5 rounded-full border
          ${sub.status === "Available"
            ? "text-emerald-400 border-emerald-400/30 bg-emerald-400/10"
            : "text-red-400 border-red-400/30 bg-red-400/10"
          }`}>
          {sub.status}
        </span>
        <span className="text-white/20 text-[9px] font-mono tracking-widest">{sub.skuId}</span>
      </div>

      <div>
        <h3 className="text-white text-2xl font-black uppercase tracking-tight mb-2 group-hover:text-[#C36A4D] transition-colors duration-300">
          {sub.name}
        </h3>
        <p className="text-white/40 text-sm leading-relaxed line-clamp-2">{sub.decription}</p>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-white/20 text-[9px] font-black uppercase tracking-[0.3em]">
          {(MOCK_PRODUCTS[sub._id] || []).length} Products
        </span>
        <div className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center
          group-hover:bg-[#C36A4D] group-hover:border-[#C36A4D] transition-all duration-300">
          <ChevronRight size={14} className="text-white/40 group-hover:text-white transition-colors" />
        </div>
      </div>
    </div>
  </motion.div>
);


// ── Product Card ──────────────────────────────────────────────
const ProductCard = ({ product, index, layout }) => {
  const isGrid = layout === "grid";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.06, duration: 0.45 }}
      className={`group cursor-pointer bg-[#111111] border border-white/5 overflow-hidden transition-all duration-500
        hover:border-[#C36A4D]/30 hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)]
        ${isGrid ? "flex flex-col rounded-3xl" : "flex flex-row items-stretch rounded-2xl"}
      `}
    >
      {/* Image */}
      <div className={`overflow-hidden flex-shrink-0 relative
        ${isGrid ? "h-56 w-full" : "h-36 w-36"}
      `}>
        <img
          src={product.productImage?.[0]}
          alt={product.name}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
        />
        {/* Status badge */}
        <div className="absolute top-3 left-3">
          {product.status === "Available"
            ? <span className="flex items-center gap-1 text-[8px] font-black uppercase tracking-widest text-emerald-400 bg-black/60 backdrop-blur px-2 py-1 rounded-full border border-emerald-400/20">
                <CheckCircle2 size={9} /> In Stock
              </span>
            : <span className="flex items-center gap-1 text-[8px] font-black uppercase tracking-widest text-red-400 bg-black/60 backdrop-blur px-2 py-1 rounded-full border border-red-400/20">
                <XCircle size={9} /> Out of Stock
              </span>
          }
        </div>
      </div>

      {/* Content */}
      <div className={`flex flex-col justify-between flex-1 ${isGrid ? "p-6" : "p-6"}`}>
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[9px] font-mono text-white/25 tracking-widest">{product.skuId}</span>
            <Tag size={11} className="text-white/15" />
          </div>

          <h3 className="text-white text-xl font-black uppercase tracking-tight mb-3 group-hover:text-[#C36A4D] transition-colors">
            {product.name}
          </h3>

          <p className="text-white/35 text-sm leading-relaxed line-clamp-2 mb-4">
            {product.description}
          </p>
        </div>

        {/* Specifications */}
        <div className="bg-white/3 border border-white/5 rounded-xl p-3 mb-4">
          <p className="text-[8px] font-black text-white/20 uppercase tracking-[0.3em] mb-1.5 flex items-center gap-1.5">
            <Layers size={9} /> Specifications
          </p>
          <p className="text-white/50 text-[11px] font-mono leading-relaxed">
            {product.specifications}
          </p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em]">View Details</span>
          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center
            group-hover:bg-[#C36A4D] transition-all duration-300">
            <ArrowUpRight size={14} className="text-white/40 group-hover:text-white transition-colors" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};


// ── Main Page ─────────────────────────────────────────────────
export default function CategoryDetail() {
  const [selectedSub, setSelectedSub] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewLayout, setViewLayout] = useState("grid");

  const products = selectedSub ? (MOCK_PRODUCTS[selectedSub._id] || []) : [];

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.skuId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSubs = MOCK_SUBCATEGORIES.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectSub = (sub) => {
    setSelectedSub(sub);
    setSearchQuery("");
    setViewLayout("grid");
  };

  const handleBack = () => {
    if (selectedSub) {
      setSelectedSub(null);
      setSearchQuery("");
    }
  };

  return (
    <div className="bg-[#0D0D0D] min-h-screen text-white font-sans">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative h-[70vh] flex flex-col justify-end px-6 md:px-16 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={selectedSub ? selectedSub.subcategoryImage : MOCK_CATEGORY.categoryImage}
            alt=""
            className="w-full h-full object-cover transition-all duration-1000"
            style={{ filter: "brightness(0.25) saturate(0.6)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D]/60 to-transparent" />
        </div>

        {/* Breadcrumb */}
        <div className="relative z-10 w-full max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8 text-[9px] font-black uppercase tracking-[0.4em] text-white/30">
            <button
              onClick={handleBack}
              className={`flex items-center gap-2 transition-colors ${selectedSub ? "hover:text-[#C36A4D] cursor-pointer" : "cursor-default"}`}
            >
              {selectedSub && <ArrowLeft size={11} />}
              {MOCK_CATEGORY.name}
            </button>
            {selectedSub && (
              <>
                <ChevronRight size={10} className="text-white/15" />
                <span className="text-white/60">{selectedSub.name}</span>
              </>
            )}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedSub?._id || "category"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-white font-black uppercase tracking-tighter leading-[0.8] mb-6"
                style={{ fontSize: "clamp(3.5rem, 9vw, 8rem)" }}>
                {selectedSub ? selectedSub.name : MOCK_CATEGORY.name}
              </h1>
              <p className="text-white/40 text-lg max-w-2xl border-l-2 border-[#C36A4D]/40 pl-6 leading-relaxed">
                {selectedSub ? selectedSub.decription : MOCK_CATEGORY.decription}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── TOOLBAR ──────────────────────────────────────────── */}
      <div className="sticky top-0 z-50 bg-[#0D0D0D]/95 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row gap-4 items-center justify-between">

          {/* Left — context label */}
          <div className="flex items-center gap-3">
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/25">
              {selectedSub
                ? `${filteredProducts.length} Product${filteredProducts.length !== 1 ? "s" : ""}`
                : `${MOCK_SUBCATEGORIES.length} Subcategories`}
            </span>

            {selectedSub && (
              <div className="flex bg-white/5 p-0.5 rounded-full">
                <button
                  onClick={() => setViewLayout("grid")}
                  className={`p-2.5 rounded-full transition ${viewLayout === "grid" ? "bg-white/10 text-white" : "text-white/25"}`}
                >
                  <LayoutGrid size={14} />
                </button>
                <button
                  onClick={() => setViewLayout("list")}
                  className={`p-2.5 rounded-full transition ${viewLayout === "list" ? "bg-white/10 text-white" : "text-white/25"}`}
                >
                  <List size={14} />
                </button>
              </div>
            )}
          </div>

          {/* Right — search */}
          <div className="relative w-full sm:w-80 group">
            <Search size={13} className="absolute right-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#C36A4D] transition-colors" />
            <input
              type="text"
              placeholder={selectedSub ? "SEARCH PRODUCTS..." : "SEARCH SUBCATEGORIES..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/8 rounded-full px-5 py-3 text-[10px] font-black uppercase tracking-widest outline-none text-white placeholder-white/20 focus:bg-white/8 focus:border-[#C36A4D]/30 transition-all"
            />
          </div>
        </div>
      </div>

      {/* ── CONTENT ──────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto py-16 px-6">
        <AnimatePresence mode="wait">

          {/* VIEW 1 — Subcategories */}
          {!selectedSub && (
            <motion.div
              key="subcategories"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredSubs.map((sub, i) => (
                  <SubcategoryCard
                    key={sub._id}
                    sub={sub}
                    index={i}
                    onClick={handleSelectSub}
                  />
                ))}
              </div>

              {filteredSubs.length === 0 && (
                <p className="text-center text-white/20 font-black uppercase tracking-widest text-sm mt-24">
                  No subcategories found.
                </p>
              )}
            </motion.div>
          )}

          {/* VIEW 2 — Products */}
          {selectedSub && (
            <motion.div
              key="products"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {filteredProducts.length === 0 && !searchQuery && (
                <div className="flex flex-col items-center justify-center py-32 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                    <Layers size={24} className="text-white/20" />
                  </div>
                  <p className="text-white/20 font-black uppercase tracking-widest text-sm">
                    No products in this subcategory yet.
                  </p>
                </div>
              )}

              {filteredProducts.length === 0 && searchQuery && (
                <p className="text-center text-white/20 font-black uppercase tracking-widest text-sm mt-24">
                  No products match your search.
                </p>
              )}

              <motion.div
                layout
                className={
                  viewLayout === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "flex flex-col gap-5"
                }
              >
                <AnimatePresence>
                  {filteredProducts.map((product, i) => (
                    <ProductCard
                      key={product._id}
                      product={product}
                      index={i}
                      layout={viewLayout}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}