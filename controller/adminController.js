import adminModel from "../model/adminModel.js";
import bcrypt from "bcryptjs";
const saltround = 10;
import userModel from "../model/userModel.js";


const loadLogin = async (req, res) => {

    res.render("admin/login");

}

const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const admin = await adminModel.findOne({ email });
        if (!admin) return res.render("admin/login", { message: "admin does not exist" });
        console.log("111111");
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.render("admin/login", { message: "passwor error" });

        req.session.admin = true;
        res.redirect("/admin/dashboard");

    } catch (error) {
        res.status(500).send("server error");
    }

}

const loadDashboard = async (req, res) => {
    try {

        console.log("Session in /admin/dashboard:", req.session);

        const admin = req.session.admin;
        if (!admin) return res.redirect("admin/login");

        const users = await userModel.find({});
        const password = users.password;
        req.session.admin = true;
        res.render("admin/dashboard", { users, password });


    } catch (error) {
        res.status(500).send("server eroor");
    }
}

const userUpdate = async (req, res) => {

    try {

        const id = req.params.id; // one of the way to access id or there is another in below
        //const id= req.body.id
        const { email, password } = req.body;
        const updateData= {email} // exact meaning const updatedata={ email:email }

        if(password && password.trim()!=""){
            const hashedPassword= await bcrypt.hash(password,10);
            updateData.password= hashedPassword;
        }

        await userModel.findByIdAndUpdate(id, updateData);
        res.redirect("/admin/dashboard")


    } catch (error) {
       res.status(500).send(error);
    }



}

const userDelete= async (req,res)=>{

     try {
        
        const id = req.params.id;
        await userModel.findByIdAndDelete(id);
        res.redirect("/admin/dashboard");


     } catch (error) {
        res.status(500).send(error);
     }

}



export { login, loadLogin, loadDashboard, userUpdate, userDelete };