import express from "express";
import userRoutes from "./router/user.js";
import adminRoutes from "./router/admin.js";

import {fileURLToPath} from "url";
import { dirname } from "path";
import path from "path";
import connectDB from "./db/connectDB.js";


const __dirname= dirname(fileURLToPath(import.meta.url));


const app= express();
const port = 3000;

app.use(express.urlencoded({ extended: true })); 
app.use(express.json())

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join( __dirname, "views"))
app.set("view engine", "hbs")



app.get("/",(req,res)=>{
    res.send("HEllo world");
})

connectDB();

app.use("/user", userRoutes);
app.use("/admin", adminRoutes);

app.listen(port,()=>{
    console.log(`Server running on port: ${port}`);
    
})