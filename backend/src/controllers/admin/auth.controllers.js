import adminAuth_Model from "../../models/admin/auth.model.js";
import { ApiError } from "../../utils/api-error.js";
import { ApiResponse } from "../../utils/api-response.js";
import { cookiesForUser } from "../../utils/cookiesForUser.js";
import { passwordDecrypt, passwordEncrypt } from "../../utils/bcryption.js";
import { generateOTP, getOTPExpiry, sendOTPEmail, verifyOTPValidity } from "../../utils/otp.js";

// Admin Signup
export const adminSignup = async (req, res) => {
    try {
        console.log("🔧 Admin Signup API Hit");
        console.log("Request body:", req.body);
        const { name, email, password, company, contact, profileImage, Gender } = req.body;
        
        // Validate required fields
        if (!name || !email || !password || !company) {
            return res.status(400).json(new ApiError(400, "Missing required fields: name, email, password, company"));
        }

        // Check if email already exists
        const existingAdmin = await adminAuth_Model.findOne({ email });
        if (existingAdmin) {
            return res.status(409).json(new ApiError(409, "Email already registered"));
        }

        console.log("🔐 Encrypting password...");
        const hashPassword = await passwordEncrypt(password);
        console.log("✅ Password encrypted successfully");
        
        const adminDetail = new adminAuth_Model({
            name: name.trim(),
            email,
            password: hashPassword,
            company,
            contact,
            profileImage,
            Gender
        });
        
        console.log("💾 Saving admin to database...");
        const clientDetail = await adminDetail.save();
        console.log("✅ Admin saved to database:", clientDetail);
        
        adminDetail.password = undefined;
        await cookiesForUser(res, adminDetail);
        return res.status(200).json(new ApiResponse(200, adminDetail, "Admin Signup Successfully."));
    } catch (err) {
        console.error("❌ Signup Error:", err);
        console.error("Error Stack:", err.stack);
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.name, stack: err.stack }]));
    }
};

// Admin Login
export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const adminDetail = await adminAuth_Model.findOne({ email });
        if (!adminDetail) {
            return res.status(404).json(new ApiError(404, "Admin not found"));
        }
        const isPasswordValid = await passwordDecrypt(password, adminDetail.password);
        if (!isPasswordValid) {
            return res.status(401).json(new ApiError(401, "Invalid credentials"));
        }
        adminDetail.password = undefined;
        await cookiesForUser(res, adminDetail);
        return res.status(200).json(new ApiResponse(200, adminDetail, "Admin Login Successfully."));
    } catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.name }]));
    }
};

// Admin Forgot Password - Send OTP
export const adminForgotPassword = async (req, res) => {
    try {
        console.log("📧 Forgot Password API Hit");
        const { email } = req.body;

        if (!email || !email.trim()) {
            return res.status(400).json(new ApiError(400, "Email is required"));
        }

        const adminDetail = await adminAuth_Model.findOne({ email: email.trim() });
        if (!adminDetail) {
            // Security: Don't reveal if email exists
            console.log(`⚠️ Admin not found with email: ${email}`);
            return res.status(404).json(new ApiError(404, "No account found with this email"));
        }

        // Generate OTP
        const otp = generateOTP();
        const otpExpiry = getOTPExpiry();

        console.log(`🔐 Generated OTP: ${otp}, Expiry: ${otpExpiry}`);

        // Send OTP email
        try {
            await sendOTPEmail(adminDetail.email, otp, adminDetail.name);
        } catch (emailError) {
            console.error("❌ Failed to send email:", emailError.message);
            return res.status(500).json(new ApiError(500, "Failed to send OTP email. Please try again later."));
        }

        // Update admin with OTP (don't save password reset status yet)
        adminDetail.otp = otp;
        adminDetail.otpExpiry = otpExpiry;
        adminDetail.isOtpVerified = false;
        await adminDetail.save();

        console.log("✅ OTP sent successfully");
        return res.status(200).json(new ApiResponse(200, null, "OTP sent to your registered email"));
    } catch (err) {
        console.error("❌ Forgot Password Error:", err);
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.name }]));
    }
};

// Verify OTP
export const verifyOTP = async (req, res) => {
    try {
        console.log("🔍 Verify OTP API Hit");
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json(new ApiError(400, "Email and OTP are required"));
        }

        const adminDetail = await adminAuth_Model.findOne({ email: email.trim() });
        if (!adminDetail) {
            return res.status(404).json(new ApiError(404, "Admin not found"));
        }

        if (!adminDetail.otp) {
            return res.status(400).json(new ApiError(400, "No OTP request found. Please request a new OTP."));
        }

        // Verify OTP validity
        const otpVerification = verifyOTPValidity(adminDetail.otp, otp, adminDetail.otpExpiry);
        if (!otpVerification.valid) {
            console.log(`❌ OTP verification failed: ${otpVerification.message}`);
            return res.status(400).json(new ApiError(400, otpVerification.message));
        }

        // Mark OTP as verified
        adminDetail.isOtpVerified = true;
        await adminDetail.save();

        console.log("✅ OTP verified successfully");
        return res.status(200).json(new ApiResponse(200, { email }, "OTP verified successfully"));
    } catch (err) {
        console.error("❌ OTP Verification Error:", err);
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.name }]));
    }
};

// Reset Password
export const resetPassword = async (req, res) => {
    try {
        console.log("🔐 Reset Password API Hit");
        const { email, newPassword, confirmPassword } = req.body;

        if (!email || !newPassword || !confirmPassword) {
            return res.status(400).json(new ApiError(400, "Email and passwords are required"));
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json(new ApiError(400, "Passwords do not match"));
        }

        if (newPassword.length < 6) {
            return res.status(400).json(new ApiError(400, "Password must be at least 6 characters long"));
        }

        const adminDetail = await adminAuth_Model.findOne({ email: email.trim() });
        if (!adminDetail) {
            return res.status(404).json(new ApiError(404, "Admin not found"));
        }

        if (!adminDetail.isOtpVerified) {
            return res.status(400).json(new ApiError(400, "OTP verification required before resetting password"));
        }

        // Encrypt new password
        const hashPassword = await passwordEncrypt(newPassword);

        // Update password and clear OTP
        adminDetail.password = hashPassword;
        adminDetail.otp = null;
        adminDetail.otpExpiry = null;
        adminDetail.isOtpVerified = false;
        await adminDetail.save();

        console.log("✅ Password reset successfully");
        return res.status(200).json(new ApiResponse(200, null, "Password reset successfully"));
    } catch (err) {
        console.error("❌ Reset Password Error:", err);
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.name }]));
    }
};

// Admin Profile
export const adminProfile = async (req, res) => {
    try {
        // Assuming admin is authenticated and admin id is available in req.user.id
        const adminId = req.user?.id;
        if (!adminId) {
            return res.status(401).json(new ApiError(401, "Unauthorized"));
        }
        const adminDetail = await adminAuth_Model.findById(adminId).select("-password");
        if (!adminDetail) {
            return res.status(404).json(new ApiError(404, "Admin not found"));
        }
        return res.status(200).json(new ApiResponse(200, adminDetail, "Admin Profile fetched successfully."));
    } catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.name }]));
    }
};
