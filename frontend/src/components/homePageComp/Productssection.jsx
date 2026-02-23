import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─────────────────────────────────────────────────────────────────────────────
// ██████  DATA — Replace with API response mapped to this shape
// Fields match productSchema: name, categoryId(label), status, productImage[0]
// ─────────────────────────────────────────────────────────────────────────────

const SECTION_HEADING = "Discover Our\nProduct Categories";

const PRODUCTS = [
  {
    _id: "1", num: "01",
    name: "Basmati Rice",
    category: "Food Products",
    specifications: "Long grain · Premium Grade · 5% Broken",
    status: "Available",
    productImage: ["https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&h=700&fit=crop"],
  },
  {
    _id: "2", num: "02",
    name: "Red Chilli",
    category: "Spices",
    specifications: "Dry · Whole · Stemless",
    status: "Available",
    productImage: ["https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&h=400&fit=crop"],
  },
  {
    _id: "3", num: "03",
    name: "Turmeric Powder",
    category: "Spices",
    specifications: "Curcumin 3.5%+ · Fine Grind",
    status: "Available",
    productImage: ["https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&h=400&fit=crop"],
  },
  {
    _id: "4", num: "04",
    name: "Agricultural Goods",
    category: "Agricultural",
    specifications: "Fresh · Farm Direct · Export Grade",
    status: "Available",
    productImage: ["https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=600&h=700&fit=crop"],
  },
  {
    _id: "5", num: "05",
    name: "Clay Bricks",
    category: "Bricks",
    specifications: "Standard · 9×4×3 in · ISI Marked",
    status: "Available",
    productImage: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop"],
  },
  {
    _id: "6", num: "06",
    name: "Sesame Seeds",
    category: "Agricultural",
    specifications: "White · Natural · 99% Purity",
    status: "Available",
    productImage: ["https://images.unsplash.com/photo-1612257416648-2d5a0e08aa04?w=600&h=400&fit=crop"],
  },
  {
    _id: "7", num: "07",
    name: "Groundnuts",
    category: "Agricultural",
    specifications: "Bold · Bold Java · HPS Grade",
    status: "Available",
    productImage: ["https://images.unsplash.com/photo-1567892320421-6a6a4bd0a2ee?w=600&h=500&fit=crop"],
  },
  {
    _id: "8", num: "08",
    name: "Food Products",
    category: "Food Products",
    specifications: "Processed · Export Packed · FSSAI",
    status: "Available",
    productImage: ["https://images.unsplash.com/photo-1606787364406-a3cdf06c6d0c?w=600&h=500&fit=crop"],
  },
  {
    _id: "9", num: "09",
    name: "Coriander Seeds",
    category: "Spices",
    specifications: "Eagle · Scooter · Split Grade",
    status: "Available",
    productImage: ["https://images.unsplash.com/photo-1599909631519-e13f7a8b9b6c?w=600&h=400&fit=crop"],
  },
  {
    _id: "10", num: "10",
    name: "Wheat Flour",
    category: "Food Products",
    specifications: "Chakki Fresh · Fine Milled · Export Grade",
    status: "Available",
    productImage: ["https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&h=500&fit=crop"],
  },
  {
    _id: "11", num: "11",
    name: "Cumin Seeds",
    category: "Spices",
    specifications: "Unjha · Bold · 98% Purity",
    status: "Available",
    productImage: ["https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?w=600&h=600&fit=crop"],
  },
  {
    _id: "12", num: "12",
    name: "Mango Products",
    category: "Food Products",
    specifications: "Alphonso · Kesar · Pulp & Dried",
    status: "Available",
    productImage: ["https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&h=400&fit=crop"],
  },
  {
    _id: "13", num: "13",
    name: "Fly Ash Bricks",
    category: "Bricks",
    specifications: "Light Weight · High Strength · Eco Grade",
    status: "Available",
    productImage: ["https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=450&fit=crop"],
  },
  {
    _id: "14", num: "14",
    name: "Black Pepper",
    category: "Spices",
    specifications: "Malabar · 550 GL · Cleaned",
    status: "Available",
    productImage: ["https://images.unsplash.com/photo-1506368249639-73a05d6f6488?w=600&h=500&fit=crop"],
  },
  {
    _id: "15", num: "15",
    name: "Onion Export",
    category: "Agricultural",
    specifications: "Red · Medium · 40–60mm Grade",
    status: "Available",
    productImage: ["https://images.unsplash.com/photo-1518977956812-cd3dbadaaf31?w=600&h=400&fit=crop"],
  },
  {
    _id: "16", num: "16",
    name: "Cotton Seeds",
    category: "Agricultural",
    specifications: "Hybrid · Delinted · Export Cleaned",
    status: "Un-Available",
    productImage: ["https://images.unsplash.com/photo-1594020293008-5f99f60bd4b5?w=600&h=500&fit=crop"],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// PRODUCT CARD
// ─────────────────────────────────────────────────────────────────────────────

const ProductCard = ({ product, delay }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative rounded-2xl overflow-hidden cursor-pointer w-full h-full"
    >
      {/* ── Image with zoom ── */}
      <motion.img
        src={product.productImage[0]}
        alt={product.name}
        className="w-full h-full object-cover"
        animate={{ scale: hovered ? 1.08 : 1 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* ── Base gradient (always visible) ── */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />

      {/* ── Hover overlay — darkens slightly ── */}
      <motion.div
        className="absolute inset-0 bg-black/25"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* ── Status badge ── */}
      <div className="absolute top-3 left-3 z-10">
        <span
          className={`text-[9px] tracking-widest uppercase px-2 py-1 rounded-full
            ${product.status === "Available"
              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
              : "bg-red-500/20 text-red-300 border border-red-500/30"
            }`}
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {product.status}
        </span>
      </div>

      {/* ── Arrow button ── */}
      <motion.button
        className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-black shadow"
        animate={{ scale: hovered ? 1.1 : 1, opacity: hovered ? 1 : 0.7 }}
        transition={{ duration: 0.3 }}
      >
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
        </svg>
      </motion.button>

      {/* ── Bottom info — always shown ── */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-4">
        <p
          className="text-white/40 text-[9px] tracking-widest uppercase mb-0.5"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {product.num} · {product.category}
        </p>
        <p
          className="text-white text-sm font-light leading-tight"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          {product.name}
        </p>

        {/* ── Specs — reveal on hover ── */}
        <AnimatePresence>
          {hovered && (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.25 }}
              className="text-white/55 text-[10px] mt-1 leading-snug"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {product.specifications}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

const ProductsSection = () => (
  <section
    className="bg-[#f0ede8] pt-6 px-3 md:px-6 pb-6"
    style={{ fontFamily: "'DM Sans', sans-serif" }}
  >
    <div className="bg-white rounded-3xl px-5 md:px-10 py-8 md:py-12">

      {/* Header */}
      <div className="mb-8 md:mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-neutral-900 text-3xl md:text-4xl xl:text-5xl font-light leading-[1.1] whitespace-pre-line"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          {SECTION_HEADING}
        </motion.h2>

        <motion.a
          href="#"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-2 text-xs text-neutral-400 hover:text-neutral-900 transition-colors group self-start md:self-end"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 group-hover:bg-neutral-700 transition-colors" />
          View All Products
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </motion.a>
      </div>

      {/* ── Masonry — CSS columns ── */}
      <style>{`
        .masonry-grid { columns: 2; column-gap: 12px; }
        @media (min-width: 640px)  { .masonry-grid { columns: 3; } }
        @media (min-width: 1024px) { .masonry-grid { columns: 4; } }
        .masonry-grid .m-item {
          display: inline-block;
          width: 100%;
          break-inside: avoid;
          margin-bottom: 12px;
          border-radius: 16px;
          overflow: hidden;
        }
      `}</style>

      <div className="masonry-grid">
        {PRODUCTS.map((p, i) => (
          <div
            key={p._id}
            className="m-item"
            style={{
              height: [280, 360, 220, 320, 260, 300, 240, 340, 300, 260, 380, 220, 310, 270, 350, 240][i % 16] + "px",
            }}
          >
            <ProductCard product={p} delay={i * 0.07} />
          </div>
        ))}
      </div>

    </div>
  </section>
);

export default ProductsSection;