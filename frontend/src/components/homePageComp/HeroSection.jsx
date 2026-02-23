import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const HERO_DATA = {
  companyName: "VR & Sons",
  companySubtitle: "Import Export",
};

const SLIDE_IMAGES = [
  {
    img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=600&fit=crop",
  },
  {
    img: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=600&fit=crop",
  },
  {
    img: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&h=600&fit=crop",
  },
  {
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=600&fit=crop",
  },
];

const VerticalColumn = ({ direction = "up" }) => {
  return (
    <div className="overflow-hidden h-full w-full">
      <motion.div
        className="flex flex-col gap-6"
        animate={{
          y: direction === "up" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          duration: 25,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {[...SLIDE_IMAGES, ...SLIDE_IMAGES].map((card, i) => (
          <div
            key={i}
            className="rounded-3xl overflow-hidden opacity-70"
            style={{ aspectRatio: "2/3" }}
          >
            <img src={card.img} alt="" className="w-full h-full object-cover" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const HeroSection = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.92]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -40]);

  return (
    <div
      ref={containerRef}
      className="relative pt-[90px]"
      style={{ fontFamily: "'Playfair Display', serif" }}
    >
      <section className="sticky top-[90px] h-[calc(100vh-90px)] bg-[#f0ede8] flex items-center justify-center px-6 overflow-hidden">
        <motion.div
          className="relative w-full max-w-[1600px] h-[85vh] shadow-2xl overflow-hidden"
          style={{ scale, y, borderRadius: 32 }}
        >
          {/* 4 COLUMN MOVING GRID */}
          <div
            className="absolute inset-0 grid grid-cols-4 gap-6 p-10"
            style={{
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
              maskImage:
                "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
            }}
          >
            <VerticalColumn direction="up" />
            <VerticalColumn direction="down" />
            <VerticalColumn direction="up" />
            <VerticalColumn direction="down" />
          </div>

          {/* OVERLAY for text readability */}
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]" />

          {/* CENTER TEXT */}
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            <div className="text-center">
              <h1 className="text-8xl font-light tracking-tight text-neutral-900">
                {HERO_DATA.companyName}
              </h1>

              <p className="uppercase tracking-[0.6em] text-sm text-neutral-700 mt-6">
                {HERO_DATA.companySubtitle}
              </p>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default HeroSection;
