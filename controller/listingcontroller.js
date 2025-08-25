const Listing = require("../models/listing")
const ExpressError=require("../utils/ExpressError");
module.exports.rendereditform=async (req,res)=>{
    let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render("./listings/edit.ejs", { listing });
}
module.exports.updatelisting=async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id , {...req.body}); 
    req.flash("success","Listing edit successfully!!");
    res.redirect(`/listings/${id}`);
}
module.exports.destorylisting=async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","Listing deleted successfully!!");
    res.redirect(`/listings`);
}
module.exports.rendercreatelistingform=(req,res)=>{
    res.render("./listings/new.ejs")
}
module.exports.createlisting=async (req,res)=>{
    
    const newListing=new Listing(req.body);
    newListing.owner=req.user._id;
    await newListing.save(); 
    req.flash("success","Listing added successfull!!");
    res.redirect("/listings")
    
}
module.exports.renderlistinginfo=async (req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id).populate({
        path:"reviews",
        populate:{
            path:"author",
        },
    }).populate("owner");
    res.render("./listings/show.ejs",{listing});
}
module.exports.index=async (req,res)=>{

    if (req.query.query) {
      let searchText = req.query.query;   
      let allListings=await Listing.find({title: searchText,});
      if(allListings.length > 0){
        res.render("./listings/index.ejs", { allListings});
      }else{
        throw new ExpressError(404,"Result Not Found!!");
    
      }
    }else{
        const allListings= await Listing.find({});
        res.render("./listings/index.ejs",{allListings});
    }

}