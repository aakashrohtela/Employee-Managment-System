import User from "../models/users.model.js"
import bcryptjs from "bcryptjs" 

export const signup=async(req,res)=>{
const{name,email,password,ProfileImageUrl,adminJoinCode}=req.body

if(!name || !email || !password || name==="" ||email=== "" || password===""){
    return res.status(404).json({message:"all fields are required"})
}

const isAlreadyExist=await User.findOne({email})

if(isAlreadyExist){
    return res.status(400).json({success:false,message:"already user exists"})
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
res.status(500).json({message:error.message()})
}
}