import User from "../models/users.model.js"
import bcryptjs from "bcryptjs" 
import { errorHandler } from "../utils/error.js"

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