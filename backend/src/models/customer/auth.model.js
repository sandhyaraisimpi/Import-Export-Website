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
        required: true
    },
    contact: {
        type: Number,
        unique: true
    },
    profileImage:{
        type: String
    },
    gender:{
        type: String,
        enum:["Male", "Female", "Other"]
    },
    country:{
        type: String,
    }
}, {timestamps: true});

customerAuth_Schema.index({_id:1, email: 1})

const customerAuth_Model = await mongoose.model("Customer", customerAuth_Schema);

export default customerAuth_Model;