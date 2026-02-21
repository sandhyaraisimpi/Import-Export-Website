import React, { useRef ,useState ,useEffect} from "react";
import { motion, useScroll, useTransform,useInView  } from "framer-motion";
import GlitchButton from "./includes/GlitchButton";
import DownloadButton from "./includes/DownloadButton";
import heroVideo from "./assets/hero-video.mp4";












//Number animation code
const useCounter = (end, isVisible, duration = 2000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const increment = end / (duration / 16);

    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(counter);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(counter);
  }, [end, duration, isVisible]);

  return count;
};





const Stats = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const transactions = useCounter(67, isInView);
  const satisfaction = useCounter(66, isInView);
  const properties = useCounter(336, isInView);

  return (
    <div ref={ref} className="space-y-10">

      <div className="flex items-center gap-6">
        <h2 className="text-5xl font-bold text-neutral-900">
          {transactions}+
        </h2>
        <p className="text-neutral-600">
          Successful Transactions Monthly
        </p>
      </div>

      <div className="flex items-center gap-6">
        <h2 className="text-5xl font-bold text-neutral-900">
          {satisfaction}%
        </h2>
        <p className="text-neutral-600">
          Customer Satisfaction Rate
        </p>
      </div>

      <div className="flex items-center gap-6">
        <h2 className="text-5xl font-bold text-neutral-900">
          {properties}
        </h2>
        <p className="text-neutral-600">
          Exquisite Properties Ready For Selection
        </p>
      </div>

    </div>
  );
};






//MASONRY LAYOUT
const propertyCards = [
  // COLUMN 1
  { id: "01", title: "Luxury Villas", height: "h-[280px]", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop" },
  { id: "06", title: "Commercial", height: "h-[400px]", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" },
  // COLUMN 2
  { id: "02", title: "Penthouse Suites", height: "h-[420px]", img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop" },
  { id: "07", title: "Townhouses", height: "h-[320px]", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop" },
  // COLUMN 3
  { id: "03", title: "Apartments", height: "h-[300px]", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2000&auto=format&fit=crop" },
  { id: "08", title: "Waterfront Homes", height: "h-[440px]", img: "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?q=80&w=2073&auto=format&fit=crop" },
  // COLUMN 4
  { id: "04", title: "Beachfront Properties", height: "h-[280px]", img: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070&auto=format&fit=crop" },
  { id: "09", title: "Holiday Homes", height: "h-[260px]", img: "https://images.unsplash.com/photo-1499916078039-922301b0eb9b?q=80&w=2000&auto=format&fit=crop" },
  { id: "05", title: "Golf Course Residences", height: "h-[260px]", img: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1974&auto=format&fit=crop" },
];






















const Homepage = () => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  });

  // Subtle scale (professional feel)
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1.05]);




  //Number animation section logic
  



























  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <section className="bg-neutral-200 min-h-screen pt-16 pb-40">
        <div className="max-w-[1500px] mx-auto px-8">
          <div className="grid md:grid-cols-2 h-[80vh] rounded-3xl overflow-hidden shadow-2xl">

            {/* LEFT */}
            <div className="relative h-full overflow-hidden">

              <motion.img
                src="https://images.unsplash.com/photo-1518684079-3c830dcef090"
                alt="Left"
                className="absolute inset-0 w-full h-full object-cover"
                initial={false}
                animate={{ scale: [1.15, 1] }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />

              <div className="absolute inset-0 bg-black/10"></div>

              <motion.div
                className="absolute top-6 left-6 z-20"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                ⭐
              </motion.div>

              <div className="relative z-10 h-full flex flex-col justify-center items-center text-white text-center px-8">
                <motion.h2
                  className="text-4xl font-bold mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                >
                  Graphura
                </motion.h2>

                <motion.p
                  className="mb-6 max-w-md text-2xl"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 0.3 }}
                >
                  Real estate in Dubai ideal for living and investing.
                </motion.p>
              </div>

              <div className="absolute bottom-6 left-6 z-20">
                <GlitchButton text="Call Now" />
              </div>
            </div>

            {/* RIGHT */}
            <div className="relative h-full overflow-hidden">

  {/* Background Image */}
  <motion.img
    src="https://images.unsplash.com/photo-1546412414-e1885259563a"
    alt="Right"
    className="absolute inset-0 w-full h-full object-cover"
    initial={false}
    animate={{ scale: [1.15, 1] }}
    transition={{ duration: 1.2, ease: "easeOut" }}
  />

  {/* Overlay */}
  <div className="absolute inset-0 bg-black/25"></div>

  {/* Top Section */}
  <div className="absolute top-6 left-0 right-0 z-20 px-8">

    <div className="grid grid-cols-3 items-center text-white text-sm">

      {/* Left Para */}
      <motion.p
        className="text-left"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: -2 }}
        transition={{ duration: 1.5, ease: "anticipate" }}
      >
        Luxury Apartments
      </motion.p>

      {/* Center Para */}
      <motion.p
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: -2 }}
        transition={{ duration: 1.5, delay: 0.2, ease: "anticipate" }}
      >
        Starting from $500K
      </motion.p>

      {/* Right Download Button */}
      <div className="flex justify-end">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: -2 }}
          transition={{ duration: 1.5, delay: 0.4, ease: "anticipate" }}
        >
          <DownloadButton />
        </motion.div>
      </div>

    </div>

  </div>

</div>
          </div>
        </div>
      </section>

      {/* ================= VIDEO SECTION ================= */}
      <section ref={ref} className="bg-neutral-100 py-40">
        <div className="max-w-[1500px] mx-auto px-8 flex justify-center">

          <motion.div
            style={{ scale }}
            className="w-[1100px] h-[600px] max-w-full rounded-3xl overflow-hidden shadow-2xl origin-top"
          >
            <video
              src={heroVideo}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          </motion.div>

        </div>
      </section>



<section className="bg-[#111111] py-32">
  <div className="max-w-[1500px] mx-auto px-8">

    <div className="grid md:grid-cols-2 gap-10">

      {/* CARD 1 */}
      <div className="relative h-[420px] rounded-3xl overflow-hidden group cursor-pointer transition duration-300 hover:-translate-y-2">

        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
          className="absolute inset-0 w-full h-full object-cover scale-110 transition-transform duration-700 group-hover:scale-100"
          alt="Palm Villa"
        />

        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition duration-500"></div>

        <div className="absolute top-6 left-6 text-white text-xl font-semibold z-20">
          Palm Villa
        </div>

        <div className="absolute top-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition duration-500">
          <div className="w-10 h-10 flex items-center justify-center bg-white text-black rounded-full transition-transform duration-300 group-hover:rotate-45">
            →
          </div>
        </div>

        <div className="absolute bottom-6 left-6 right-6 z-20 flex gap-4 opacity-0 translate-y-10 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
          <div className="flex-1 bg-white/20 backdrop-blur-md text-white p-4 rounded-xl text-sm">
            <p className="font-semibold">Import</p>
            <p>Italian Marble</p>
          </div>
          <div className="flex-1 bg-white/20 backdrop-blur-md text-white p-4 rounded-xl text-sm">
            <p className="font-semibold">Export</p>
            <p>Luxury Decor</p>
          </div>
        </div>
      </div>


      {/* CARD 2 */}
      <div className="relative h-[420px] rounded-3xl overflow-hidden group cursor-pointer transition duration-300 hover:-translate-y-2">

        <img
          src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
          className="absolute inset-0 w-full h-full object-cover scale-110 transition-transform duration-700 group-hover:scale-100"
          alt="Downtown Apartment"
        />

        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition duration-500"></div>

        <div className="absolute top-6 left-6 text-white text-xl font-semibold z-20">
          Downtown Apartment
        </div>

        <div className="absolute top-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition duration-500">
          <div className="w-10 h-10 flex items-center justify-center bg-white text-black rounded-full transition-transform duration-300 group-hover:rotate-45">
            →
          </div>
        </div>

        <div className="absolute bottom-6 left-6 right-6 z-20 flex gap-4 opacity-0 translate-y-10 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
          <div className="flex-1 bg-white/20 backdrop-blur-md text-white p-4 rounded-xl text-sm">
            <p className="font-semibold">Import</p>
            <p>Premium Fixtures</p>
          </div>
          <div className="flex-1 bg-white/20 backdrop-blur-md text-white p-4 rounded-xl text-sm">
            <p className="font-semibold">Export</p>
            <p>European Clients</p>
          </div>
        </div>
      </div>


      {/* CARD 3 */}
      <div className="relative h-[420px] rounded-3xl overflow-hidden group cursor-pointer transition duration-300 hover:-translate-y-2">

        <img
          src="https://images.unsplash.com/photo-1613977257363-707ba9348227"
          className="absolute inset-0 w-full h-full object-cover scale-110 transition-transform duration-700 group-hover:scale-100"
          alt="Luxury Penthouse"
        />

        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition duration-500"></div>

        <div className="absolute top-6 left-6 text-white text-xl font-semibold z-20">
          Luxury Penthouse
        </div>

        <div className="absolute top-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition duration-500">
          <div className="w-10 h-10 flex items-center justify-center bg-white text-black rounded-full transition-transform duration-300 group-hover:rotate-45">
            →
          </div>
        </div>

        <div className="absolute bottom-6 left-6 right-6 z-20 flex gap-4 opacity-0 translate-y-10 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
          <div className="flex-1 bg-white/20 backdrop-blur-md text-white p-4 rounded-xl text-sm">
            <p className="font-semibold">Import</p>
            <p>Smart Systems</p>
          </div>
          <div className="flex-1 bg-white/20 backdrop-blur-md text-white p-4 rounded-xl text-sm">
            <p className="font-semibold">Export</p>
            <p>High-Net Clients</p>
          </div>
        </div>
      </div>


      {/* CARD 4 */}
      <div className="relative h-[420px] rounded-3xl overflow-hidden group cursor-pointer transition duration-300 hover:-translate-y-2">

        <img
          src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688"
          className="absolute inset-0 w-full h-full object-cover scale-110 transition-transform duration-700 group-hover:scale-100"
          alt="Beachfront Property"
        />

        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition duration-500"></div>

        <div className="absolute top-6 left-6 text-white text-xl font-semibold z-20">
          Beachfront Property
        </div>

        <div className="absolute top-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition duration-500">
          <div className="w-10 h-10 flex items-center justify-center bg-white text-black rounded-full transition-transform duration-300 group-hover:rotate-45">
            →
          </div>
        </div>

        <div className="absolute bottom-6 left-6 right-6 z-20 flex gap-4 opacity-0 translate-y-10 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
          <div className="flex-1 bg-white/20 backdrop-blur-md text-white p-4 rounded-xl text-sm">
            <p className="font-semibold">Import</p>
            <p>Ocean Equipment</p>
          </div>
          <div className="flex-1 bg-white/20 backdrop-blur-md text-white p-4 rounded-xl text-sm">
            <p className="font-semibold">Export</p>
            <p>International Resorts</p>
          </div>
        </div>
      </div>


      {/* CARD 5 */}
      <div className="relative h-[420px] rounded-3xl overflow-hidden group cursor-pointer transition duration-300 hover:-translate-y-2">

        <img
          src="https://images.unsplash.com/photo-1493809842364-78817add7ffb"
          className="absolute inset-0 w-full h-full object-cover scale-110 transition-transform duration-700 group-hover:scale-100"
          alt="Modern Studio"
        />

        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition duration-500"></div>

        <div className="absolute top-6 left-6 text-white text-xl font-semibold z-20">
          Modern Studio
        </div>

        <div className="absolute top-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition duration-500">
          <div className="w-10 h-10 flex items-center justify-center bg-white text-black rounded-full transition-transform duration-300 group-hover:rotate-45">
            →
          </div>
        </div>

        <div className="absolute bottom-6 left-6 right-6 z-20 flex gap-4 opacity-0 translate-y-10 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
          <div className="flex-1 bg-white/20 backdrop-blur-md text-white p-4 rounded-xl text-sm">
            <p className="font-semibold">Import</p>
            <p>Compact Designs</p>
          </div>
          <div className="flex-1 bg-white/20 backdrop-blur-md text-white p-4 rounded-xl text-sm">
            <p className="font-semibold">Export</p>
            <p>Urban Markets</p>
          </div>
        </div>
      </div>


      {/* CARD 6 */}
      <div className="relative h-[420px] rounded-3xl overflow-hidden group cursor-pointer transition duration-300 hover:-translate-y-2">

        <img
          src="https://images.unsplash.com/photo-1505691723518-36a5ac3be353"
          className="absolute inset-0 w-full h-full object-cover scale-110 transition-transform duration-700 group-hover:scale-100"
          alt="Skyline Residence"
        />

        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition duration-500"></div>

        <div className="absolute top-6 left-6 text-white text-xl font-semibold z-20">
          Skyline Residence
        </div>

        <div className="absolute top-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition duration-500">
          <div className="w-10 h-10 flex items-center justify-center bg-white text-black rounded-full transition-transform duration-300 group-hover:rotate-45">
            →
          </div>
        </div>

        <div className="absolute bottom-6 left-6 right-6 z-20 flex gap-4 opacity-0 translate-y-10 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
          <div className="flex-1 bg-white/20 backdrop-blur-md text-white p-4 rounded-xl text-sm">
            <p className="font-semibold">Import</p>
            <p>High-End Systems</p>
          </div>
          <div className="flex-1 bg-white/20 backdrop-blur-md text-white p-4 rounded-xl text-sm">
            <p className="font-semibold">Export</p>
            <p>Global Network</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>




<section className="bg-neutral-200 py-32">

  <div className="max-w-[1500px] mx-auto px-8">

    <div className="bg-white rounded-3xl p-16 shadow-xl">

      {/* Top Header */}
      <div className="flex justify-between items-start mb-16">

        <div>
          <p className="text-sm text-gray-500 mb-4">
            • Explore Graphura
          </p>

          <h2 className="text-5xl font-semibold leading-tight text-neutral-900">
            Why Graphura Company <br /> Leads the Market?
          </h2>
        </div>

        <button className="px-6 py-3 bg-black text-white rounded-full text-sm">
          Contact Us Now
        </button>

      </div>

      {/* Grid Points */}
      <div className="grid md:grid-cols-4 gap-12 text-neutral-600">

        <div>
          <h3 className="font-semibold mb-3 text-neutral-900">
            Global Network
          </h3>
          <p className="text-sm">
            Graphura operates in international trade markets with
            strong import and export partnerships worldwide.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-3 text-neutral-900">
            Secure Operations
          </h3>
          <p className="text-sm">
            Our compliance framework ensures safe and transparent
            financial and business transactions.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-3 text-neutral-900">
            Stable Growth
          </h3>
          <p className="text-sm">
            Long-term structured expansion strategy delivering
            consistent and scalable performance.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-3 text-neutral-900">
            Investor Opportunities
          </h3>
          <p className="text-sm">
            Strategic partnerships designed to maximize value
            for global investors.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-3 text-neutral-900">
            Tax Efficiency
          </h3>
          <p className="text-sm">
            Optimized financial structures benefiting property
            and trade investors.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-3 text-neutral-900">
            Competitive Pricing
          </h3>
          <p className="text-sm">
            Smart sourcing and global vendor networks reduce
            operational costs.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-3 text-neutral-900">
            Remote Transactions
          </h3>
          <p className="text-sm">
            Digital infrastructure allowing clients to manage
            deals securely from anywhere.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-3 text-neutral-900">
            Logistics Excellence
          </h3>
          <p className="text-sm">
            Efficient supply chain and transportation
            management worldwide.
          </p>
        </div>

      </div>

    </div>

  </div>

</section>

















<section className="bg-neutral-200 py-32">
  <div className="max-w-[1500px] mx-auto px-8">
    <div className="bg-white rounded-3xl p-16 shadow-xl grid md:grid-cols-2 gap-16 items-center">

      {/* LEFT */}
      <div>

        <p className="text-neutral-600 mb-6">
          At Graphura Company, we deliver exceptional global trade
          and investment opportunities designed for growth.
        </p>

        <div className="flex items-center gap-4 mb-12">
          <img
            src="https://images.unsplash.com/photo-1607746882042-944635dfe10e"
            className="w-12 h-12 rounded-full object-cover"
            alt="Team"
          />
          <p className="text-sm text-neutral-600">
            Meet Our Professional Team
          </p>
        </div>

        <Stats />

      </div>

      {/* RIGHT */}
      {/* RIGHT */}
<div className="relative">

  {/* Image */}
  <img
    src="https://images.unsplash.com/photo-1546412414-e1885259563a"
    alt="Dubai"
    className="rounded-3xl object-cover w-full h-[500px]"
  />

  {/* TOP RIGHT CALL BUTTON */}
  <div className="absolute top-6 right-6">
    <GlitchButton text="call us"/>
  </div>

  {/* BOTTOM LEFT TEXT */}
  <motion.div className="absolute bottom-6 left-6 text-white text-lg font-semibold"
  initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}>
    Build Your Dreams
  </motion.div>

  {/* BOTTOM RIGHT PROFILE CARD */}
  <motion.div className="absolute bottom-6 right-6 bg-white rounded-2xl shadow-xl px-5 py-4 flex items-center gap-4 w-[260px]"
  initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.8, ease: "anticipate" }}>

    <img
      src="https://images.unsplash.com/photo-1607746882042-944635dfe10e"
      alt="Expert"
      className="w-12 h-12 rounded-full object-cover"
    />

    <div>
      <p className="text-sm font-semibold text-neutral-900">
        Vipin Sharma
      </p>
      <p className="text-xs text-neutral-500">
        Investment Consultant
      </p>
    </div>

  </motion.div>

</div>

    </div>
  </div>
</section>



































<section className="bg-white py-20">
      <div className="max-w-[1500px] mx-auto px-6">
        
        {/* MASONRY LAYOUT USING CSS COLUMNS */}
        <div className="columns-1 sm:columns-2 lg:columns-4 gap-4 space-y-4">
          
          {propertyCards.map((card, index) => (
            <div
              key={index}
              // break-inside-avoid is crucial so cards don't split across columns
              className={`relative rounded-3xl overflow-hidden group cursor-pointer break-inside-avoid ${card.height}`}
            >
              {/* IMAGE */}
              <img
                src={card.img}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt={card.title}
              />

              {/* GRADIENT OVERLAY (Always there so white text is readable) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none transition-opacity duration-500 group-hover:opacity-80"></div>

              {/* TOP RIGHT ARROW (Always visible, slightly animates on hover) */}
              <div className="absolute top-5 right-5 z-10">
                <div className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center shadow-md transform transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                    />
                  </svg>
                </div>
              </div>

              {/* BOTTOM LEFT TEXT & NUMBER (Always visible) */}
              <div className="absolute bottom-6 left-6 text-white z-10">
                <p className="text-sm font-light opacity-80 mb-1">{card.id}</p>
                <h3 className="text-xl font-medium tracking-wide">
                  {card.title}
                </h3>
              </div>
            </div>
          ))}
          
        </div>
      </div>
    </section>















<section className="bg-neutral-200 py-32 overflow-hidden">

  <div className="max-w-[1500px] mx-auto px-8">

    {/* ===== LOGO STRIP ===== */}
    <p className="text-center text-neutral-600 mb-10">
      Our Valued Partners
    </p>

    <div className="relative overflow-hidden mb-24">

      <div className="flex gap-20 whitespace-nowrap animate-marquee">
{/* --- ORIGINAL + NEW LOGOS --- */}
<img src="https://upload.wikimedia.org/wikipedia/commons/4/4b/Emaar_Properties_logo.png" className="h-8 opacity-70" alt="Emaar" />
<img src="https://upload.wikimedia.org/wikipedia/commons/3/3b/Nakheel_logo.png" className="h-8 opacity-70" alt="Nakheel" />
<img src="https://upload.wikimedia.org/wikipedia/commons/5/5f/Sobha_Realty_logo.png" className="h-8 opacity-70" alt="Sobha" />
<img src="https://upload.wikimedia.org/wikipedia/commons/7/7b/Meraas_logo.png" className="h-8 opacity-70" alt="Meraas" />

{/* New Free Global Logos */}
<img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" className="h-8 opacity-70" alt="Google" />
<img src="https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" className="h-8 opacity-70" alt="Microsoft" />
<img src="https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg" className="h-8 opacity-70" alt="Airbnb" />
<img src="https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg" className="h-8 opacity-70" alt="Spotify" />


{/* --- DUPLICATE SET FOR SMOOTH LOOP --- */}
<img src="https://upload.wikimedia.org/wikipedia/commons/4/4b/Emaar_Properties_logo.png" className="h-8 opacity-70" alt="Emaar" />
<img src="https://upload.wikimedia.org/wikipedia/commons/3/3b/Nakheel_logo.png" className="h-8 opacity-70" alt="Nakheel" />
<img src="https://upload.wikimedia.org/wikipedia/commons/5/5f/Sobha_Realty_logo.png" className="h-8 opacity-70" alt="Sobha" />
<img src="https://upload.wikimedia.org/wikipedia/commons/7/7b/Meraas_logo.png" className="h-8 opacity-70" alt="Meraas" />

<img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" className="h-8 opacity-70" alt="Google" />
<img src="https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" className="h-8 opacity-70" alt="Microsoft" />
<img src="https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg" className="h-8 opacity-70" alt="Airbnb" />
<img src="https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg" className="h-8 opacity-70" alt="Spotify" />
      </div>

    </div>


    {/* ===== FAQ CARD ===== */}
    <div className="bg-white rounded-3xl p-16 shadow-xl grid md:grid-cols-2 gap-16">

      {/* LEFT */}
      <div>
        <p className="text-neutral-500 mb-4">
          • Explore Our Advantages
        </p>

        <h2 className="text-4xl font-semibold text-neutral-900 mb-6">
          Frequent Asked Questions
        </h2>

        <p className="text-neutral-600">
          We provide premium real estate and global investment
          solutions tailored to your expectations.
        </p>
      </div>

      {/* RIGHT */}
      <div className="space-y-6">

        <div className="border-b pb-4 flex justify-between">
          <p>What types of properties do we offer?</p>
          <span>+</span>
        </div>

        <div className="border-b pb-4 flex justify-between">
          <p>What are the payment options available?</p>
          <span>+</span>
        </div>

        <div className="border-b pb-4 flex justify-between">
          <p>Can foreign nationals buy property?</p>
          <span>+</span>
        </div>

        <div className="border-b pb-4 flex justify-between">
          <p>How does residency investment work?</p>
          <span>+</span>
        </div>

      </div>

    </div>

  </div>
</section>




























{/* Foooter */}
<footer className="bg-neutral-200 py-24">

  <div className="max-w-[1500px] mx-auto px-8">

    {/* TOP GRID */}
    <div className="grid md:grid-cols-3 gap-20 mb-20">

      {/* LEFT - LOGO */}
      <div>
        <h3 className="text-2xl font-semibold tracking-widest mb-4">
          GRAPHURA
        </h3>
        <p className="text-neutral-600 text-sm">
          Building Global Trade & Investment Networks.
        </p>
      </div>

      {/* CENTER - NAVIGATION */}
      <div>
        <h4 className="font-semibold mb-6 text-neutral-900">
          Quick Navigation
        </h4>

       <ul className="space-y-4 text-neutral-600 text-sm">
  <li className="text-black cursor-pointer font-bold">Home</li>
  <li className="text-black cursor-pointer font-bold">Our Properties</li>
  <li className="text-black cursor-pointer font-bold">Our Advantages</li>
  <li className="text-black cursor-pointer font-bold">Our Services</li>
</ul>
      </div>

      {/* RIGHT - FOUNDER */}
      <div>
        <div className="flex items-center gap-4 mb-6">
          <img
            src="https://images.unsplash.com/photo-1607746882042-944635dfe10e"
            className="w-12 h-12 rounded-full object-cover"
            alt="Founder"
          />
          <div>
            <p className="text-sm font-semibold">Founder</p>
            <p className="text-neutral-600 text-sm">Vipin Sharma</p>
          </div>
        </div>

        <p className="text-neutral-700 text-sm mb-6 text-black font-bold">
          We are here to build global partnerships and scale your business.
        </p>

        <button className="px-6 py-3 bg-black text-white rounded-full text-sm">
          Contact Us
        </button>
      </div>

    </div>

    {/* BOTTOM GRID */}
    <div className="grid md:grid-cols-3 gap-20">

      {/* NEWSLETTER */}
      <div>
        <h4 className="font-semibold mb-4 text-neutral-900">
          Subscribe to our news
        </h4>

        <p className="text-neutral-600 text-sm mb-6">
          Stay informed and receive exclusive updates.
        </p>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border-b border-neutral-400 outline-none py-2 text-sm mb-4 bg-transparent"
        />

        <button className="px-5 py-2 bg-black text-white rounded-full text-sm">
          Subscribe
        </button>
      </div>

      {/* ADDRESS */}
      <div>
        <p className="text-neutral-700 text-sm leading-relaxed">
          123 Zayed Road <br />
          Dubai Marina <br />
          Dubai, United Arab Emirates
        </p>
      </div>

      {/* COPYRIGHT */}
      <div className="text-sm text-neutral-500 flex flex-col justify-between">
        <p>© 2026 Graphura Company</p>

        <div className="flex gap-6 mt-6">
          <span className="hover:text-black cursor-pointer">
            Terms Of Service
          </span>
          <span className="hover:text-black cursor-pointer">
            Privacy Policy
          </span>
        </div>
      </div>

    </div>

  </div>

</footer>


   </>
  );
};

export default Homepage;