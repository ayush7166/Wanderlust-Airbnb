const express=require("express")
const app=express()
const routes=express.Router()
const Listing=require("../models/listing.js")
const path=require("path")
const Review = require("../models/review.js");


app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended:true}))
// app.use(methodOverride("_method"));
app.set("view engine","ejs")
// app.engine("ejs",ejsMate )



 // our api for listing 
routes.get("/",async (req,res)=>{
    let allListing =await Listing.find();
    res.render("listing.ejs",{allListing});
})

// our api for creating new listing

routes.get("/new",(req,res)=>{
    if(!req.isAuthenticated()){
        req.flash("success","you need to login first")   
        res.redirect("/login") 
    }
    else
        res.render("new.ejs")
})
routes.post("/", async (req, res) => {
    let { title, description,image, price, location, country } = req.body;
    let newListing = new Listing({
        title,
        description,
        image,
        price,
        location,
        country
    });
    await newListing.save(); // Save to MongoDB
    req.flash("success","New Listing created!")
    res.redirect("/listing");
});

//  our api for edit listing
routes.get("/:id/edit",async (req,res)=>{
    let {id}=req.params;
    let listing =await Listing.findById(id)
    res.render("edit.ejs",{listing})
})
routes.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { title, description, image, price, location, country } = req.body;

    try {
        const replacement = {
            title,
            description,
            image,
            price,
            location,
            country
        };

        await Listing.findOneAndReplace({ _id: id }, replacement);
        req.flash("success","New Listing created!")
        res.redirect(`/listing/${id}`);
    } catch (err) {
        console.error("Replace failed", err);
        res.status(500).send("Failed to replace listing");
    }
});

routes.get("/:id",async (req,res)=>{
    let {id}=req.params;
    let listing =await Listing.findById(id).populate("reviews")
    res.render("show.ejs",{listing})
})

//  api for deletion of listing
routes.delete("/:id" ,async (req,res)=>{
    let {id}=req.params
    await Listing.findByIdAndDelete(id)
    req.flash("success","Listing Deleted!")
    res.redirect("/listing")
})
routes.post("/:id/reviews",async (req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findById(req.params.id);
    let newreview=new Review(req.body.review);
    console.log(newreview);

    listing.reviews.push(newreview);
    await newreview.save();
    await listing.save();
    req.flash("success","New Review created!")
    res.redirect(`/listing/${id}`)
})
routes.post("/:id/reviews/:reviewid",async (req,res)=>{
    let {id,reviewid}=req.params;
    await Listing.findByIdAndUpdate(id , { $pull : {reviews : reviewid}})
    await Review.findById(reviewid);
    req.flash("success","Review Deleted!")
    res.redirect(`/listing/${id}`)
})


module.exports=routes