import { useState, useEffect } from "react";
import { Eye, EyeOff, CheckCircle, XCircle } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import leftLogin from "../../assets/login/leftlogin.webp";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") setForm({ ...form, [name]: checked });
    else setForm({ ...form, [name]: value });
  };

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const validatePassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password);

  const handlePasswordStrength = (password) => {
    if (password.length >= 12 && /[A-Z]/.test(password) && /[0-9]/.test(password)) {
      setPasswordStrength("Strong");
    } else if (password.length >= 8) {
      setPasswordStrength("Medium");
    } else {
      setPasswordStrength("Weak");
    }
  };

  useEffect(() => {
    handlePasswordStrength(form.password);
  }, [form.password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (!form.fullName || !form.email || !form.password || !form.confirmPassword) {
      toast.error("Please fill all required fields");
      setLoading(false);
      return;
    }

    if (!validateEmail(form.email)) {
      toast.error("Invalid email format");
      setLoading(false);
      return;
    }

    if (!validatePassword(form.password)) {
      toast.error("Password must be strong");
      setLoading(false);
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    if (!form.terms) {
      toast.error("Accept Terms & Conditions");
      setLoading(false);
      return;
    }

    setTimeout(() => {
      toast.success("Signup successful!");
      setLoading(false);

      // Signup ke baad login pe redirect
      navigate("/login");

    }, 1500);
  };

  return (
    <div className="min-h-screen flex bg-[#f4f2ee]">
      <Toaster />

      {/* LEFT SIDE IMAGE */}
                  <div className="hidden lg:flex w-1/2 relative">
                      <img
                          src={leftLogin}
                          alt="Login Visual"
                          className="w-full h-screen object-cover"
                      />
      
                      {/*  Dark Overlay  */}
                      <div className="absolute inset-0 bg-black/40"></div>
      
                      {/*  Text Over Image */}
                      <div className="absolute inset-0 flex items-center p-12">
                          <div className="text-white max-w-sm">
                              <h1 className="text-4xl font-bold mb-4 leading-tight">
                                  Create Your Account
                              </h1>
                              <p className="text-gray-200 text-sm">
                                 Sign up to get started and access all features of our platform.
                              </p>
                              <p className="text-gray-200 text-sm">
                                 Fill in your details below to create a secure account and begin your journey with us.
                              </p>
                          </div>
                      </div>
                  </div>

      {/* RIGHT SIDE */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white w-full max-w-sm p-6 rounded-2xl shadow-lg"
        >
          <h2 className="text-2xl font-semibold text-indigo-900 mb-1">
            Create Account
          </h2>
          <p className="text-gray-500 text-sm mb-4">
            Start your premium journey.
          </p>

          {/* Full Name */}
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            className="w-full mb-3 px-3 py-2.5 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
          />

          {/* Email */}
          <div className="relative mb-3">
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={form.email}
              onChange={handleChange}
              className="w-full px-3 py-2.5 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
            {form.email &&
              (validateEmail(form.email) ? (
                <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500" size={16} />
              ) : (
                <XCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500" size={16} />
              ))}
          </div>

          {/* Password */}
          <div className="relative mb-3">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-3 py-2.5 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none pr-10"
            />
            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </span>
          </div>

          {/* Confirm Password */}
          <input
            type={showConfirm ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full mb-4 px-3 py-2.5 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
          />

          {/* Terms */}
          <label className="flex items-center mb-4 text-xs text-gray-600">
            <input
              type="checkbox"
              name="terms"
              checked={form.terms}
              onChange={handleChange}
              className="mr-2 accent-indigo-600"
            />
            I agree to Terms & Conditions
          </label>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 text-sm rounded-lg bg-indigo-900 text-white font-medium hover:bg-indigo-800 transition"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>

          <p className="text-center text-xs text-gray-500 mt-4">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-indigo-900 font-medium cursor-pointer"
            >
              Sign In
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}