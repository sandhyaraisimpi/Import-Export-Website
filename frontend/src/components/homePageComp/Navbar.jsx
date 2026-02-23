import React, { useState, useEffect } from "react";

// --- NAVIGATION DATA ---
const navLinks = [
  { id: 1, label: "Home", href: "#" },
  { id: 2, label: "About Us", href: "#" },
  { id: 3, label: "Products", href: "#" },
  { id: 4, label: "Services", href: "#" },
  { id: 5, label: "Blog", href: "#" },
];

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
        setMenuOpen(false); // close menu on scroll down
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <section
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ease-in-out pt-1 pb-2 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-[1500px] mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between px-5 md:px-8 py-3 md:py-4 rounded-full bg-white/80 backdrop-blur-lg shadow-lg border border-white/40">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white text-sm">
              ●
            </div>
            <span className="font-semibold text-lg tracking-wide">GRAPHURA</span>
          </div>

          {/* Center Links — desktop only */}
          <ul className="hidden md:flex items-center gap-10 text-sm font-semibold text-neutral-700">
            {navLinks.map((link) => (
              <li key={link.id} className="hover:text-black cursor-pointer transition">
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* CTA button — always visible */}
            <button className="px-5 py-2 rounded-full bg-black text-white text-sm font-medium hover:scale-105 transition-all duration-300 shadow-md">
              Get Started
            </button>

            {/* Hamburger — mobile only */}
            <button
              className="md:hidden flex flex-col justify-center items-center w-9 h-9 rounded-full border border-neutral-200 bg-white shadow-sm gap-1.5"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              {/* Animated bars */}
              <span
                className={`block h-0.5 w-4 bg-black rounded-full transition-all duration-300 origin-center ${
                  menuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-4 bg-black rounded-full transition-all duration-300 ${
                  menuOpen ? "opacity-0 scale-x-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-4 bg-black rounded-full transition-all duration-300 origin-center ${
                  menuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            menuOpen ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"
          }`}
        >
          <ul className="flex flex-col bg-white/90 backdrop-blur-lg rounded-3xl shadow-lg border border-white/40 px-6 py-4 gap-1">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  className="flex items-center justify-between py-3 text-sm font-semibold text-neutral-700 hover:text-black border-b border-neutral-100 last:border-0 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Navbar;