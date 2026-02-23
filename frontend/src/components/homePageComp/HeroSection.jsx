import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const HERO_DATA = {
  companyName: "VR & Sons",
  companySubtitle: "Import Export",
  description: "Trusted exporters of high-quality products for global trade — Food Products, Spices, Agricultural Goods & Bricks.",
  heroImg: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1200&h=900&fit=crop",
  heroImgAlt: "Indian Spices Export",
  secondImg: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=1600&h=900&fit=crop",
  secondImgAlt: "Indian Agricultural Goods",
  stats: {
    countries:    { label: "Countries",    value: "13+ Exports" },
    satisfaction: { label: "Satisfaction", value: "93% Rate" },
    products:     { label: "Products", count: "6+", sublabel: "Varieties" },
  },
};

const TOP_CARDS = [
  { img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=200&fit=crop", label: "Basmati Rice", tag: "Food Products" },
  { img: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=200&fit=crop", label: "Red Chilli", tag: "Spices" },
  { img: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=300&h=200&fit=crop", label: "Turmeric", tag: "Spices" },
  { img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop", label: "Clay Bricks", tag: "Bricks" },
];

const BOTTOM_CARDS = [
  { img: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=300&h=200&fit=crop", label: "13+ Countries", tag: "Active Markets" },
  { img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=300&h=200&fit=crop", label: "93% Satisfied", tag: "Customer Rate" },
  { img: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=300&h=200&fit=crop", label: "6+ Products", tag: "Export Varieties" },
  { img: "https://images.unsplash.com/photo-1588776814546-daab30f310ce?w=300&h=200&fit=crop", label: "Quality First", tag: "Strict Inspection" },
];

// ── Marquee ticker ────────────────────────────────────────────────────────────
const MarqueeTicker = () => {
  const items = [
    "More than 6 varieties of export products",
    "Trusted by buyers in 13+ countries",
    "93% customer satisfaction rate",
    "Premium quality with strict inspection",
    "Global trade from Kamrej, Surat, Gujarat",
  ];
  const text = items.join("  •  ");
  return (
    <div className="overflow-hidden whitespace-nowrap w-full">
      <motion.div
        className="inline-flex gap-0"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 22, ease: "linear", repeat: Infinity }}
        style={{ willChange: "transform" }}
      >
        {[...Array(2)].map((_, i) => (
          <span key={i} className="text-white text-2xl font-light tracking-wide pr-16">
            {text}&nbsp;&nbsp;•&nbsp;&nbsp;
          </span>
        ))}
      </motion.div>
    </div>
  );
};

// ── Card strip component ──────────────────────────────────────────────────────
const CardStrip = ({ cards, direction }) => (
  <motion.div
    className="flex gap-3"
    animate={{ x: direction === "rtl" ? ["0%", "-50%"] : ["-50%", "0%"] }}
    transition={{ duration: 14, ease: "linear", repeat: Infinity }}
    style={{ width: "max-content" }}
  >
    {[...cards, ...cards].map((card, i) => (
      <div
        key={i}
        className="rounded-2xl overflow-hidden shadow-md relative cursor-pointer flex-shrink-0"
        style={{ aspectRatio: "2/3", width: "80px" }}
      >
        <img src={card.img} alt={card.label} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-2">
          <p className="text-white leading-tight font-medium truncate"
            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(0.5rem, 1vw, 0.7rem)" }}>
            {card.label}
          </p>
          <p className="text-white/55 truncate"
            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(0.45rem, 0.8vw, 0.6rem)" }}>
            {card.tag}
          </p>
        </div>
      </div>
    ))}
  </motion.div>
);

// ── Left Panel ────────────────────────────────────────────────────────────────
const LeftPanelAnimation = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="hero-left bg-white relative flex flex-col items-center justify-between overflow-hidden"
      style={{ padding: "1.5rem 1.25rem", minHeight: "88vh", gap: "1rem" }}
    >

      {/* TOP ROW — drops from above, then slides right → left */}
      <motion.div
        initial={{ y: -180, opacity: 0 }}
        animate={mounted ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.9, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
        className="w-full overflow-hidden"
      >
        <CardStrip cards={TOP_CARDS} direction="rtl" />
      </motion.div>

      {/* CENTER */}
      <div className="flex flex-col items-center text-center gap-3 py-4">

        <motion.div
          initial={{ scale: 0.3, opacity: 0 }}
          animate={mounted ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <motion.div
            initial={{ rotate: -30 }}
            animate={mounted ? { rotate: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.52, ease: [0.16, 1, 0.3, 1] }}
            className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center shadow-xl"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </motion.div>
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-neutral-300"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.72, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-0.5"
        >
          <h1
            className="text-neutral-900 font-light tracking-tight leading-none"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(1.7rem, 3.8vw, 2.8rem)" }}
          >
            {HERO_DATA.companyName}
          </h1>
          <p
            className="text-neutral-400 tracking-[0.38em] uppercase"
            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(0.55rem, 0.9vw, 0.7rem)" }}
          >
            {HERO_DATA.companySubtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={mounted ? { scaleX: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="w-10 h-px bg-neutral-200 origin-center"
        />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="text-neutral-500 leading-relaxed"
          style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(0.6rem, 1.1vw, 0.75rem)", maxWidth: "230px" }}
        >
          {HERO_DATA.description}
        </motion.p>

        <motion.a
          href="#products"
          initial={{ opacity: 0, y: 10 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 bg-black text-white rounded-full px-4 py-2 mt-1"
          style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(0.55rem, 0.9vw, 0.7rem)" }}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
          </svg>
          Our Products
        </motion.a>
      </div>

      {/* BOTTOM ROW — rises from below, then slides left → right */}
      <motion.div
        initial={{ y: 180, opacity: 0 }}
        animate={mounted ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full overflow-hidden"
      >
        <CardStrip cards={BOTTOM_CARDS} direction="ltr" />
      </motion.div>

    </div>
  );
};

// ── Main Component ────────────────────────────────────────────────────────────
const HeroSection = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const cardScale          = useTransform(scrollYProgress, [0, 0.5], [1, 0.88]);
  const cardY              = useTransform(scrollYProgress, [0, 0.5], [0, -40]);
  const cardBorderRadius   = useTransform(scrollYProgress, [0, 0.5], [24, 40]);
  const imageScale         = useTransform(scrollYProgress, [0, 0.5], [1, 1.08]);
  const secondY            = useTransform(scrollYProgress, [0.2, 0.7], ["20%", "0%"]);
  const secondOpacity      = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);
  const secondBorderRadius = useTransform(scrollYProgress, [0.2, 0.7], [40, 20]);

  return (
    <div ref={containerRef} className="relative" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>

      {/* ── HERO CARD ── */}
      <section className="sticky top-0 min-h-screen bg-[#f0ede8] flex items-center justify-center pb-4 px-4 md:pb-6 md:px-6 overflow-hidden pt-20">
        <motion.div
          className="w-full max-w-[1400px] overflow-hidden shadow-2xl origin-top"
          style={{ scale: cardScale, y: cardY, borderRadius: cardBorderRadius }}
        >
          <style>{`
            @media (min-width: 768px) {
              .hero-grid  { grid-template-columns: 1fr 1fr !important; min-height: 88vh !important; }
              .hero-right { display: block !important; min-height: 340px !important; }
            }
          `}</style>

          <div
            className="hero-grid"
            style={{ display: "grid", gridTemplateColumns: "1fr", minHeight: "88vh", width: "100%" }}
          >
            <LeftPanelAnimation />

            {/* RIGHT PANEL */}
            <div className="hero-right relative overflow-hidden bg-neutral-100" style={{ minHeight: "320px" }}>
              <motion.img
                src={HERO_DATA.heroImg}
                alt={HERO_DATA.heroImgAlt}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ scale: imageScale }}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-amber-900/20 to-transparent mix-blend-overlay" />

              {/* Stats bar */}
              <motion.div
                initial={{ y: -60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-0 left-0 right-0 bg-white/10 backdrop-blur-md border-b border-white/20 px-4 md:px-6 py-3 flex justify-between z-20"
              >
                <div>
                  <p className="text-white text-xs opacity-80 tracking-widest uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>{HERO_DATA.stats.countries.label}</p>
                  <p className="text-white font-semibold text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>{HERO_DATA.stats.countries.value}</p>
                </div>
                <div className="w-px bg-white/30" />
                <div>
                  <p className="text-white text-xs opacity-80 tracking-widest uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>{HERO_DATA.stats.satisfaction.label}</p>
                  <p className="text-white font-semibold text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>{HERO_DATA.stats.satisfaction.value}</p>
                </div>
              </motion.div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.5, type: "spring", stiffness: 200 }}
                className="absolute top-1/2 left-4 md:left-6 -translate-y-1/2 z-20 bg-white/90 backdrop-blur rounded-2xl p-4 shadow-xl"
              >
                <p className="text-xs text-neutral-400 tracking-widest uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>{HERO_DATA.stats.products.label}</p>
                <p className="text-3xl font-light text-neutral-900">{HERO_DATA.stats.products.count}</p>
                <div className="mt-1 flex gap-1">
                  {[1, 2, 3, 4, 5].map(i => (
                    <motion.div key={i} className="w-4 h-1 rounded-full bg-amber-400"
                      initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                      transition={{ delay: 1.6 + i * 0.05 }}
                    />
                  ))}
                </div>
                <p className="text-xs text-neutral-500 mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>{HERO_DATA.stats.products.sublabel}</p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── SECOND SECTION ── */}
      <section className="relative min-h-screen bg-[#f0ede8] flex items-center justify-center py-4 px-4 md:py-6 md:px-6">
        <motion.div
          className="w-full max-w-[1400px] overflow-hidden shadow-2xl relative"
          style={{
            y: secondY,
            opacity: secondOpacity,
            borderRadius: secondBorderRadius,
            minHeight: "60vh",
            height: "88vh",
            maxHeight: "88vh",
          }}
        >
          <img src={HERO_DATA.secondImg} alt={HERO_DATA.secondImgAlt} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <MarqueeTicker />
          </div>
        </motion.div>
      </section>

    </div>
  );
};

export default HeroSection;