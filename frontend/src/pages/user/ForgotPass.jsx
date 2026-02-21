import { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import leftLogin from "../../assets/login/leftlogin.webp";

export default function ForgotPassword() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email) {
            toast.error("Please enter your email");
            return;
        }

        if (!validateEmail(email)) {
            toast.error("Enter valid email address");
            return;
        }

        setLoading(true);

        setTimeout(() => {
            toast.success("Reset link sent to your email 📩");
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen flex bg-[#f4f2ee]">
            <Toaster />

            <div className="hidden lg:flex w-1/2 relative">
                <img
                    src={leftLogin}
                    alt="Forgot Password Visual"
                    className="w-full h-screen object-cover"
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/40"></div>

                {/* Text Over Image */}
                <div className="absolute inset-0 flex items-center p-12">
                    <div className="text-white max-w-sm">
                        <h1 className="text-4xl font-bold mb-4 leading-tight">
                            Reset With Confidence.
                        </h1>
                        <p className="text-gray-200 text-sm">
                            Secure your account and continue your premium import-export journey.
                        </p>
                    </div>
                </div>
            </div>

            {/* RIGHT FORM CARD */}
            <div className="flex w-full lg:w-1/2 items-center justify-center p-4">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white w-full max-w-sm p-6 rounded-2xl shadow-lg"
                >
                    <h2 className="text-2xl font-semibold text-indigo-900 mb-1">
                        Forgot Password
                    </h2>
                    <p className="text-gray-500 text-sm mb-4">
                        Enter your registered email to receive a reset link.
                    </p>

                    {/* Email */}
                    <div className="relative mb-4">
                        <input
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2.5 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
                        />
                        {email &&
                            (validateEmail(email) ? (
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

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2.5 text-sm rounded-lg bg-indigo-900 text-white font-medium hover:bg-indigo-800 transition"
                    >
                        {loading ? "Sending..." : "Send Reset Link"}
                    </button>

                    {/* Back to Login */}
                    <p className="text-center text-xs text-gray-500 mt-4">
                        Remember your password?{" "}
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