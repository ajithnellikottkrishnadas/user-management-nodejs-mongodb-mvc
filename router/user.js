import express from "express";
import {registerUser,loadLogin,loadRegister,login} from "../controller/userController.js";

const router= express.Router();

router.get("/login",loadLogin);

router.post("/login",login)

router.get("/register",loadRegister)

router.post("/register",registerUser)

export default router;