import express from "express";
import { adminSignup, adminLogin, adminForgotPassword, adminProfile, verifyOTP, resetPassword } from "../../controllers/admin/auth.controllers.js";
import { requiredLogin } from "../../middlewares/requiredLogin.midddleware.js";

const router = express.Router();

// Authentication routes
router.post("/signup", adminSignup);
router.post("/login", adminLogin);

// Forgot password flow
router.post("/forgot-password", adminForgotPassword);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password-otp", resetPassword);

// Protected routes
router.get("/profile", requiredLogin, adminProfile);

export default router;
