import userSchema from "../model/userModel.js"

const registerUser = async (req, res) => {

    try {

        const { email, password } = req.body;
        const userCheck = await userSchema.findOne({ email });
        console.log("aaaa");

        if (userCheck) {
            return res.render("user/register", { message: `user already exist` });
        } else {

            const newUser = new userSchema({
                email,
                password
            });
            await newUser.save();
            res.render("user/login", { message: `usere created succesfully` })

        }    



    } catch (error) {
        console.log("error: ", error);

        res.status(500).send(`server error`)
    }

}



export default registerUser;