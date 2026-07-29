import jwt from "jsonwebtoken";
import { ExpressError } from "../utils/AppError.js";

export const isAuthenticated = (req, res, next) => {
  try {
    const token = req?.signedCookies?.token;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "user not logged in" });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    req.user = decodedToken; //assuming global middleware handles all types of token failure errors. 
    next();
  } catch (err) {
    next(err);
  }
};

export const authorize=(...allowedRoles)=>{
  return (req,res,next)=>{
    try{
      const userRole = req.user.role;
      if(!allowedRoles.includes(userRole)){
        throw new ExpressError("Unauthorized",403);
      }
      next()
    }catch(err){
      next(err);
    }
  }
}