import React from "react";
import { motion } from "framer-motion";
import DownloadButton from "../../includes/DownloadButton"; 
import video from "../../assets/new-right-video.mp4"; // Aapka imported video

// --- UPDATED DATA (AS PER PDF) ---
const heroData = {
  leftBg: "https://images.unsplash.com/photo-1586528116311-ad8ed7c152a5", 
  titleLeft: "VR & Sons Import Export", 
  titleCenter: "Trusted exporters of high-quality products for global trade.", 
};

// PDF Requirement: 4 photos scrolling upside, 4 downside logic
const scrollImages = [
  "https://images.unsplash.com/photo-1596040033229-a9821ebd058d", // Spices
  "https://images.unsplash.com/photo-1542838132-92c53300491e", // Agricultural
  "https://images.unsplash.com/photo-1518709766631-a6a7f4e921c4", // Bricks
  "https://images.unsplash.com/photo-1550989460-0adf9ea622e2", // Food
];

// Reusable Scrolling Column Component
const VerticalScroll = ({ images, direction = "up" }) => {
  const isUp = direction === "up";
  return (
    <div className="flex flex-col gap-4 overflow-hidden h-full py-4">
      <motion.div
        animate={{ y: isUp ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="flex flex-col gap-4"
      >
        {/* Array ko double kiya taaki infinite scroll smooth rahe */}
        {[...images, ...images].map((img, idx) => (
          // shrink-0 add kiya taaki images height me dabe nahi
          <div key={idx} className="w-32 h-40 md:w-40 md:h-52 shrink-0 rounded-2xl overflow-hidden shadow-xl">
            <img src={img} alt="Product" className="w-full h-full object-cover" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const HeroSection = () => {
  return (
    <section className="bg-neutral-200 min-h-screen pt-32 pb-40">
      <div className="max-w-[1500px] mx-auto px-8">
        <div className="grid md:grid-cols-2 h-[80vh] rounded-3xl overflow-hidden shadow-2xl">

          {/* LEFT SECTION (With PDF Scroll Requirement) */}
          <div className="relative h-full overflow-hidden bg-neutral-900">
            {/* Background Image */}
            <motion.img
              src={heroData.leftBg}
              alt="Left Background"
              className="absolute inset-0 w-full h-full object-cover opacity-40"
              initial={false}
              animate={{ scale: [1.15, 1] }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />

            {/* Vertical Sliders - 4 Columns as per PDF logic */}
            <div className="absolute inset-0 flex justify-center gap-4 z-20 px-4">
               <VerticalScroll images={scrollImages} direction="up" />
               <VerticalScroll images={scrollImages} direction="down" />
               <VerticalScroll images={scrollImages} direction="up" />
               <VerticalScroll images={scrollImages} direction="down" />
            </div>
          </div>

          {/* RIGHT SECTION (Now with Video Background) */}
          <div className="relative h-full overflow-hidden">
            
            {/* Background Video element */}
            <motion.video
              src={video}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              initial={false}
              animate={{ scale: [1.15, 1] }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />

            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/50"></div> 

            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 z-20 px-12 text-center"> 
              <motion.h1 
                className="text-4xl md:text-5xl font-bold text-white mb-6"
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {heroData.titleLeft}
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl text-white/90 max-w-lg mx-auto mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {heroData.titleCenter}
              </motion.p>

              <motion.div 
                className="flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <DownloadButton /> 
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;