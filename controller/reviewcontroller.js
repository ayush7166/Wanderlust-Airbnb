const Listing = require("../models/listing")
const Reviews=require("../models/reviewsSchema");


module.exports.createreview=async (req,res)=>{
    let listing=await Listing.findById(req.params.id)
    let newreview=new Reviews(req.body.review);
    newreview.author = req.user._id;
    await listing.reviews.push(newreview);
    await newreview.save();
    await listing.save();
    req.flash("success","Review created successfully!!");
   res.redirect(`/listings/${req.params.id}`);
}

module.exports.destroyreview=async (req,res)=>{
    let {id,reviewid}=req.params;
    await Reviews.findByIdAndDelete(reviewid);
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewid}});
    req.flash("success","Review deleted  successfully!!");
    res.redirect(`/listings/${id}`);
}