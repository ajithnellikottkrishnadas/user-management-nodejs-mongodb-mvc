import express from "express";
import  {loadLogin,login,loadDashboard}  from "../controller/adminController.js";

const router= express.Router();

router.get("/login",loadLogin);
router.post("/login",login)
router.get("/dashboard",loadDashboard)

export default router;