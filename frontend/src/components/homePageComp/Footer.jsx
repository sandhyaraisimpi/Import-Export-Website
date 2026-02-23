import React, { useState } from "react";
import { motion } from "framer-motion";

// ─────────────────────────────────────────────────────────────────────────────
// ██████  DATA
// ─────────────────────────────────────────────────────────────────────────────

const FOOTER_DATA = {
  companyName: "VR & Sons",
  subtitle: "Import Export",
  description: "Trusted exporters of Food Products, Spices, Agricultural Goods & Bricks to 13+ countries worldwide.",
  navLinks: ["Home", "Our Products", "About Us", "Why Choose Us", "Blog", "Contact"],
  contact: {
    phone: "+91 98254 74047",
    email: "support@vrandsons.com",
    address: "Kamrej, Surat, Gujarat, India",
  },
  legal: {
    copyright: "© 2025 VR & Sons Import Export.",
    links: [
      { label: "Terms of Service", href: "#" },
      { label: "Privacy Policy",   href: "#" },
    ],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

const Footer = () => (
  <footer className="bg-[#f0ede8] px-3 md:px-6 pt-4 pb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
    <div className="bg-white rounded-3xl px-6 md:px-10 py-8 md:py-10">

      {/* Top row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-neutral-100">

        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 bg-black rounded-lg flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            </div>
            <div>
              <p className="text-neutral-900 text-sm font-semibold leading-none">{FOOTER_DATA.companyName}</p>
              <p className="text-neutral-400 text-[10px] tracking-widest uppercase">{FOOTER_DATA.subtitle}</p>
            </div>
          </div>
          <p className="text-xs text-neutral-400 leading-relaxed max-w-[200px]">
            {FOOTER_DATA.description}
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <p className="text-[10px] text-neutral-400 tracking-widest uppercase mb-4">Quick Links</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {FOOTER_DATA.navLinks.map((link) => (
              <a key={link} href="#" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
                {link}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-[10px] text-neutral-400 tracking-widest uppercase mb-4">Contact</p>
          <div className="flex flex-col gap-2">
            <a href={`tel:${FOOTER_DATA.contact.phone}`} className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
              {FOOTER_DATA.contact.phone}
            </a>
            <a href={`mailto:${FOOTER_DATA.contact.email}`} className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
              {FOOTER_DATA.contact.email}
            </a>
            <p className="text-sm text-neutral-500">{FOOTER_DATA.contact.address}</p>
          </div>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6">
        <p className="text-xs text-neutral-400">{FOOTER_DATA.legal.copyright}</p>
        <div className="flex items-center gap-5">
          {FOOTER_DATA.legal.links.map((link) => (
            <a key={link.label} href={link.href} className="text-xs text-neutral-400 hover:text-neutral-700 transition-colors">
              {link.label}
            </a>
          ))}
        </div>
      </div>

    </div>
  </footer>
);

export default Footer;