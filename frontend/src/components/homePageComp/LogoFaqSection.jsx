import React from "react";

// --- DATA ARRAYS ---
const partnerLogos = [
  { id: 1, name: "Maersk", src: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Maersk_Group_Logo.svg" },
  { id: 2, name: "DHL", src: "https://upload.wikimedia.org/wikipedia/commons/b/b5/DHL_logo.svg" },
  { id: 3, name: "FedEx", src: "https://upload.wikimedia.org/wikipedia/commons/9/9d/FedEx_Express.svg" },
  { id: 4, name: "Amazon", src: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
  { id: 5, name: "Google", src: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { id: 6, name: "Microsoft", src: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
  { id: 7, name: "MSC", src: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Mediterranean_Shipping_Company_logo.svg" },
  { id: 8, name: "CMA CGM", src: "https://upload.wikimedia.org/wikipedia/commons/6/69/CMA_CGM_logo.svg" },
];

const faqsData = [
  { id: 1, question: "How do I submit an inquiry for a product?" },
  { id: 2, question: "What is the Minimum Order Quantity (MOQ)?" },
  { id: 3, question: "Do you handle international shipping and customs?" },
  { id: 4, question: "How can I track my shipment status?" },
];

const LogoFaqSection = () => {
  const duplicatedLogos = [...partnerLogos, ...partnerLogos];

  return (
    <section className="bg-neutral-200 py-32 overflow-hidden group">
      
      {/* CSS for Marquee Animation */}
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 25s linear infinite;
            width: max-content; 
          }
          .group:hover .animate-marquee {
             animation-play-state: paused;
          }
        `}
      </style>

      <div className="max-w-[1500px] mx-auto px-8">

        {/* LOGO STRIP */}
        <p className="text-center text-neutral-600 mb-10 text-lg">
          Our Global Shipping & Trade Partners
        </p>

        <div className="relative overflow-hidden mb-24">
          <div className="flex gap-20 items-center whitespace-nowrap animate-marquee">
            {duplicatedLogos.map((logo, index) => (
              <img 
                key={`${logo.id}-${index}`} 
                src={logo.src} 
                alt={logo.name} 
                className="h-8 max-w-[120px] object-contain opacity-70 group-hover:opacity-100 transition-all duration-500 grayscale group-hover:grayscale-0" 
              />
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-3xl p-16 shadow-xl grid md:grid-cols-2 gap-16">

          <div>
            <p className="text-neutral-500 mb-4 uppercase tracking-wider text-sm font-medium">
              • Clear Your Doubts
            </p>
            <h2 className="text-5xl font-semibold text-neutral-900 mb-6 leading-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-neutral-600 text-lg leading-relaxed">
              Find quick answers regarding our export processes, product sourcing, 
              and international shipping standards.
            </p>
          </div>

          <div className="space-y-6 flex flex-col justify-center">
            {faqsData.map((faq) => (
              <div key={faq.id} className="border-b border-neutral-200 pb-4 flex justify-between items-center cursor-pointer hover:border-black transition-colors">
                <p className="text-lg text-neutral-800 font-medium hover:text-black transition-colors">{faq.question}</p>
                <span className="text-xl text-neutral-400 hover:text-black transition-colors">+</span>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default LogoFaqSection;