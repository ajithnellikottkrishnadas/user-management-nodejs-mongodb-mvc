import express from "express";
import  {loadLogin,login,loadDashboard,userUpdate,userDelete}  from "../controller/adminController.js";
import { adminCheckSession,isAdminLogin } from "../middleware/auth.js";
 
const router= express.Router();

router.get("/login",isAdminLogin,loadLogin);
router.post("/login",login);
router.get("/dashboard",adminCheckSession,loadDashboard);
router.post("/update/:id",adminCheckSession,userUpdate)
router.post("/delete/:id",adminCheckSession,userDelete)
export default router;