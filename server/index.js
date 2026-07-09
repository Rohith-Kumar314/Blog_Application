import e from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import { articleRouter } from "./routes/articleRouter.js";
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