import React from "react";
import { motion } from "framer-motion";
import GlitchButton from "../../includes/GlitchButton";
import Stats from "./StatsSection";

const WhyGraphuraSection = () => {
  return (
    <section className="bg-neutral-200 py-32">

      <div className="max-w-[1500px] mx-auto px-8">
        
        {/* Heading ko card ke andar move kiya gaya hai for better alignment */}
        <div className="bg-white rounded-3xl p-16 shadow-xl grid md:grid-cols-2 gap-16 items-center">

          {/* LEFT SIDE */}
          <div>
            <p className="text-neutral-500 mb-2 font-medium tracking-wide uppercase">
              • About Us
            </p>
            <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-neutral-900 leading-tight">
              VR & Sons <br /> Import Export
            </h2>

            <p className="text-neutral-600 mb-6 leading-relaxed">
              VR & Sons Import Export is a professionally managed trading company
              dedicated to exporting high-quality products to international markets.
              With a strong commitment to reliability, transparency, and long-term
              business relationships, we bridge the gap between trusted manufacturers
              and global buyers.
            </p>

            <div className="flex items-center gap-4 mb-12">
              <img
                src="https://images.unsplash.com/photo-1607746882042-944635dfe10e"
                className="w-12 h-12 rounded-full object-cover"
                alt="Team"
              />
              <p className="text-sm font-semibold text-neutral-800">
                Meet Our Professional Export Team
              </p>
            </div>

            {/* COUNTERS */}
            <Stats />

          </div>

          {/* RIGHT SIDE */}
          {/* Overflow-hidden zaruri hai taaki zoom hone par image div se bahar na nikle */}
          <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-lg group">

            {/* Infinite Slow Zoom Animation added here */}
            <motion.img
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d"
              alt="Global Shipping"
              className="absolute inset-0 w-full h-full object-cover"
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />

            {/* Image ke upar halka dark overlay taaki text aur button clear dikhein */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-500"></div>

            {/* Contact Button */}
            <div className="absolute top-6 right-6 z-10">
              <GlitchButton text="Contact Us" />
            </div>

            {/* Overlay Gradient below text for better readability */}
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent z-0"></div>

            {/* Overlay Text */}
            <motion.div
              className="absolute bottom-6 left-6 right-6 text-white text-lg font-semibold z-10"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Connecting Global Markets With Trusted Suppliers
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default WhyGraphuraSection;