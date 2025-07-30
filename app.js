const express=require("express")
const app=express()
const mongoose=require("mongoose")
const path=require("path")
const ejsMate=require("ejs-mate");
const flash=require("connect-flash");
const methodOverride=require("method-override")
const listing_routes=require("./routes/listing_routes.js")
const session=require("express-session")
const passport=require("passport")
const localstrategy=require("passport-local")
const user=require("./models/user.js");
const userrouter=require("./routes/user_routes.js")


app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"));
app.set("view engine","ejs")
app.engine("ejs",ejsMate )

const sessionOption = {
    secret:"mysupersecretstring",
    resave:false,
    saveUninitialized:true,
}

//mongodb connnection
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust")
}

main()
.then((res)=>{
    console.log("connection established")
})
.catch((e)=>{
    console.log("error",e)
})


const sessionoption = {
    secret:"mysupersecretstring",
    resave:false,
    saveUninitialized:true,
}
app.use(session(sessionoption)); 
// our root api
app.get("/",(req,res)=>{
    res.send("REQUEST ACCEPTED")
})

app.use(session(sessionOption)); 
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localstrategy(user.authenticate()))
passport.serializeUser(user.serializeUser())
passport.deserializeUser(user.deserializeUser());


app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error")
    res.locals.curruser=req.user;
    next();
});
app.use("/listing",listing_routes);
app.use("/",userrouter);
//server starting
app.listen(8080,()=>{
    console.log("SERVER LISTENING///")
})