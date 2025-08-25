const Listing=require("./models/listing");
const asyncwrap = require("./utils/wrapasync");
const Review=require("./models/reviewsSchema")
module.exports.isloggedin=(req,res,next)=>{
     if(!req.isAuthenticated()){
        req.flash("success","you need to login first");
        return res.redirect("/user/login");
    }
    next();
}; 

module.exports.saveredirecturl=(req,res,next)=>{
    if(!req.session.redirecturl){
        req.locals.redirecturl=req.sessions.redirecturl
    }
    next();
};


module.exports.isowner=asyncwrap(async (req,res,next) => {
        let {id}=req.params;
        let listing=await Listing.findById(id);
        if(!listing.owner.equals(res.locals.curruser._id)){
            req.flash("error","You are not the owner of This Listing !! !!");
            return res.redirect(`/listings/${id}`);
        }

    next();
})
    

module.exports.isAuthor=asyncwrap(async (req,res,next) => {
        let {id,reviewid}=req.params;
        let review=await Review.findById(reviewid);
        if(!review.author.equals(res.locals.curruser._id)){
            req.flash("error","You are not the owner of this Review !!");
            return res.redirect(`/listings/${id}`);
        }
    next();
})
    
