import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

// ─────────────────────────────────────────────────────────────────────────────
// ██████  DATA — Edit stats here
// ─────────────────────────────────────────────────────────────────────────────

const STATS = [
  { target: 13, suffix: "+", label: "Countries Exported" },
  { target: 6,  suffix: "+", label: "Variety of Products" },
  { target: 93, suffix: "%", label: "Customer Satisfaction" },
];

// ─────────────────────────────────────────────────────────────────────────────
// CountUp
// ─────────────────────────────────────────────────────────────────────────────

const CountUp = ({ target, suffix = "", duration = 1.8 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!inView) return;
    let startTime = null;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
      else setCount(target);
    };
    requestAnimationFrame(animate);
  }, [inView, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

const StatsSection = () => (
  <section className="bg-[#f0ede8] px-6 pt-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
    <div className="bg-neutral-900 rounded-3xl overflow-hidden px-10 md:px-14 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <p
              className="text-white text-5xl md:text-6xl font-light mb-2 tabular-nums"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              <CountUp target={stat.target} suffix={stat.suffix} duration={1.5 + i * 0.2} />
            </p>
            <p className="text-neutral-400 text-xs tracking-widest uppercase">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default StatsSection;