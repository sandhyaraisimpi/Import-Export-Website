import React from "react";

const productsData = [
  {
    id: 1,
    title: "Food Products",
    desc: "High-quality food items sourced from trusted manufacturers for international markets.",
    img: "https://images.unsplash.com/photo-1604908176997-4314edc41b88",
  },
  {
    id: 2,
    title: "Spices",
    desc: "Premium-grade spices processed under strict quality control for global export.",
    img: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d",
  },
  {
    id: 3,
    title: "Agricultural Goods",
    desc: "Fresh and processed agricultural commodities meeting international standards.",
    img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
  },
  {
    id: 4,
    title: "Bricks",
    desc: "Durable and export-grade construction bricks for international projects.",
    img: "https://images.unsplash.com/photo-1581092334484-2b0b6a41a9b1",
  },
];

const ProductScrollSection = () => {
  const scrollItems = [...productsData, ...productsData];

  return (
    <section className="bg-neutral-200 pb-32 overflow-hidden">

      {/* Animation CSS */}
      <style>
        {`
          @keyframes productScroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }

          .animate-product-scroll {
            animation: productScroll 30s linear infinite;
          }

          .animate-product-scroll:hover {
            animation-play-state: paused;
          }
        `}
      </style>

      <div className="max-w-[1500px] mx-auto px-8">

        <h2 className="text-4xl font-semibold mb-16 text-center text-neutral-900">
          Our Product Categories
        </h2>

        <div className="flex gap-12 animate-product-scroll py-8 w-max">

          {scrollItems.map((item, index) => (
            <div
              key={index}
              className="w-[420px] shrink-0 bg-white rounded-3xl overflow-hidden shadow-xl group hover:-translate-y-4 transition-all duration-300"
            >
              <div className="overflow-hidden">
                <img
                  src={item.img}
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                  alt={item.title}
                />
              </div>

              <div className="p-8 pb-10">
                <h3 className="font-semibold text-2xl mb-3 text-neutral-900">
                  {item.title}
                </h3>

                <p className="text-neutral-500 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>

            </div>
          ))}

        </div>

        {/* CTA Button */}
        <div className="text-center mt-20">
          <a
            href="/categories"
            className="px-8 py-3 bg-black text-white rounded-full text-sm font-medium hover:scale-105 transition-all duration-300"
          >
            View All Products
          </a>
        </div>

      </div>
    </section>
  );
};

export default ProductScrollSection;