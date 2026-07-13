import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Username is required"],
        minLength:[4,"Username should be greater then 4 chars"]
    },

    password:{
        type:String,
        minLength:[6,"Password should be of 6 chars"],
        required:true,   
    },
    
    role:{
        type:String,
        enum:["USER","AUTHOR","ADMIN"],
        required:[true,"User role is required"],
    },
},{timestamps:true});

export const User = mongoose.model("User",userSchema);