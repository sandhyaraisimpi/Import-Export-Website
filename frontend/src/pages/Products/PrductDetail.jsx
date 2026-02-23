import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Tag,
  Layers,
  ImageIcon,
  Package,
  Calendar,
  Hash,
} from "lucide-react";

// ═══════════════════════════════════════════════════════════════
//  MOCK DATA — Replace with your API response
//  Shape mirrors: productSchema + populated categoryId & subCategoryId
// ═══════════════════════════════════════════════════════════════

const MOCK_PRODUCT = {
  _id: "prod_001",

  // Populated refs (your API can populate these or pass via route state)
  categoryId: {
    _id: "cat_001",
    name: "Textiles",
  },
  subCategoryId: {
    _id: "sub_001",
    name: "Raw Cotton",
    skuId: "SKU-TC-001",
  },

  // Core fields — matches productSchema exactly
  name: "Gujarat Pima Bale",
  skuId: "SKU-P-0011",
  description:
    "Extra-long staple Pima cotton sourced exclusively from the Saurashtra region of Gujarat, India. Grown in certified fields with regulated irrigation, this variety is prized for its exceptional fibre uniformity and low trash content. Ideal for combed ring-spun yarn in counts Ne40 and above. Each bale is press-packed and moisture-sealed for long transit stability.",
  specifications:
    "Grade: ELS | Staple Length: 34mm | Micronaire: 3.8 | Uniformity: 87% | Strength: 32 g/tex | Elongation: 7.2% | Moisture: <8% | Colour: Gd/SLM | Trash: <1.5% | Pack Weight: 170kg | Press: Automatic Square Bale",
  status: "Available",
  productImage: [
    "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=1000&q=85",
    "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=1000&q=85",
    "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=1000&q=85",
    "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=1000&q=85",
  ],

  // timestamps (from MongoDB)
  createdAt: "2024-11-14T08:22:00.000Z",
  updatedAt: "2025-01-03T10:45:00.000Z",
};

// ═══════════════════════════════════════════════════════════════

// Parse specifications string into key-value pairs for display
const parseSpecifications = (specStr) => {
  return specStr.split("|").map((item) => {
    const [key, ...rest] = item.split(":");
    return { key: key?.trim(), value: rest.join(":").trim() };
  });
};

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

export default function ProductDetail() {
  const product = MOCK_PRODUCT;
  const specs = parseSpecifications(product.specifications);
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="bg-[#0D0D0D] min-h-screen text-white font-sans">

      {/* ── BREADCRUMB NAV ───────────────────────────────────── */}
      <div className="sticky top-0 z-50 bg-[#0D0D0D]/95 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.35em] text-white/25">
          <button className="flex items-center gap-1.5 hover:text-[#C36A4D] transition-colors">
            <ArrowLeft size={10} />
            {product.categoryId.name}
          </button>
          <ChevronRight size={9} className="text-white/10" />
          <button className="hover:text-[#C36A4D] transition-colors">
            {product.subCategoryId.name}
          </button>
          <ChevronRight size={9} className="text-white/10" />
          <span className="text-white/50">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 lg:grid-cols-2 gap-16">

        {/* ── LEFT — IMAGE GALLERY ─────────────────────────── */}
        <div className="flex flex-col gap-4">

          {/* Main Image */}
          <motion.div
            key={activeImage}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-[#111]"
          >
            {product.productImage.length > 0 ? (
              <img
                src={product.productImage[activeImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ImageIcon size={40} className="text-white/10" />
              </div>
            )}

            {/* Status overlay badge */}
            <div className="absolute top-4 left-4">
              {product.status === "Available" ? (
                <span className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.3em] text-emerald-400 bg-black/70 backdrop-blur px-3 py-1.5 rounded-full border border-emerald-400/25">
                  <CheckCircle2 size={10} /> In Stock
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.3em] text-red-400 bg-black/70 backdrop-blur px-3 py-1.5 rounded-full border border-red-400/25">
                  <XCircle size={10} /> Out of Stock
                </span>
              )}
            </div>

            {/* Image counter */}
            {product.productImage.length > 1 && (
              <div className="absolute bottom-4 right-4 text-[9px] font-black text-white/30 bg-black/50 backdrop-blur px-3 py-1.5 rounded-full">
                {activeImage + 1} / {product.productImage.length}
              </div>
            )}
          </motion.div>

          {/* Thumbnail strip */}
          {product.productImage.length > 1 && (
            <div className="flex gap-3">
              {product.productImage.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`relative flex-1 aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300
                    ${activeImage === i
                      ? "border-[#C36A4D] shadow-[0_0_20px_rgba(195,106,77,0.3)]"
                      : "border-white/5 opacity-40 hover:opacity-70"
                    }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── RIGHT — PRODUCT INFO ─────────────────────────── */}
        <div className="flex flex-col gap-8">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* SKU + Category tags */}
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <span className="flex items-center gap-1.5 text-[9px] font-mono text-white/30 bg-white/5 border border-white/8 px-3 py-1.5 rounded-full">
                <Hash size={9} /> {product.skuId}
              </span>
              <span className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-[#C36A4D] bg-[#C36A4D]/10 border border-[#C36A4D]/20 px-3 py-1.5 rounded-full">
                <Tag size={9} /> {product.categoryId.name}
              </span>
              <span className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-white/40 bg-white/5 border border-white/8 px-3 py-1.5 rounded-full">
                <Package size={9} /> {product.subCategoryId.name}
              </span>
            </div>

            <h1 className="text-white font-black uppercase tracking-tighter leading-[0.85] mb-5"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}>
              {product.name}
            </h1>

            <p className="text-white/45 text-[15px] leading-[1.8] font-light">
              {product.description}
            </p>
          </motion.div>

          {/* Divider */}
          <div className="h-px bg-white/5" />

          {/* Specifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-5">
              <Layers size={14} className="text-[#C36A4D]" />
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">
                Specifications
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {specs.map((spec, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + i * 0.04 }}
                  className="flex items-start justify-between gap-4 bg-white/3 border border-white/5 rounded-xl px-4 py-3 hover:border-white/10 transition-colors"
                >
                  <span className="text-[9px] font-black uppercase tracking-[0.25em] text-white/25 flex-shrink-0 mt-0.5">
                    {spec.key}
                  </span>
                  <span className="text-[11px] font-mono text-white/65 text-right leading-snug">
                    {spec.value}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Divider */}
          <div className="h-px bg-white/5" />

          {/* Meta — timestamps & IDs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-5"
          >
            <div>
              <p className="text-[8px] font-black uppercase tracking-[0.35em] text-white/20 mb-1 flex items-center gap-1.5">
                <Calendar size={8} /> Listed
              </p>
              <p className="text-[11px] font-mono text-white/40">{formatDate(product.createdAt)}</p>
            </div>
            <div>
              <p className="text-[8px] font-black uppercase tracking-[0.35em] text-white/20 mb-1 flex items-center gap-1.5">
                <Calendar size={8} /> Updated
              </p>
              <p className="text-[11px] font-mono text-white/40">{formatDate(product.updatedAt)}</p>
            </div>
            <div>
              <p className="text-[8px] font-black uppercase tracking-[0.35em] text-white/20 mb-1">Subcategory SKU</p>
              <p className="text-[11px] font-mono text-white/40">{product.subCategoryId.skuId}</p>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 pt-2"
          >
            <button className="flex-1 px-6 py-4 rounded-2xl bg-[#C36A4D] text-white text-[11px] font-black uppercase tracking-[0.35em] hover:bg-[#d4785a] transition-all duration-300 hover:shadow-[0_15px_40px_rgba(195,106,77,0.35)]">
              Send Inquiry
            </button>
            <button className="flex-1 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white/60 text-[11px] font-black uppercase tracking-[0.35em] hover:bg-white/10 hover:text-white transition-all duration-300">
              Download Spec Sheet
            </button>
          </motion.div>
        </div>

      </div>

      {/* ── FULL-WIDTH SPEC STRIP ───────────────────────────── */}
      <div className="border-t border-white/5 mt-4 py-6 overflow-hidden">
        <div className="flex gap-10 px-6 animate-none whitespace-nowrap overflow-x-auto scrollbar-hide max-w-7xl mx-auto">
          {specs.map((spec, i) => (
            <div key={i} className="flex items-center gap-3 flex-shrink-0">
              <span className="text-[8px] font-black uppercase tracking-widest text-white/20">{spec.key}</span>
              <span className="text-[11px] font-mono text-white/50">{spec.value}</span>
              {i < specs.length - 1 && <div className="w-px h-4 bg-white/10 ml-4" />}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}