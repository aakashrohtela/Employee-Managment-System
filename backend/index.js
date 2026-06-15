import express from "express"
import cors from "cors"
import dotenv from "dotenv"


dotenv.config()

const app=express()

app.use(cors({
    origin: process.env.FRONT_END_URL || "http://localhost:5173",
    methods:["GET","POST","PUT","DELETE"],
    allowedHeaders:["Content-Type","Authorization"]
}))

app.use(express.json())

app.listen(3000,()=>{
    console.log("server is running on port 3000!");
})