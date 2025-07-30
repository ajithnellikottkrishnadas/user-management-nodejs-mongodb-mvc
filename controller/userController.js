import userSchema from "../model/userModel.js"
import bcrypt, { compare } from "bcryptjs"
const saltround = 10;

const registerUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, saltround)
        const userCheck = await userSchema.findOne({ email });
        console.log("aaaa");

        if (userCheck) {
            return res.render("user/register", { message: `user already exist` });
        } else {
            const newUser = new userSchema({
                email,
                password: hashedPassword
            });
            await newUser.save();
            res.render("user/login", { message: `user created successfully` })
        }

    } catch (error) {
        console.log("error: ", error);
        res.status(500).send(`server error`)
    }
}

const login = async (req, res) => {
    try {

        const { email, password } = req.body;
        const user = await userSchema.findOne({ email });
        if (!user) {
            console.log("user not found 11");
            
            return res.render("user/login", { message: "user not exist" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("password match: ",isMatch);
        


        if (!isMatch) return res.render("user/login", { message: "password incorrect" });
        

        res.render("user/home", { message: "login successfull" });

    } catch (error) {

        console.log("error: ", error);
        res.status(500).send("server error")

    }
}

const loadRegister = (req, res) => {
    res.render("user/register");
}

const loadLogin = (req, res) => {
    res.render("user/login")
}

export { loadRegister, loadLogin, registerUser, login };