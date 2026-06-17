import express from "express"
import { signin, signup, userProfile } from "../controller/auth.controller.js";
import { verifyToken } from "../utils/VerifyUser.js";

const router=express.Router()
router.post("/signup",signup)
router.post("/signin",signin);

router.get("/user-Profile",verifyToken,userProfile)
export default router;