import User from "../models/users.model.js"
import bcryptjs from "bcryptjs" 
import { errorHandler } from "../utils/error.js"
import jwt from "jsonwebtoken"
export const signup=async(req,res,next)=>{
const{name,email,password,ProfileImageUrl,adminJoinCode}=req.body

if(!name || !email || !password || name==="" ||email=== "" || password===""){
    return next(errorHandler(400,"All fields are required"))
}

const isAlreadyExist=await User.findOne({email})

if(isAlreadyExist){
    return next(errorHandler(400,"User already exists"))
}


let role="user"

if(adminJoinCode && adminJoinCode == process.env.ADMIN_JOIN_CODE){
    role:"admin"
}

const hashedPassowrd=bcryptjs.hashSync(password,10)

const newUser=new User({

    name,
    email,
    password:hashedPassowrd,
    ProfileImageUrl,
    role
})
try{
    await newUser.save()
    res.json("signup successful")
}
catch(error){
next(error.message)
}
}


export const signin=async (req,res,next)=>{
    try{
        const{email,password}=req.body
if(!email || !password ||email=== "" || password===""){
    return next(errorHandler(400,"All fields are required"))
}
const validUser=await User.findOne({email})

if(!validUser){
    return next(errorHandler(404,"User not found"))
}



const validPassword=bcryptjs.compareSync(password,validUser.password)


if(!validPassword){
    return next(errorHandler(400,"Wrong password"))
}

const token=jwt.sign({id:validUser._id},process.env.JWT_SECRET)

const {password:pass,...rest}=validUser._doc

res.status(200).cookie("access_token",token,{httpOnly:true}).json(rest)
    }
    catch(error){
        next(error)
    }
}

export const userProfile=async (req,res,next)=>{
    try{
const user=await user.findById(req.user._id)

if(!user){
    return next(errorHandler(404,"User not found"))
}

const{password:pass, ...rest}=user._doc
res.status(200).json(rest)
    }
    catch(error){
next(error)
    }
}