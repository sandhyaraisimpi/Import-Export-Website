import { Router } from "express";
import { Signup, Login, forgetPassword, updateProfile, getMyProfile, signupOtp, forgetPasswordOtp, GoogleAuth, Signout, customerForgotPassword, customerVerifyOTP, customerResetPassword } from "../../controllers/customer/auth.controllers.js";
import { duplicateEmail } from "../../middlewares/duplicateEmail.middleware.js";
import { customerPresent } from "../../middlewares/emailIsPresent.middleware.js";
import { requiredLogin } from "../../middlewares/requiredLogin.midddleware.js";
import multer from "multer"

const router = Router();

const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true); // allow all image types
        } else {
            cb(new Error("Only image files are allowed"), false);
        }
    }
});

// Authentication routes
router.post("/signup", Signup);
router.post("/login", customerPresent, Login);
router.patch('/forgetpassword', forgetPassword);

// OTP-Based Forgot Password Flow
router.post('/forgot-password', customerForgotPassword);
router.post('/verify-otp', customerVerifyOTP);
router.post('/reset-password-otp', customerResetPassword);

// Profile routes
router.put('/updateProfile', requiredLogin, upload.single("profileImage"), updateProfile);
router.get("/myprofile", requiredLogin, getMyProfile);

// Old OTP routes (keeping for backward compatibility)
router.post('/signupOtp', duplicateEmail, signupOtp);
router.post("/forgetpasswordOtp", customerPresent, forgetPasswordOtp);

// Social auth
router.post("/google", GoogleAuth);
router.post("/signout", Signout);

export default router