import mongoose, { Schema } from "mongoose";
import crypto from "crypto";

const adminAuth_Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    employeeId:{
        type: String,
        unique: true,
        default: () => crypto.randomUUID()
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    contact: {
        type: Number
    },
    profileImage: {
        type: String
    },
    Gender: {
        type: String,
        enum: ["Male", "Female", "Other"]
    },
    // OTP Fields for forgot password
    otp: {
        type: String,
        default: null
    },
    otpExpiry: {
        type: Date,
        default: null
    },
    isOtpVerified: {
        type: Boolean,
        default: false
    }
},
    { timestamps: true }
);

const adminAuth_Model = mongoose.model("admin", adminAuth_Schema);

export default adminAuth_Model;