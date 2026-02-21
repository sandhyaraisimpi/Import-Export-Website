import React, { useState } from "react";
import { Eye, EyeOff, CheckCircle, XCircle } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import leftLogin from "../../assets/login/leftlogin.webp";

export default function Login() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!form.email || !form.password) {
            toast.error("Please fill all fields");
            return;
        }

        if (!validateEmail(form.email)) {
            toast.error("Enter valid email");
            return;
        }

        setLoading(true);

        setTimeout(() => {
            toast.success("Login Successful 🎉");
            setLoading(false);

            // After login redirect (optional)
            // navigate("/dashboard");

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
                            Welcome Back.
                        </h1>
                        <p className="text-gray-200 text-sm">
                            Continue your premium import-export journey with us.
                        </p>
                    </div>
                </div>
            </div>
            {/* RIGHT SIDE */}
            <div className="flex w-full lg:w-1/2 items-center justify-center p-4">
                <form
                    onSubmit={handleLogin}
                    className="bg-white w-full max-w-sm p-6 rounded-2xl shadow-lg"
                >
                    <h2 className="text-2xl font-semibold text-indigo-900 mb-1">
                        Sign In
                    </h2>
                    <p className="text-gray-500 text-sm mb-4">
                        Access your account.
                    </p>

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
                                <CheckCircle
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500"
                                    size={16}
                                />
                            ) : (
                                <XCircle
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500"
                                    size={16}
                                />
                            ))}
                    </div>

                    {/* Password */}
                    <div className="relative mb-2">
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

                    {/* Forgot Password */}
                    <div className="text-right mb-4">
                        <span
                            onClick={() => navigate("/forgot-pass")}
                            className="text-xs text-indigo-900 cursor-pointer hover:underline"
                        >
                            Forgot Password?
                        </span>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2.5 text-sm rounded-lg bg-indigo-900 text-white font-medium hover:bg-indigo-800 transition"
                    >
                        {loading ? "Signing In..." : "Sign In"}
                    </button>

                    {/* Divider */}
                    <div className="flex items-center my-4">
                        <div className="flex-1 border-t"></div>
                        <span className="px-2 text-xs text-gray-400">OR</span>
                        <div className="flex-1 border-t"></div>
                    </div>

                    {/* Social Login */}
                    <div className="flex gap-2">


                        {/* Google Login  */}
                        <button
                            type="button"
                            className="w-full flex items-center justify-center gap-2 py-2.5 text-sm border rounded-lg hover:bg-gray-50 transition"
                        >
                            {/* Google SVG Icon */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 48 48"
                                width="18px"
                                height="18px"
                            >
                                <path fill="#EA4335" d="M24 9.5c3.54 0 6.74 1.22 9.25 3.6l6.9-6.9C35.92 2.8 30.4 0 24 0 14.64 0 6.44 5.64 2.68 13.84l8.04 6.24C12.64 13.2 17.84 9.5 24 9.5z" />
                                <path fill="#34A853" d="M46.14 24.5c0-1.64-.14-3.2-.4-4.7H24v9h12.44c-.54 2.9-2.18 5.36-4.64 7.04l7.16 5.56C43.98 37.04 46.14 31.36 46.14 24.5z" />
                                <path fill="#4A90E2" d="M10.72 28.08a14.8 14.8 0 010-8.16l-8.04-6.24A23.96 23.96 0 000 24c0 3.84.92 7.46 2.68 10.32l8.04-6.24z" />
                                <path fill="#FBBC05" d="M24 48c6.4 0 11.92-2.12 15.96-5.8l-7.16-5.56c-2 1.36-4.56 2.16-8.8 2.16-6.16 0-11.36-3.7-13.28-8.84l-8.04 6.24C6.44 42.36 14.64 48 24 48z" />
                            </svg>

                            Continue with Google
                        </button>
                    </div>

                    <p className="text-center text-xs text-gray-500 mt-4">
                        Don’t have an account?{" "}
                        <span
                            onClick={() => navigate("/signup")}
                            className="text-indigo-900 font-medium cursor-pointer"
                        >
                            Create Account
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
}