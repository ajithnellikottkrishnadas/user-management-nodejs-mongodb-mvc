import adminSchema from "../model/adminModel.js";
import bcrypt from "bcryptjs";
const saltround=10;
import userModel from "../model/userModel.js";

const loadLogin= async (req,res)=>{

    res.render("admin/login");
    
    }

const login= async (req,res)=>{

    try {
        
        const {email,password}= req.body;

        
        
       
        const admin= await adminSchema.findOne({email});
        if(!admin) return res.render("admin/login", {message: "admin does not exist" });
        console.log("111111");
        const isMatch= await bcrypt.compare(password, admin.password);
        if(!isMatch) return res.render("admin/login", {message: "passwor error"});
        
        req.session.admin=true;
        
        res.redirect("/admin/dashboard")

    } catch (error) {
        res.status(500).send("server error");
    }

}

const loadDashboard= async (req,res)=>{
    try {

        console.log("Session in /admin/dashboard:", req.session);
     
        const admin= req.session.admin;
        if(!admin) return res.redirect("admin/login");

        const users= await userModel.find({});

        res.render("admin/dashboard", {users});

        
    } catch (error) {
        res.status(500).send("server eroor");
    }
}

export {login,loadLogin,loadDashboard};