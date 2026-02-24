import mongoose, {Schema} from "mongoose";

const customerAuth_Schema = new Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
    },
    contact: {
        type: Number,
        unique: true,
        sparse: true
    },
    profileImage:{
        type: String
    },
    gender:{
        type: String,
        enum:["Male", "Female", "Other"]
    },
    dob:{
        type: String,
    },
    country:{
        type: String,
    },
    state:{
        type: String,
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
}, {timestamps: true});

const customerAuth_Model = mongoose.model("Customer", customerAuth_Schema);

export default customerAuth_Model;