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
  // Scroll hide/show logic ke liye states
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Agar user neech scroll kar raha hai aur top se 50px se zyada neeche hai, toh navbar hide karo
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        // Agar user upar scroll kar raha hai, toh navbar show karo
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    // Scroll event listener add karna
    window.addEventListener("scroll", handleScroll);

    // Cleanup function
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  // CSS Logic Explaination:
  // 1. 'fixed top-0 w-full z-50' se navbar hamesha upar rahega aur baki elements ke upar dikhega.
  // 2. 'transition-transform duration-300' se smooth animation aayega.
  // 3. '-translate-y-full' navbar ko screen ke bahar (upar) dhakel dega jab hide karna ho.
  return (
    <section 
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ease-in-out py-6 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-[1500px] mx-auto px-8">
        <div className="flex items-center justify-between px-8 py-4 rounded-full bg-white/80 backdrop-blur-lg shadow-lg border border-white/40">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white text-sm">
              ●
            </div>
            <span className="font-semibold text-lg tracking-wide">
              GRAPHURA
            </span>
          </div>

          {/* Center Links */}
          <ul className="hidden md:flex items-center gap-10 text-sm font-semibold text-neutral-700">
            {navLinks.map((link) => (
              <li 
                key={link.id} 
                className="hover:text-black cursor-pointer transition"
              >
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>

          {/* Right Button */}
          <button className="px-6 py-2 rounded-full bg-black text-white text-sm font-medium hover:scale-105 transition-all duration-300 shadow-md">
            Get Started
          </button>

        </div>
      </div>
    </section>
  );
};

export default Navbar;