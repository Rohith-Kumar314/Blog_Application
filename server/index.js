import e from "express";
import mongoose from "mongoose";
import cookieParser from 'cookie-parser';
import { config } from "dotenv";

import { articleRouter } from "./routes/articleRouter.js";
import { authRouter } from "./routes/authRoutes.js";

config();

const app = e();
const PORT = process.env.PORT || 4000;
const DBURL = process.env.DBURL || "mongodb://localhost:27017/blog-app"

app.use(e.json());


app.use('/articles',articleRouter);

// get route for testing the server running or not
app.get("/",(req,res)=>{
    res.status(200).json({success:true,message:"Server Running successfully"});
});


app.use((err,req,res,next)=>{
    console.dir(err,{depth:null, colors:true});
    const {status=500,message="Internal Server Error"}=err;
    res.status(status).json({ success: false, message: message });
})

// DB Connection
connect(); // since the functions are hoisted in js
async function connect(){
    try{
        await mongoose.connect(DBURL);
        console.log("DB Connected successfully");
        app.listen(PORT,()=>{
            console.log(`Server Started on ${PORT}`);
        })
    }catch(err){
        console.log("ERROR",err);
    } 
}