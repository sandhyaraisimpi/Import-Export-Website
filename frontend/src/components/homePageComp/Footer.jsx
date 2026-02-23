import React from "react";
import { useState } from "react";
import { postService } from "../../service/axios";
import { Toaster, toast } from "react-hot-toast";

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

  const [email, setEmail] = useState();

  const subscribe = async () => {
    const apiResponse = await postService("/customer/subscribe", { email });

    if (!apiResponse.ok && !apiResponse.fetchMessage) {
      toast.error("Failed to Subscribe")
      console.log(apiResponse.message);
      return
    }

    if (!apiResponse.ok && apiResponse.fetchMessage) {
      toast.error(apiResponse.message || "Failed to Subscribe");
      return
    }

    toast.success(apiResponse.data.message || "Subscribe Succesful");
    setEmail("")

  }

  return (
    <footer className="bg-neutral-200 py-24">
      <Toaster />
      <div className="max-w-[1500px] mx-auto px-8">

        {/* TOP GRID */}
        <div className="grid md:grid-cols-3 gap-20 mb-20">

          {/* LEFT - Brand Info */}
          <div>
            <h3 className="text-2xl font-semibold tracking-widest mb-4">
              {companyInfo.name}
            </h3>
            <p className="text-neutral-600 text-sm">
              {companyInfo.description}
            </p>
          </div>

          {/* CENTER - Quick Links */}
          <div>
            <h4 className="font-semibold mb-6 text-neutral-900">
              Quick Links
            </h4>
            <ul className="space-y-4 text-sm">
              {quickLinks.map((link) => (
                <li key={link.id} className="font-bold cursor-pointer hover:text-neutral-600 transition-colors">
                  {link.label}
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT - Contact Details */}
          <div>
            <h4 className="font-semibold mb-6 text-neutral-900">
              Contact Details
            </h4>

            <div className="space-y-4 text-sm mb-6">
              <p className="flex items-center gap-3">
                <span className="font-semibold text-black">Phone:</span>
                <span className="text-neutral-600">{contactDetails.phone}</span>
              </p>
              <p className="flex items-center gap-3">
                <span className="font-semibold text-black">Email:</span>
                <span className="text-neutral-600">{contactDetails.email}</span>
              </p>
              <p className="flex items-start gap-3">
                <span className="font-semibold text-black">Address:</span>
                <span className="text-neutral-600">{contactDetails.address}</span>
              </p>
            </div>

            <button className="px-6 py-3 bg-black text-white rounded-full text-sm hover:bg-neutral-800 transition-colors">
              Submit Inquiry
            </button>
          </div>

        </div>

        {/* BOTTOM GRID */}
        <div className="grid md:grid-cols-3 gap-20">

          {/* LEFT - Newsletter */}
          <div>
            <h4 className="font-semibold mb-4 text-neutral-900">
              Subscribe to our news
            </h4>
            <p className="text-sm mb-6 text-neutral-600">
              Stay informed and receive exclusive updates on our products.
            </p>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border-b border-neutral-400 outline-none py-2 text-sm mb-4 bg-transparent focus:border-black transition-colors"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              className="px-5 py-2 bg-black text-white rounded-full text-sm hover:bg-neutral-800 transition-colors"
              onClick={subscribe}
            >
              Subscribe
            </button>
          </div>

          {/* CENTER - Address (Visual) */}
          <div>
            <p className="text-sm leading-relaxed text-neutral-700">
              {addressLines.map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  {index !== addressLines.length - 1 && <br />}
                </React.Fragment>
              ))}
            </p>
          </div>

          {/* RIGHT - Copyright & Legal */}
          <div className="text-sm text-neutral-500 flex flex-col justify-between">
            <p>{companyInfo.copyright}</p>

            <div className="flex gap-6 mt-6">
              {legalLinks.map((link) => (
                <span key={link.id} className="cursor-pointer hover:text-black transition-colors">
                  {link.label}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;