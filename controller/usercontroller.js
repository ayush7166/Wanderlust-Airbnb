const User=require("../models/userschema.js")

module.exports.renderloginpage=(req, res) => {
    res.render("user/login.ejs"); // path is relative to views/
}

module.exports.loginuser=(req, res) => {
    req.flash("success", "Login successful!");
    res.redirect("/listings");
}

module.exports.rendersignupform=(req, res) => {
    res.render("user/signup.ejs"); // path is relative to views/
}

module.exports.usersignup=async (req,res)=>{
    let {username,email,password}=req.body;
    const newuser=new User({email,username});
    await User.register(newuser,password);
    req.login(newuser,((err)=>{
      if(err){
        next(err);
      }
      req.flash("success","signup successfully!!");
      res.redirect("/listings");
    }))
}
module.exports.userlogin=(req,res)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        req.flash("success","user loggedout successfully!!!");

        res.redirect("/listings");
    })
}