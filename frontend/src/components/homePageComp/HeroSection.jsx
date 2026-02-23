import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const HERO_DATA = {
  companyName: "VR & Sons",
  companySubtitle: "Import Export",
  heroImg:
    "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1200&h=900&fit=crop",
};

const TOP_CARDS = [
  {
    img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=200&fit=crop",
  },
  {
    img: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=200&fit=crop",
  },
  {
    img: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=300&h=200&fit=crop",
  },
  {
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
  },
];

const VerticalColumn = ({ cards, direction = "up" }) => {
  return (
    <div className="overflow-hidden h-full w-full">
      <motion.div
        className="flex flex-col gap-5"
        animate={{
          y: direction === "up" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          duration: 22,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {[...cards, ...cards].map((card, i) => (
          <div
            key={i}
            className="rounded-2xl overflow-hidden opacity-70"
            style={{ aspectRatio: "2/3" }}
          >
            <img src={card.img} alt="" className="w-full h-full object-cover" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const LeftPanel = () => {
  return (
    <div className="bg-white flex items-center justify-start pl-24 overflow-hidden">
      <div
        className="grid grid-cols-3 gap-6 w-full max-w-[380px]"
        style={{
          height: "75vh",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
        }}
      >
        <VerticalColumn cards={TOP_CARDS} direction="up" />
        <VerticalColumn cards={TOP_CARDS} direction="down" />
        <VerticalColumn cards={TOP_CARDS} direction="up" />
      </div>
    </div>
  );
};

const HeroSection = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -40]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.08]);

  return (
    <div ref={containerRef}
      className="relative pt-[90px]"
      style={{ fontFamily: "'Cormorant Garamond', serif" }}
    >
      <section className="sticky top-[90px] h-[calc(100vh-90px)] bg-[#f0ede8] flex items-center justify-center px-6 overflow-hidden">
        <motion.div
          className="w-full max-w-[1500px] overflow-hidden shadow-2xl"
          style={{ scale, y, borderRadius: 32 }}
          initial={{ scale: 0.96, filter: "blur(12px)" }}
          animate={isLoaded ? { scale: 1, filter: "blur(0px)" } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="relative"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.2fr",
              minHeight: "85vh",
            }}
          >
            {/* LEFT */}
            <LeftPanel />

            {/* CENTER TEXT */}
            <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <h1 className="text-8xl font-light tracking-tight text-neutral-900">
                  {HERO_DATA.companyName}
                </h1>

                <p className="uppercase tracking-[0.6em] text-sm text-neutral-600 mt-6">
                  {HERO_DATA.companySubtitle}
                </p>
              </motion.div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="relative overflow-hidden">
              <motion.img
                src={HERO_DATA.heroImg}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                style={{ scale: imageScale }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/20 to-transparent" />
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default HeroSection;
