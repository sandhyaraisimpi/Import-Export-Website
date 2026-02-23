import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Search,
  ArrowUpRight,
  LayoutGrid,
  List,
  ChevronRight,
  Tag,
  Layers,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { getService } from "../../service/axios";

// ═══════════════════════════════════════════════════════════════
//  MOCK DATA — Replace each section with your real API responses
// ═══════════════════════════════════════════════════════════════

const MOCK_CATEGORY = {
  _id: "cat_001",
  name: "Textiles",
  decription:
    "Premium-grade raw textile materials sourced from certified suppliers across South Asia, East Africa, and South America.",
  categoryImage:
    "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1600&q=80",
};

// Matches subCategory_Schema
const MOCK_SUBCATEGORIES = [
  {
    _id: "sub_001",
    categoryId: "cat_001",
    name: "Raw Cotton",
    skuId: "SKU-TC-001",
    decription: "Long-staple, unprocessed cotton bales from Gujarat. Low moisture content, high tensile strength.",
    status: "Available",
    subcategoryImage: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=800&q=80",
  },
  {
    _id: "sub_002",
    categoryId: "cat_001",
    name: "Mulberry Silk",
    skuId: "SKU-TC-002",
    decription: "Grade-A mulberry silk reeled from double-cocoon filaments. Exceptionally uniform denier.",
    status: "Available",
    subcategoryImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  },
  {
    _id: "sub_003",
    categoryId: "cat_001",
    name: "Merino Wool",
    skuId: "SKU-TC-003",
    decription: "Ultra-fine 17-micron Merino fleece sourced from free-range farms in Patagonia.",
    status: "Available",
    subcategoryImage: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800&q=80",
  },
  {
    _id: "sub_004",
    categoryId: "cat_001",
    name: "Linen Fibre",
    skuId: "SKU-TC-004",
    decription: "Wet-retted flax fibre with low lignin content. Exceptionally durable and biodegradable.",
    status: "Un-Available",
    subcategoryImage: "https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=800&q=80",
  },
  {
    _id: "sub_005",
    categoryId: "cat_001",
    name: "Bamboo Yarn",
    skuId: "SKU-TC-005",
    decription: "Mechanically processed bamboo yarn with antibacterial properties. Silky hand-feel.",
    status: "Available",
    subcategoryImage: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80",
  },
  {
    _id: "sub_006",
    categoryId: "cat_001",
    name: "Hemp Fabric",
    skuId: "SKU-TC-006",
    decription: "Industrial-grade hemp woven into base cloth. Resistant to mold, UV, and abrasion.",
    status: "Available",
    subcategoryImage: "https://images.unsplash.com/photo-1565035010268-a3816f98589a?w=800&q=80",
  },
];

// Matches productSchema — keyed by subCategoryId for easy lookup
// Replace with: products filtered by subCategoryId from your API
const MOCK_PRODUCTS = {
  sub_001: [
    {
      _id: "prod_001",
      categoryId: "cat_001",
      subCategoryId: "sub_001",
      name: "Gujarat Pima Bale",
      skuId: "SKU-P-0011",
      description: "Extra-long staple Pima cotton from Saurashtra region. 34mm fibre length, moisture below 8%. Ideal for combed yarn.",
      specifications: "Grade: ELS | Staple: 34mm | Mic: 3.8 | Moisture: <8% | Pack: 170kg bales",
      status: "Available",
      productImage: ["https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=600&q=80"],
    },
    {
      _id: "prod_002",
      categoryId: "cat_001",
      subCategoryId: "sub_001",
      name: "Shankar-6 Cotton",
      skuId: "SKU-P-0012",
      description: "Medium-staple Shankar-6 variety, most exported Indian cotton. Consistent quality, wide mill acceptance.",
      specifications: "Grade: S6 | Staple: 28mm | Mic: 4.2 | Moisture: <8.5% | Pack: 165kg bales",
      status: "Available",
      productImage: ["https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&q=80"],
    },
    {
      _id: "prod_003",
      categoryId: "cat_001",
      subCategoryId: "sub_001",
      name: "Organic Cotton Lint",
      skuId: "SKU-P-0013",
      description: "GOTS-certified organic cotton, pesticide-free cultivation. Premium pricing, niche but high-demand segment.",
      specifications: "Cert: GOTS | Staple: 30mm | Mic: 4.0 | Moisture: <7.5% | Pack: 160kg bales",
      status: "Un-Available",
      productImage: ["https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=80"],
    },
    {
      _id: "prod_003",
      categoryId: "cat_001",
      subCategoryId: "sub_001",
      name: "Organic Cotton Lint",
      skuId: "SKU-P-0013",
      description: "GOTS-certified organic cotton, pesticide-free cultivation. Premium pricing, niche but high-demand segment.",
      specifications: "Cert: GOTS | Staple: 30mm | Mic: 4.0 | Moisture: <7.5% | Pack: 160kg bales",
      status: "Un-Available",
      productImage: ["https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=80"],
    },
    {
      _id: "prod_003",
      categoryId: "cat_001",
      subCategoryId: "sub_001",
      name: "Organic Cotton Lint",
      skuId: "SKU-P-0013",
      description: "GOTS-certified organic cotton, pesticide-free cultivation. Premium pricing, niche but high-demand segment.",
      specifications: "Cert: GOTS | Staple: 30mm | Mic: 4.0 | Moisture: <7.5% | Pack: 160kg bales",
      status: "Un-Available",
      productImage: ["https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=80"],
    },
    {
      _id: "prod_003",
      categoryId: "cat_001",
      subCategoryId: "sub_001",
      name: "Organic Cotton Lint",
      skuId: "SKU-P-0013",
      description: "GOTS-certified organic cotton, pesticide-free cultivation. Premium pricing, niche but high-demand segment.",
      specifications: "Cert: GOTS | Staple: 30mm | Mic: 4.0 | Moisture: <7.5% | Pack: 160kg bales",
      status: "Un-Available",
      productImage: ["https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=80"],
    },
    {
      _id: "prod_003",
      categoryId: "cat_001",
      subCategoryId: "sub_001",
      name: "Organic Cotton Lint",
      skuId: "SKU-P-0013",
      description: "GOTS-certified organic cotton, pesticide-free cultivation. Premium pricing, niche but high-demand segment.",
      specifications: "Cert: GOTS | Staple: 30mm | Mic: 4.0 | Moisture: <7.5% | Pack: 160kg bales",
      status: "Un-Available",
      productImage: ["https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=80"],
    },
    {
      _id: "prod_003",
      categoryId: "cat_001",
      subCategoryId: "sub_001",
      name: "Organic Cotton Lint",
      skuId: "SKU-P-0013",
      description: "GOTS-certified organic cotton, pesticide-free cultivation. Premium pricing, niche but high-demand segment.",
      specifications: "Cert: GOTS | Staple: 30mm | Mic: 4.0 | Moisture: <7.5% | Pack: 160kg bales",
      status: "Un-Available",
      productImage: ["https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=80"],
    },
    {
      _id: "prod_003",
      categoryId: "cat_001",
      subCategoryId: "sub_001",
      name: "Organic Cotton Lint",
      skuId: "SKU-P-0013",
      description: "GOTS-certified organic cotton, pesticide-free cultivation. Premium pricing, niche but high-demand segment.",
      specifications: "Cert: GOTS | Staple: 30mm | Mic: 4.0 | Moisture: <7.5% | Pack: 160kg bales",
      status: "Un-Available",
      productImage: ["https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=80"],
    },

    {
      _id: "prod_003",
      categoryId: "cat_001",
      subCategoryId: "sub_001",
      name: "Organic Cotton Lint",
      skuId: "SKU-P-0013",
      description: "GOTS-certified organic cotton, pesticide-free cultivation. Premium pricing, niche but high-demand segment.",
      specifications: "Cert: GOTS | Staple: 30mm | Mic: 4.0 | Moisture: <7.5% | Pack: 160kg bales",
      status: "Un-Available",
      productImage: ["https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=80"],
    },
    {
      _id: "prod_003",
      categoryId: "cat_001",
      subCategoryId: "sub_001",
      name: "Organic Cotton Lint",
      skuId: "SKU-P-0013",
      description: "GOTS-certified organic cotton, pesticide-free cultivation. Premium pricing, niche but high-demand segment.",
      specifications: "Cert: GOTS | Staple: 30mm | Mic: 4.0 | Moisture: <7.5% | Pack: 160kg bales",
      status: "Un-Available",
      productImage: ["https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=80"],
    }
  ],
  sub_002: [
    {
      _id: "prod_004",
      categoryId: "cat_001",
      subCategoryId: "sub_002",
      name: "20/22D Raw Silk",
      skuId: "SKU-P-0021",
      description: "Reeled raw silk 20/22 denier, double-cocoon grade. Smooth hand-feel, low nep count, suitable for luxury warp weaving.",
      specifications: "Denier: 20/22D | Grade: 3A | Neatness: 95%+ | Sericin: 25% | Reel: 500m hanks",
      status: "Available",
      productImage: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80"],
    },
    {
      _id: "prod_005",
      categoryId: "cat_001",
      subCategoryId: "sub_002",
      name: "Spun Silk Yarn",
      skuId: "SKU-P-0022",
      description: "Spun from pierced cocoon waste. Slightly irregular texture adds character. Popular in artisan and handloom segments.",
      specifications: "Count: Nm120 | Grade: B | Twist: 600 TPM | Package: 100g cones",
      status: "Available",
      productImage: ["https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=80"],
    },
  ],
  sub_003: [
    {
      _id: "prod_006",
      categoryId: "cat_001",
      subCategoryId: "sub_003",
      name: "Superfine 17.5µ Fleece",
      skuId: "SKU-P-0031",
      description: "Patagonian Merino fleece, 17.5 micron. Certified non-mulesed. Exceptional softness for next-to-skin knitwear.",
      specifications: "Micron: 17.5µ | Length: 85mm | VM: <0.5% | Cert: ZQ, RWS | Pack: 200kg bales",
      status: "Available",
      productImage: ["https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=600&q=80"],
    },
  ],
  sub_004: [],
  sub_005: [
    {
      _id: "prod_007",
      categoryId: "cat_001",
      subCategoryId: "sub_005",
      name: "Bamboo Ring-Spun Yarn",
      skuId: "SKU-P-0051",
      description: "Ne30/1 ring-spun bamboo viscose yarn. High sheen, smooth surface, excellent drape for woven fabrics.",
      specifications: "Count: Ne30/1 | Twist: Z | Tenacity: 18cN/tex | Elongation: 18% | Package: 1kg cones",
      status: "Available",
      productImage: ["https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80"],
    },
    {
      _id: "prod_008",
      categoryId: "cat_001",
      subCategoryId: "sub_005",
      name: "Bamboo-Cotton Blend",
      skuId: "SKU-P-0052",
      description: "70/30 bamboo-cotton blend yarn. Combines softness with durability. Preferred for T-shirt and activewear knitting.",
      specifications: "Blend: 70% Bamboo / 30% Cotton | Count: Ne40/1 | Package: 1kg cones",
      status: "Available",
      productImage: ["https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=80"],
    },
  ],
  sub_006: [
    {
      _id: "prod_009",
      categoryId: "cat_001",
      subCategoryId: "sub_006",
      name: "Hemp Canvas 12oz",
      skuId: "SKU-P-0061",
      description: "12oz plain-weave hemp canvas. Heavy-duty, naturally anti-microbial. Suited for industrial bags and upholstery.",
      specifications: "Weight: 12oz/yd² | Width: 58\" | Weave: Plain | Finish: Unbleached | Roll: 50m",
      status: "Available",
      productImage: ["https://images.unsplash.com/photo-1565035010268-a3816f98589a?w=600&q=80"],
    },
  ],
};

// ═══════════════════════════════════════════════════════════════


// ── Subcategory Card ──────────────────────────────────────────
const SubcategoryCard = ({ sub, index, onClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    onClick={() => sub.status === "Available" && onClick(sub)}
    className={`group relative overflow-hidden rounded-3xl cursor-pointer border transition-all duration-500
      ${sub.status === "Available"
        ? "border-white/10 hover:border-[#C36A4D]/40 hover:shadow-[0_30px_60px_-15px_rgba(195,106,77,0.25)]"
        : "border-white/5 opacity-50 cursor-not-allowed"
      }`}
  >
    {/* Background Image */}
    <div className="absolute inset-0">
      <img
        src={sub.subcategoryImage}
        alt={sub.name}
        className="w-full h-full object-cover opacity-20 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/80 to-transparent" />
    </div>

    <div className="relative z-10 p-7 flex flex-col h-64 justify-between">
      <div className="flex items-start justify-between">
        <span className={`text-[9px] font-black tracking-[0.3em] uppercase px-3 py-1.5 rounded-full border
          ${sub.status === "Available"
            ? "text-emerald-400 border-emerald-400/30 bg-emerald-400/10"
            : "text-red-400 border-red-400/30 bg-red-400/10"
          }`}>
          {sub.status}
        </span>
        <span className="text-white/20 text-[9px] font-mono tracking-widest">{sub.skuId}</span>
      </div>

      <div>
        <h3 className="text-white text-2xl font-black uppercase tracking-tight mb-2 group-hover:text-[#C36A4D] transition-colors duration-300">
          {sub.name}
        </h3>
        <p className="text-white/40 text-sm leading-relaxed line-clamp-2">{sub.decription}</p>
      </div>

      <div className="flex items-center justify-between">
        {/* <span className="text-white/20 text-[9px] font-black uppercase tracking-[0.3em]">
          {(MOCK_PRODUCTS[sub._id] || []).length} Products
        </span> */}
        <div
          className="ml-auto w-9 h-9 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#C36A4D] group-hover:border-[#C36A4D] transition-all duration-300"
        >
          <ChevronRight
            size={14}
            className="text-white/40 group-hover:text-white transition-colors"
          />
        </div>
      </div>
    </div>
  </motion.div>
);


export default function CategoryDetail() {

  const { id } = useParams();

  const [subCategory, setSubCateogory] = useState([]);
  const [category, setCategory] = useState(null);
  const [subCategoryCount, setSubCategoryCount] = useState(0);

  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isSuggestionClick, setIsSuggestionClick] = useState(false);


  useEffect(() => {
    if (!id) return;

    (async () => {
      const apiResponse = await getService(`/customer/product/category/${id}`);
      if (!apiResponse.ok) {
        console.log(apiResponse.message);
        return
      };
      setCategory(apiResponse.data.data);
    })();
  }, [id]);


  useEffect(() => {
    if (!id || searchQuery) return;

    (async () => {
      const apiResponse = await getService(
        `/customer/product/subcategorybycategoryId?categoryId=${id}&page=${currentPage}&limit=12`
      );

      if (!apiResponse.ok) {
        console.log(apiResponse.message);
        return
      };

      const data = apiResponse.data.data;

      setSubCateogory(data.subcategoryList);
      setSubCategoryCount(data.totalItems);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPage);
    })();

  }, [id, currentPage, searchQuery]);


  useEffect(() => {
    if (!searchQuery) return;

    const delayDebounce = setTimeout(async () => {
      const apiResponse = await getService(
        `/customer/search/subcategory?keyword=${searchQuery}&categoryId=${id}&page=${currentPage}&limit=12`
      );

      if (!apiResponse.ok) {
        console.log(apiResponse.message);
        return
      };

      const data = apiResponse.data.data;

      setSubCateogory(data.subcategories);
      setSubCategoryCount(data.subcategories.length);
      setTotalPages(data.totalPage);
    }, 400);

    return () => clearTimeout(delayDebounce);

  }, [searchQuery, currentPage]);


  useEffect(() => {
    if (!searchQuery || isSuggestionClick) {
      setSuggestions([]);
      setIsSuggestionClick(false);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      const apiResponse = await getService(
        `/customer/search/suggestion/subcategory?keyword=${searchQuery}&categoryId=${id}`
      );

      if (!apiResponse.ok) {
        console.log(apiResponse.message);
        return
      };

      setSuggestions(apiResponse.data.data.subcategories);
    }, 300);

    return () => clearTimeout(delayDebounce);

  }, [searchQuery]);

  return (
    <div className="bg-[#0D0D0D] min-h-screen text-white font-sans">

      {/* HERO SAME AS BEFORE */}
      <section className="relative h-[70vh] flex flex-col justify-end px-6 md:px-16 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={category?.categoryImage}
            alt=""
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.25)" }}
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <h1 className="text-white font-black uppercase tracking-tighter leading-[0.8] mb-6"
            style={{ fontSize: "clamp(3.5rem, 9vw, 8rem)" }}>
            {category?.name}
          </h1>
        </div>
      </section>

      {/* TOOLBAR */}
      <div className="sticky top-0 z-50 bg-[#0D0D0D]/95 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row gap-4 items-center justify-between">

          <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/25">
            {subCategoryCount} Subcategories
          </span>

          <div className="relative w-full sm:w-80">
            <Search size={13} className="absolute right-5 top-1/2 -translate-y-1/2 text-white/20" />
            <input
              type="text"
              placeholder="SEARCH SUBCATEGORIES..."
              value={searchQuery}
              onChange={(e) => {
                setCurrentPage(1);
                setSearchQuery(e.target.value);
              }}
              className="w-full bg-white/5 border border-white/8 rounded-full px-5 py-3 text-[10px] font-black uppercase tracking-widest outline-none text-white"
            />

            {/* Suggestions Dropdown */}
            {suggestions.length > 0 && (
              <div className="absolute top-full mt-2 w-full bg-[#111111] border border-white/10 rounded-xl overflow-hidden z-50">
                {suggestions.map((item) => (
                  <div
                    key={item._id}
                    onClick={() => {
                      setIsSuggestionClick(true);
                      setSearchQuery(item.name);
                      setSuggestions([]);
                    }}
                    className="px-4 py-3 text-sm text-white/70 hover:bg-white/5 cursor-pointer"
                  >
                    {item.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <main className="max-w-7xl mx-auto py-16 px-6">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {subCategory.map((sub, i) => (
            <SubcategoryCard
              key={sub._id}
              sub={sub}
              index={i}
            />
          ))}
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-16">

            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest border
                ${currentPage === 1
                  ? "border-white/5 text-white/20 cursor-not-allowed"
                  : "border-white/10 hover:border-[#C36A4D]/40 hover:text-[#C36A4D]"
                }`}
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              return (
                <button
                  key={pageNumber}
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`w-9 h-9 rounded-full text-xs font-black border
                    ${currentPage === pageNumber
                      ? "bg-[#C36A4D] border-[#C36A4D] text-white"
                      : "border-white/10 text-white/30 hover:border-[#C36A4D]/40 hover:text-[#C36A4D]"
                    }`}
                >
                  {pageNumber}
                </button>
              );
            })}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest border
                ${currentPage === totalPages
                  ? "border-white/5 text-white/20 cursor-not-allowed"
                  : "border-white/10 hover:border-[#C36A4D]/40 hover:text-[#C36A4D]"
                }`}
            >
              Next
            </button>

          </div>
        )}
      </main>
    </div>
  );
}