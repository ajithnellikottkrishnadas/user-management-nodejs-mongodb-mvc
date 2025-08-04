const userCheckSession=(req,res,next)=>{
    if(req.session.user){
        next();
    } else{
        res.redirect("/user/login")
    }
}

const isUserLogin=(req,res,next)=>{
    if (req.session.user) {
        res.redirect("/user/userHome")
    } else {
        next();
    }
}

const adminCheckSession=(req,res,next)=>{

    if(req.session.admin){
        next();
    }else{
        res.redirect("/admin/login");
    }

}

const isAdminLogin=(req,res,next)=>{

    if(req.session.admin){
        res.redirect("/admin/dashboard")
    }else{
        next();
    }

}

export { isUserLogin, userCheckSession,isAdminLogin,adminCheckSession};