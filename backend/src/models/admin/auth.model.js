import mongoose, { Schema } from "mongoose";

const adminAuth_Schema = await Schema({
    name: {
        type: String,
        required: true
    },
    employeeId:{
        type: String,
        required: true,
        unique: true
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
    contact: {
        type: Number,
        unique: true
    },
    profileImage: {
        type: String
    },
    Gender: {
        type: String,
        enum: ["Male", "Female", "Other"]
    }
},
    { timestamps: true }
);

adminAuth_Schema.index({_id:1, email: 1});

const adminAuth_Model = await mongoose.model("admin", adminAuth_Schema);

export default adminAuth_Model;