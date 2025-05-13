import express from "express";
const router = express.Router();

import { register,login,logout,updateProfile } from "../controllers/user.controller.js";
import { isAuth,isRecruiter} from "../middlewares/isAuth.js";

router.post("/register",register)
router.post("/login",login)
router.get("/logout",logout)
router.put("/updateProfile",isAuth,updateProfile)

export default router;

