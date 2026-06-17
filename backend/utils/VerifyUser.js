import { errorHandler } from "./error.js"
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser"


export const verifyToken=(req,res,next)=>{
    const token=req.cookies.access_token

    if(!token){
        return next(errorHandler(401,"unauthorizes"))
    }
    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err){
            return next(errorHandler(401,"unauthorizes"))
        }
        req.user=user
        next()
    });
}

export const adminOnly =(req,res,next)=>{
    if(req.user && req.user.role === "admin"){
        next()
    }
    else{
        return next(errorHandler(403,"access denied"))
    }
}