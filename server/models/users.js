import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Username is required"],
        minLength:[4,"Username should be greater than 4 chars"]
    },

    password:{
        type:String,
        minLength:[6,"Password should be of 6 chars"],
        required:true,   
    },
    
    email:{
        type:String,
        required:[true,"Email Id is required"],
        unique:[true,"Email Already Exists"],
    },

    role:{
        type:String,
        enum:["USER","AUTHOR","ADMIN"],
        required:[true,"User role is required"],
    },

},{timestamps:true});

export const User = mongoose.model("User",userSchema);