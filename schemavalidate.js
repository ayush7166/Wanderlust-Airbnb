const { listingschema, reviewschema } = require("./listingschema.js");
const ExpressError = require("./utils/ExpressError");

const validatelistings=(req,res,next)=>{
    let {error} =listingschema.validate(req.body);
    if(error){
        let errmsg=error.details.map(el=>el.message).join(",")
        throw new ExpressError(404,errmsg);
    }else{
        next();
    }
}
const validatereviews=(req,res,next)=>{
    let {error} =reviewschema.validate(req.body);
    if(error){
        let errmsg=error.details.map(el=>el.message).join(",")
        throw new ExpressError(404,errmsg);
    }else{
        next();
    }
}
module.exports = { validatelistings, validatereviews };
