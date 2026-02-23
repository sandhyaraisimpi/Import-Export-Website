import React, { useState } from "react";
import { motion } from "framer-motion";

// ─────────────────────────────────────────────────────────────────────────────
// ██████  DATA — Edit all product category content here
// ─────────────────────────────────────────────────────────────────────────────

const DISCOVER_SECTION = {
  heading: "Discover Our\nProduct Categories",
};

const PRODUCT_TYPES = [
  {
    id: 1, label: "Basmati Rice", num: "01",
    img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&h=500&fit=crop",
  },
  {
    id: 2, label: "Indian Spices", num: "02",
    img: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&h=700&fit=crop",
  },
  {
    id: 3, label: "Turmeric & Powder", num: "03",
    img: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&h=500&fit=crop",
  },
  {
    id: 4, label: "Agricultural Goods", num: "04",
    img: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=700&h=500&fit=crop",
  },
  {
    id: 5, label: "Premium Bricks", num: "05",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=500&fit=crop",
  },
  {
    id: 6, label: "Sesame Seeds", num: "06",
    img: "https://images.unsplash.com/photo-1612257416648-2d5a0e08aa04?w=700&h=400&fit=crop",
  },
  {
    id: 7, label: "Groundnuts", num: "07",
    img: "https://images.unsplash.com/photo-1567892320421-6a6a4bd0a2ee?w=600&h=400&fit=crop",
  },
  {
    id: 8, label: "Food Products", num: "08",
    img: "https://images.unsplash.com/photo-1606787364406-a3cdf06c6d0c?w=600&h=400&fit=crop",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// INTERNAL SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

const ArrowUpRight = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

const ProductTypeCard = ({ pt, delay }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative rounded-2xl overflow-hidden cursor-pointer w-full h-full"
    >
      <motion.img
        src={pt.img}
        alt={pt.label}
        className="w-full h-full object-cover"
        animate={{ scale: hovered ? 1.07 : 1 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />
      <motion.button
        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-black shadow"
        animate={{ scale: hovered ? 1.12 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <ArrowUpRight size={11} />
      </motion.button>
      <div className="absolute bottom-3 left-4 z-10">
        <p className="text-white/50 text-[9px] tracking-widest uppercase mb-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>{pt.num}</p>
        <p className="text-white text-sm font-light" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>{pt.label}</p>
      </div>
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

const DiscoverCategoriesSection = () => (
  <section className="bg-[#f0ede8] pt-6 px-3 md:px-6 pb-12" style={{ fontFamily: "'DM Sans', sans-serif" }}>
    <div className="bg-white rounded-3xl overflow-hidden px-5 md:px-10 py-8 md:py-12">

      {/* Header */}
      <div className="mb-8 md:mb-10 text-center relative">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-neutral-900 text-3xl md:text-4xl xl:text-5xl font-light leading-[1.1] whitespace-pre-line"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          {DISCOVER_SECTION.heading}
        </motion.h2>
      </div>

      {/* Mobile grid: 2 cols */}
      <div className="block md:hidden">
        <div className="grid grid-cols-2 gap-3">
          {PRODUCT_TYPES.map((pt, i) => (
            <div key={pt.id} style={{ aspectRatio: "4/3" }}>
              <ProductTypeCard pt={pt} delay={i * 0.05} />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Pinterest-style masonry grid */}
      <div className="hidden md:grid grid-cols-4 gap-3" style={{ height: "680px" }}>
        {/* Col 1 */}
        <div className="row-span-2" style={{ gridColumn: 1, gridRow: "1 / 3" }}>
          <ProductTypeCard pt={PRODUCT_TYPES[0]} delay={0.05} />
        </div>
        <div style={{ gridColumn: 1, gridRow: 3 }}>
          <ProductTypeCard pt={PRODUCT_TYPES[5]} delay={0.3} />
        </div>
        {/* Col 2 — tall */}
        <div className="row-span-3" style={{ gridColumn: 2, gridRow: "1 / 4" }}>
          <ProductTypeCard pt={PRODUCT_TYPES[1]} delay={0.1} />
        </div>
        {/* Col 3 */}
        <div style={{ gridColumn: 3, gridRow: 1 }}>
          <ProductTypeCard pt={PRODUCT_TYPES[2]} delay={0.15} />
        </div>
        <div style={{ gridColumn: 3, gridRow: 2 }}>
          <ProductTypeCard pt={PRODUCT_TYPES[6]} delay={0.25} />
        </div>
        <div style={{ gridColumn: 3, gridRow: 3 }}>
          <ProductTypeCard pt={PRODUCT_TYPES[7]} delay={0.35} />
        </div>
        {/* Col 4 */}
        <div className="row-span-2" style={{ gridColumn: 4, gridRow: "1 / 3" }}>
          <ProductTypeCard pt={PRODUCT_TYPES[3]} delay={0.2} />
        </div>
        <div style={{ gridColumn: 4, gridRow: 3 }}>
          <ProductTypeCard pt={PRODUCT_TYPES[4]} delay={0.3} />
        </div>
      </div>

    </div>
  </section>
);

export default DiscoverCategoriesSection;
