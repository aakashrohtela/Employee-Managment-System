import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.route.js"


dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Database connected");
  })
  .catch((err) => {
    console.error("❌ DB Error:", err);
  });

app.use(cors({
  origin: process.env.FRONT_END_URL || "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

app.listen(3000, () => {
  console.log("🚀 Server running on port 3000");
});


app.use("/api/auth",authRoutes)

app.use((err,req,res,next)=>{
  const statusCode=err.statusCode || 500
  const message=err.message || "Internal Server error"
  res.status(statusCode).json({
    success:false,
    statusCode,
    message,
  })
})


// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import mongoose from "mongoose";

// dotenv.config();

// const app = express();

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("✅ Database connected");
//   })
//   .catch((err) => {
//     console.error("❌ DB Error:", err);
//   });

// app.use(cors({
//   origin: process.env.FRONT_END_URL || "http://localhost:5173",
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization"]
// }));

// app.use(express.json());

// app.listen(3000, () => {
//   console.log("🚀 Server is running on port 3000!");
// });



// import express from "express"
// import cors from "cors"
// import dotenv from "dotenv"
// import mongoose  from "mongoose"


// dotenv.config();
// console.log("Mongo URI:", process.env.MONGO_URI);
// const app=express()

// app.use(cors({
//     origin: process.env.FRONT_END_URL || "http://localhost:5173",
//     methods:["GET","POST","PUT","DELETE"],
//     allowedHeaders:["Content-Type","Authorization"]
// }))

// app.use(express.json())

// app.listen(3000,()=>{
//     console.log("server is running on port 3000!");
// })


