const express = require("express");
const router = express.Router();

const passport = require("passport");
const usercontroller=require("../controller/usercontroller.js")


router
    .route("/login")
    .get(usercontroller.renderloginpage)
    .post(passport.authenticate("local", {failureRedirect: "/user/login",failureFlash: true,}),usercontroller.loginuser);


router
    .route("/signup")
    .get(usercontroller.rendersignupform)
    .post(usercontroller.usersignup);

router.get("/logout",usercontroller.userlogin);

module.exports = router;










