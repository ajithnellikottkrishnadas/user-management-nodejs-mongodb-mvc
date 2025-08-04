import express from "express";
import {registerUser,loadLogin,loadRegister,login , loadHome,logout} from "../controller/userController.js";
import { isUserLogin, userCheckSession } from "../middleware/auth.js";

const router= express.Router();

router.get("/login",isUserLogin,loadLogin);

router.post("/login",login)

router.get("/register",isUserLogin,loadRegister)

router.post("/register",registerUser)

router.get("/userHome",userCheckSession,loadHome);

router.get("/logout",logout)

export default router;