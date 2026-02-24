import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone, Mail, MapPin, Send,
  CheckCircle2, Clock, Globe, MessageSquare
} from "lucide-react";

// ═══════════════════════════════════════════════════════════════
//  CONTACT DATA — Cleaned up (No active links)
// ═══════════════════════════════════════════════════════════════

const CONTACT_INFO = [
  {
    icon: Phone,
    label: "Phone Numbers",
    lines: ["98254 74047", "98254 74047", "98254 74047"],
  },
  {
    icon: Mail,
    label: "Email Address",
    lines: ["support@vrandsons.com"],
  },
  {
    icon: MapPin,
    label: "Office Address",
    lines: ["Kamrej, Surat", "Gujarat, India"],
  },
  {
    icon: Clock,
    label: "Business Hours",
    lines: ["Mon – Sat: 9:00 AM – 7:00 PM", "Sunday: Closed"],
  },
];

const COUNTRIES = [
  "Afghanistan", "Australia", "Bangladesh", "Brazil", "Canada",
  "China", "Egypt", "France", "Germany", "India", "Indonesia",
  "Iran", "Iraq", "Italy", "Japan", "Jordan", "Kenya", "Kuwait",
  "Malaysia", "Mexico", "Morocco", "Nepal", "Netherlands",
  "New Zealand", "Nigeria", "Pakistan", "Philippines", "Qatar",
  "Russia", "Saudi Arabia", "Singapore", "South Africa",
  "South Korea", "Spain", "Sri Lanka", "Tanzania", "Thailand",
  "Turkey", "UAE", "Uganda", "UK", "USA", "Vietnam", "Other",
];

const INITIAL_FORM = {
  name: "", email: "", mobile: "", company: "",
  country: "", quantity: "", message: "",
};

// ═══════════════════════════════════════════════════════════════

// ── Fade-up wrapper ───────────────────────────────────────────
const FadeUp = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

// ── Section Label ─────────────────────────────────────────────
const SectionLabel = ({ children }) => (
  <div className="flex items-center gap-3 mb-4">
    <div className="w-6 h-0.5 bg-[#C36A4D]" />
    <span className="text-[9px] font-black uppercase tracking-[0.5em] text-[#C36A4D]">
      {children}
    </span>
  </div>
);

// ── Input Field ───────────────────────────────────────────────
const Field = ({ label, error, children }) => (
  <div className="flex flex-col gap-2">
    <label className="text-[9px] font-black uppercase tracking-[0.35em] text-neutral-500">
      {label}
    </label>
    {children}
    {error && (
      <span className="text-[10px] text-red-500 font-medium">{error}</span>
    )}
  </div>
);

// Updated for light theme
const inputClass =
  "w-full bg-neutral-50 border border-neutral-200 rounded-xl px-5 py-3.5 text-[13px] text-neutral-900 placeholder-neutral-400 outline-none focus:border-[#C36A4D]/50 focus:bg-white focus:shadow-sm transition-all duration-300";

// ── Main Component ────────────────────────────────────────────
export default function ContactUs() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.email.trim()) newErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Enter a valid email address.";
    if (!form.mobile.trim()) newErrors.mobile = "Mobile number is required.";
    if (!form.country) newErrors.country = "Please select a country.";
    if (!form.message.trim()) newErrors.message = "Message is required.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }
    setLoading(true);
    // Simulate API call for the UI effect
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1600);
  };

  return (
    // Updated background to white and text to dark neutral
    <div className="bg-white text-neutral-900 font-sans overflow-x-hidden min-h-screen">

      {/* ── HERO ──────────────────────────────────────────────── */}
      {/* Kept the dark overlay on the hero image so the white text still pops beautifully */}
      <section className="relative h-[60vh] flex flex-col justify-end px-6 md:px-20 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1800&q=80"
            alt="Contact Hero"
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.2) saturate(0.6)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>

        <div className="absolute right-24 top-0 w-px h-full bg-gradient-to-b from-transparent via-[#C36A4D]/30 to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 max-w-7xl mx-auto w-full"
        >
          <SectionLabel>Get In Touch</SectionLabel>
          <h1
            className="font-black uppercase tracking-tighter leading-[0.82] text-white mb-5"
            style={{ fontSize: "clamp(3.5rem, 9vw, 8.5rem)" }}
          >
            Contact <span className="text-[#C36A4D]">Us</span>
          </h1>
          <p className="text-white/70 text-base max-w-md border-l-2 border-[#C36A4D]/50 pl-5 leading-relaxed">
            Reach out with your requirements and our team will get back to you promptly.
          </p>
        </motion.div>
      </section>

      {/* ── CONTACT INFO CARDS ─────────────────────────────────── */}
      <section className="py-20 px-6 md:px-20 border-b border-neutral-100 bg-neutral-50/50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CONTACT_INFO.map((item, i) => (
            <FadeUp key={i} delay={i * 0.08}>
              <div className="group bg-white border border-neutral-200 shadow-sm rounded-3xl p-7 h-full flex flex-col justify-between
                hover:border-[#C36A4D]/30 hover:shadow-[0_20px_50px_-15px_rgba(195,106,77,0.08)]
                transition-all duration-500">

                <div>
                  <div className="w-11 h-11 rounded-2xl bg-[#C36A4D]/10 border border-[#C36A4D]/20 flex items-center justify-center mb-6
                    group-hover:bg-[#C36A4D] group-hover:border-[#C36A4D] transition-all duration-300">
                    <item.icon size={18} className="text-[#C36A4D] group-hover:text-white transition-colors" />
                  </div>

                  <p className="text-[8px] font-black uppercase tracking-[0.4em] text-neutral-400 mb-3">
                    {item.label}
                  </p>
                  {item.lines.map((line, j) => (
                    <p key={j} className="text-neutral-800 text-sm font-semibold leading-relaxed">{line}</p>
                  ))}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── FORM + MAP ─────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-20 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-14">

          {/* ── INQUIRY FORM ─── (3/5 width) */}
          <div className="lg:col-span-3">
            <FadeUp>
              <div className="flex items-center gap-3 mb-2">
                <MessageSquare size={16} className="text-[#C36A4D]" />
                <SectionLabel>Inquiry Form</SectionLabel>
              </div>
              <h2
                className="text-neutral-900 font-black uppercase tracking-tighter mb-10"
                style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
              >
                Send Your <span className="text-[#C36A4D]">Requirements</span>
              </h2>
            </FadeUp>

            <AnimatePresence mode="wait">
              {submitted ? (
                /* ── Success State ── */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-emerald-50 border border-emerald-100 rounded-3xl p-14 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle2 size={28} className="text-emerald-600" />
                  </motion.div>
                  <h3 className="text-neutral-900 text-2xl font-black uppercase tracking-tight mb-3">
                    Inquiry Sent!
                  </h3>
                  <p className="text-neutral-600 text-sm leading-relaxed max-w-sm mx-auto mb-8">
                    Thank you for reaching out. Our team will review your inquiry and contact you within 24 hours.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm(INITIAL_FORM); }}
                    className="px-6 py-3 rounded-xl bg-white border border-neutral-200 text-neutral-500 text-[10px] font-black uppercase tracking-[0.35em] hover:bg-neutral-50 hover:text-neutral-900 transition-all shadow-sm"
                  >
                    Send Another
                  </button>
                </motion.div>
              ) : (
                /* ── Form ── */
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FadeUp delay={0.05}>
                      <Field label="Full Name *" error={errors.name}>
                        <input
                          name="name" value={form.name} onChange={handleChange}
                          placeholder="John Doe"
                          className={`${inputClass} ${errors.name ? "border-red-400" : ""}`}
                        />
                      </Field>
                    </FadeUp>
                    <FadeUp delay={0.08}>
                      <Field label="Email Address *" error={errors.email}>
                        <input
                          name="email" value={form.email} onChange={handleChange}
                          type="email" placeholder="john@company.com"
                          className={`${inputClass} ${errors.email ? "border-red-400" : ""}`}
                        />
                      </Field>
                    </FadeUp>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FadeUp delay={0.1}>
                      <Field label="Mobile Number *" error={errors.mobile}>
                        <input
                          name="mobile" value={form.mobile} onChange={handleChange}
                          placeholder="+1 234 567 8900"
                          className={`${inputClass} ${errors.mobile ? "border-red-400" : ""}`}
                        />
                      </Field>
                    </FadeUp>
                    <FadeUp delay={0.12}>
                      <Field label="Company Name" error={errors.company}>
                        <input
                          name="company" value={form.company} onChange={handleChange}
                          placeholder="Your Company Ltd."
                          className={inputClass}
                        />
                      </Field>
                    </FadeUp>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FadeUp delay={0.14}>
                      <Field label="Country *" error={errors.country}>
                        <select
                          name="country" value={form.country} onChange={handleChange}
                          className={`${inputClass} ${errors.country ? "border-red-400" : ""}`}
                        >
                          <option value="" disabled>Select Country</option>
                          {COUNTRIES.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </Field>
                    </FadeUp>
                    <FadeUp delay={0.16}>
                      <Field label="Required Quantity" error={errors.quantity}>
                        <input
                          name="quantity" value={form.quantity} onChange={handleChange}
                          placeholder="e.g. 500 kg / 10 tons"
                          className={inputClass}
                        />
                      </Field>
                    </FadeUp>
                  </div>

                  <FadeUp delay={0.18}>
                    <Field label="Message *" error={errors.message}>
                      <textarea
                        name="message" value={form.message} onChange={handleChange}
                        placeholder="Describe your product requirements, specifications, or any questions..."
                        rows={5}
                        className={`${inputClass} resize-none ${errors.message ? "border-red-400" : ""}`}
                      />
                    </Field>
                  </FadeUp>

                  <FadeUp delay={0.2}>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-[#C36A4D] text-white
                        text-[11px] font-black uppercase tracking-[0.35em] transition-all duration-300
                        hover:bg-[#d4785a] hover:shadow-[0_15px_40px_rgba(195,106,77,0.35)]
                        disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>
                          <Send size={14} /> Submit Inquiry
                        </>
                      )}
                    </button>
                    <p className="text-center text-[9px] text-neutral-400 tracking-widest uppercase mt-4">
                      Your inquiry will be reviewed within 24 business hours
                    </p>
                  </FadeUp>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* ── SIDEBAR INFO ─── (2/5 width) */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* Map embed - Removed the invert CSS filter for light theme */}
            <FadeUp delay={0.1}>
              <div className="rounded-3xl overflow-hidden border border-neutral-200 shadow-sm h-64">
                <iframe
                  title="VR & Sons Location"
                  src="https://maps.google.com/maps?q=Kamrej,Surat,Gujarat,India&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                />
              </div>
            </FadeUp>

            {/* Quick info panel */}
            <FadeUp delay={0.15}>
              <div className="bg-neutral-50 border border-neutral-200 shadow-sm rounded-3xl p-8 flex-1">
                <div className="flex items-center gap-2 mb-6">
                  <Globe size={14} className="text-[#C36A4D]" />
                  <p className="text-[9px] font-black uppercase tracking-[0.4em] text-neutral-500">
                    Global Trade Inquiry
                  </p>
                </div>

                <h3 className="text-neutral-900 text-xl font-black uppercase tracking-tight mb-4">
                  Why Inquire With Us?
                </h3>

                <ul className="space-y-4">
                  {[
                    "No minimum order for first inquiry",
                    "Direct manufacturer pricing",
                    "Export documentation support",
                    "Sample shipments available",
                    "Dedicated account manager",
                  ].map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-neutral-600 text-sm font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#C36A4D] mt-2 flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-6 border-t border-neutral-200">
                  <p className="text-[8px] font-black uppercase tracking-[0.4em] text-neutral-400 mb-3">
                    Response Time
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-neutral-700 text-sm font-bold">Within 24 business hours</span>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>

        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────── */}
      <footer className="border-t border-neutral-200 py-12 px-6 md:px-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#C36A4D] rounded-full flex items-center justify-center text-white font-black text-sm shadow-sm">
              V
            </div>
            <span className="text-neutral-900 font-black uppercase tracking-widest text-sm">VR & Sons</span>
          </div>
          <p className="text-neutral-500 text-xs font-mono font-medium">
            © {new Date().getFullYear()} VR & Sons Import Export. All rights reserved.
          </p>
          <p className="text-neutral-400 text-xs font-mono">
            Developed by <span className="text-[#C36A4D] font-bold">Graphura India Pvt. Ltd.</span>
          </p>
        </div>
      </footer>

    </div>
  );
}