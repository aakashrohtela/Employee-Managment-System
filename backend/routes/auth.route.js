import express from "express"
import { signin, signup, updateUserProfile, userProfile } from "../controller/auth.controller.js"
import { verifyToken } from "../utils/VerifyUser.js" 

const router=express.Router()
router.post("/signup",signup)
router.post("/signin",signin);

router.get("/userProfile",verifyToken,userProfile)
router.put("/update-profile",verifyToken,updateUserProfile)
export default router;