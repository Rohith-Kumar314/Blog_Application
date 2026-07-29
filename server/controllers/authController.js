import { jwt, success } from "zod";
import { User } from "../models/users.js";
// import { hash } from "zod";
import {hash , compare} from "bcryptjs";
import { sign } from "jsonwebtoken";

export const register = async(req,res)=>{
    const {username, password,email,role}=req.body;
    const allowedRoles = ["USER", "AUTHOR"];

    if(!username || !password || !email || !role){
        return res.status(400).json({success:false,message:"All fields are required"});
    }

    if (!allowedRoles.includes(role)) {
        return res.status(400).json({
            success: false,
            message: "Invalid role"
        });
    }
    const hashedPassword = await hash(password,10);
    const newUser = new User({
        username,
        password:hashedPassword,
        email,
        role
    });

    const dbResp = await newUser.save().select('-password');
    const user = dbResp.toObject();
    delete user.password;
    res.status(201).json({success:true, message: "Registered User successfully", data : user});
}

export const login = async(req,res) =>{
    const {email,password}=req.body;

    if(!email || !password){
        return res.status(400).json({success:false, message:"All fields are required"});
    }

    const user = await User.findOne({email});

    if(!user){
        return res.status(404).json({success:false,message:"Invalid email or password"});
    }

    const isMatch = await compare(password,user.password);

    if(!isMatch){
        return res.status(404).json({success:false, message:"Invalid email or password"})
    }

    const token = sign({id: user._id,username:user.username, role:user.role},process.env.JWT_SECRET,{expiresIn:"24h"});
    res.cookie("token",token,{
        secure:true,
        httpOnly:true,
        sameSite:'lax',
        signed:true,

    });

    res.status(200).json({success:true, message:"User logged in Successfully"});

}

export const logout = (req,res) =>{

}