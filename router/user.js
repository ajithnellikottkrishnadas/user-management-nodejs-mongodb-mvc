import express from "express";
import {registerUser,loadLogin,loadRegister,login , loadHome,logout} from "../controller/userController.js";
import { isLogin, checkSession } from "../middleware/auth.js";

const router= express.Router();

router.get("/login",isLogin,loadLogin);

router.post("/login",login)

router.get("/register",isLogin,loadRegister)

router.post("/register",registerUser)

router.get("/userHome",checkSession,loadHome);

router.get("/logout",logout)

export default router;