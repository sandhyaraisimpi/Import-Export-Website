import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import bgImage from "../../assets/Signup Background.webp";
import logo from "../../assets/logo/logo.webp";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    password: "",
    confirm: "",
    agree: false,
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let err = {};

    if (!form.name.trim()) err.name = "Name is required";

    if (!form.email) err.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      err.email = "Invalid email";

    if (!form.company.trim())
      err.company = "Company name required";

    if (!form.password)
      err.password = "Password required";
    else if (form.password.length < 6)
      err.password = "Minimum 6 characters";

    if (form.confirm !== form.password)
      err.confirm = "Passwords do not match";

    if (!form.agree)
      err.agree = "Accept terms to continue";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    signup(form);
    navigate("/");
  };

  return (
    <div className="h-screen flex">

      {/* ================= LEFT HERO ================= */}
      <div
        className="hidden lg:flex w-1/2 relative text-white"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-blue-900/70" />

        <div className="relative z-10 p-12 flex flex-col justify-between">

          <div>
            {/* LOGO */}
            <div className="flex items-center gap-3 mb-12">
              <img src={logo} alt="logo" className="w-50 h-15" />
            </div>

            <h2 className="text-4xl font-bold leading-tight">
              Powering the future of <br />
              international commerce.
            </h2>

            <p className="mt-4 text-blue-100 max-w-md">
              Manage your entire supply chain, customs
              documentation, and logistics partners in one
              unified SaaS dashboard designed for scale.
            </p>

            <div className="flex gap-10 mt-10 text-blue-100">
              <div>
                <h3 className="text-2xl font-bold text-white">
                  120+
                </h3>
                <p>Countries Served</p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white">
                  5,000+
                </h3>
                <p>Active Enterprises</p>
              </div>
            </div>
          </div>

          <p className="text-sm text-blue-200">
            © 2026 GlobalTrade Logistics. All rights reserved.
          </p>
        </div>
      </div>

      {/* ================= RIGHT FORM ================= */}
      <div className="flex-1 flex items-center justify-center bg-gray-100 p-6">

        <form
          onSubmit={handleSubmit}
          className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8"
        >
          <h2 className="text-3xl font-bold mb-2">
            Create your Admin Account
          </h2>

          <p className="text-gray-500 mb-6 text-sm">
            Join 5,000+ global trade partners managing
            international commerce.
          </p>

          {/* INPUT STYLE */}
          {input("Full Name", form.name, v => setForm({ ...form, name: v }))}
          {errors.name && error(errors.name)}

          {input("Work Email", form.email, v => setForm({ ...form, email: v }), "email")}
          {errors.email && error(errors.email)}

          {input("Company Name", form.company, v => setForm({ ...form, company: v }))}
          {errors.company && error(errors.company)}

          {input("Password", form.password, v => setForm({ ...form, password: v }), "password")}
          {errors.password && error(errors.password)}

          {input("Confirm Password", form.confirm, v => setForm({ ...form, confirm: v }), "password")}
          {errors.confirm && error(errors.confirm)}

          {/* TERMS */}
          <label className="flex items-center gap-2 text-sm mt-3">
            <input
              type="checkbox"
              checked={form.agree}
              onChange={(e) =>
                setForm({ ...form, agree: e.target.checked })
              }
            />
            I agree to the Terms & Privacy Policy
          </label>
          {errors.agree && error(errors.agree)}

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg mt-6 font-medium transition">
            Create Account
          </button>

          <p className="text-center mt-6 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-medium"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

/* reusable input */
function input(placeholder, value, set, type = "text") {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => set(e.target.value)}
      className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none p-3 rounded-lg mb-2 transition"
    />
  );
}

/* reusable error */
function error(msg) {
  return (
    <p className="text-red-500 text-xs mb-2 mt-1">
      {msg}
    </p>
  );
}
