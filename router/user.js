import express from "express";
import registerUser from "../controller/userController.js";

const router= express.Router();

router.get("/login",(req,res)=>{
    res.render("user/login")
});

router.get("/register",(req,res)=>{
    res.render("user/register")
})

router.post("/register",registerUser)

export default router;