const express=require("express")
const app=express()
const path =require("path")
const routes=express.Router();
let User=require("../models/user.js")
const passport=require("passport")

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended:true}))
app.set("view engine","ejs")


routes.get("/signup",(req,res)=>{
    res.render("signup.ejs");
})
routes.post("/signup" , async (req,res)=>{
    let {username,email,password}=req.body;
    const newuser= new User({email,username})
    let registeruser = await User.register(newuser,password);
    console.log(registeruser);
    req.login(registeruser,(err)=>{
        if(err) return next(err);
         req.flash("success","Welcome to Wanderlust !")
         res.redirect("/listing")
    })
})
routes.get("/login",(req,res)=>{
    res.render("login.ejs");
})
routes.post(
    "/login",
    passport.authenticate("local",{
        failureRedirect:"/login",
        failureFlash:true
    }),
    async (req,res)=>{
        req.flash("success","Welcome to wanderlust !")
        res.redirect("/listing")

})
routes.get("/logout",(req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            next(err);
        }
        else{
            req.flash("success","you logedout succesfully!")
            res.redirect("/listing")
        }
    })
})


module.exports=routes