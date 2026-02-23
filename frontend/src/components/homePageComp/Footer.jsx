import React from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Globe, ShieldCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { postService, getService } from "../../service/axios";

// --- DATA ---
// Data updated as per the Import-Export project brief

const companyInfo = {
  name: "VR & SONS",
  description: "Trusted exporters of high-quality products for global trade.", // [cite: 40]
  copyright: "© 2026 VR & Sons Import Export. All rights reserved.", // 
};

const quickLinks = [
  { id: 1, label: "Home", href: "#" },
  { id: 2, label: "Products", href: "#" },
  { id: 3, label: "About Us", href: "#" },
  { id: 4, label: "Blog", href: "#" },
  { id: 5, label: "Contact Us", href: "#" },
];

// Brief ke hisaab se contact details [cite: 62]
const contactDetails = {
  phone: "+91 98254 74047", // 
  email: "support@vrandsons.com", // 
  address: "Kamrej, Surat, Gujarat, India", // 
};

const addressLines = [
  "Kamrej",
  "Surat, Gujarat",
  "India"
];

const legalLinks = [
  { id: 1, label: "Terms Of Service", href: "#" },
  { id: 2, label: "Privacy Policy", href: "#" },
];

// --- COMPONENT ---

const Footer = () => {

  const [categoryProduct, setcategoryProduct] = useState([])
      useEffect(() => {
        ;(
          async () => {
            const apiResponse = await getService("/customer/product/category?page=1&limit=4");
    
            if(!apiResponse.ok){
              console.log(apiResponse.message);
              return
            }
    
            console.log(apiResponse.data.data.categoryList)
            setcategoryProduct(apiResponse.data.data.categoryList)
          }
        )()
      },[])

  return (
    <footer className="bg-[#f4f1ec] px-4 md:px-8 pt-10 pb-6 font-sans">
      <div className="bg-white rounded-3xl shadow-sm border border-neutral-100 px-8 md:px-14 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-neutral-100">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl font-semibold text-neutral-900">
              VR & Sons
            </h2>
            <p className="text-xs tracking-widest uppercase text-neutral-400 mt-1">
              Import Export
            </p>

            <p className="text-sm text-neutral-500 mt-4 leading-relaxed max-w-xs">
              Trusted exporters of high-quality Food Products, Spices,
              Agricultural Goods & Bricks to 13+ countries worldwide.
            </p>

            <div className="flex items-center gap-2 mt-4 text-sm text-neutral-600">
              <Globe size={16} />
              <span>Serving 13+ Countries Globally</span>
            </div>

            <div className="flex items-center gap-2 mt-2 text-sm text-neutral-600">
              <ShieldCheck size={16} />
              <span>Compliance & Export Certified</span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-sm font-semibold text-neutral-900 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-neutral-500">
              {[
                "Home",
                "Our Products",
                "About Us",
                "Why Choose Us",
                "Blog",
                "Contact",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="hover:text-black transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Product Categories (SEO Boost) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-sm font-semibold text-neutral-900 mb-4">
              Export Categories
            </h3>
            {/* <ul className="space-y-2 text-sm text-neutral-500">
              {categoryProduct.map(
                (item) => (
                  <li key={item._id}>
                    <a
                      href="#"
                      className="hover:text-black transition-colors duration-300"
                    >
                      {item.name}
                    </a>
                  </li>
                ),
              )}
            </ul> */}
            <ul className="space-y-2 text-sm text-neutral-500">
              {["Food Products", "Spices", "Agricultural Goods", "Bricks"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="hover:text-black transition-colors duration-300"
                    >
                      {item}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-sm font-semibold text-neutral-900 mb-4">
              Contact Information
            </h3>

            <div className="space-y-3 text-sm text-neutral-500">
              <div className="flex items-start gap-2">
                <Phone size={16} className="mt-1" />
                <a href="tel:+919825474047" className="hover:text-black">
                  +91 98254 74047
                </a>
              </div>

              <div className="flex items-start gap-2">
                <Mail size={16} className="mt-1" />
                <a
                  href="mailto:support@vrandsons.com"
                  className="hover:text-black"
                >
                  support@vrandsons.com
                </a>
              </div>

              <div className="flex items-start gap-2">
                <MapPin size={16} className="mt-1" />
                <span>Kamrej, Surat, Gujarat, India</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-6 gap-4">
          <p className="text-xs text-neutral-400">
            © {new Date().getFullYear()} VR & Sons Import Export. All rights
            reserved.
          </p>

          <div className="flex gap-6 text-xs text-neutral-400">
            <a href="#" className="hover:text-neutral-700">
              Terms of Service
            </a>
            <a href="#" className="hover:text-neutral-700">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
