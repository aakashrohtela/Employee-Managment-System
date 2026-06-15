import mongoose from "mongoose";
const userSchema=new mongoose.Schema(
    {
        name:{
            type:String,
             required:true
        },
                email:{
            type:String,
             required:true,
             unique:true
        },
                password:{
            type:String,
             required:true
        },
                ProfileImageURL:{
            type:String,
            default:"https://cdn.vectorstock.com/i/500p/66/74/generic-user-silhouette-icon-vector-63606674.jpg",
    
        },
        role:{
            type:String,
            enum:["admin","user"],
            default:"user"
        },
    },
{timestamps:true}
)

const User=mongoose.model("User",userSchema)
export default User;