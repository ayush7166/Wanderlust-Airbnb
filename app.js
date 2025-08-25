if(process.env.NODE_ENV != "production"){
    require('dotenv').config()
}

const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const methodOverride = require("method-override");
const ejsmate=require("ejs-mate");
const listingrouter = require("./router/listing_router.js");
const reviewrouter = require("./router/review_router.js");
const userrouter = require("./router/user_router.js");
const ExpressError=require("./utils/ExpressError.js");
const cookieparser=require("cookie-parser");
const session=require("express-session");
const MongoStore=require("connect-mongo")
const flash=require("connect-flash");
const User=require("./models/userschema.js");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const { optional } = require('joi');


const dburl=process.env.ATLASDB_URL;

const store=MongoStore.create({
    mongoUrl:dburl,
    crypto:{
        secret:"hello",
        touchafter :24*3600,
    }
})
store.on("error",()=>{
    console.log("error in mongo session store",err);
})

const sessionOption = {
    store,
    secret: "hello",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,             
        httpOnly: true,
    },
};


app.use(session(sessionOption));//send a cookie connect.sid
app.use(cookieparser("hello"))
app.use(passport.initialize());
app.use(passport.session())
// passport
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(express.static(path.join(__dirname, "/public")));
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.engine("ejs",ejsmate);
app.use(methodOverride("_method"));
app.use(flash());
app.use((req, res, next) => {
    res.locals.curruser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});


async function main(){
    await mongoose.connect(dburl);    
}

main()
.then(()=>{
    console.log("connection done with wanderlust!!");
})
.catch((err)=>{
    console.log(err);
})



app.get("/",(req,res)=>{
    res.send("root");
})

app.use("/listings",listingrouter);
app.use("/listings/:id",reviewrouter)
app.use("/user",userrouter);

// error

app.all("*",(req,res,next)=>{
    throw new ExpressError(404,"Page Not Found!!");
})
app.use((err, req, res, next) => {
    const { status = 500, message = "Something went wrong!" } = err;
    res.render("error.ejs",{status,message});
});


app.listen(8080,()=>{
    console.log("listening!!");
})
