const express=require("express")
const router =express.Router({mergeParams:true})
const { validatelistings  } = require("../schemavalidate.js");
const asyncwrap = require("../utils/wrapasync.js");
const {isloggedin,isowner}=require("../middleware.js")
const listingcontroller=require("../controller/listingcontroller.js");

    
router.get("/:id/edit",isloggedin,isowner, asyncwrap(listingcontroller.rendereditform));
router.get("/new",isloggedin,listingcontroller.rendercreatelistingform);

router
    .route("/")
    .get(asyncwrap(listingcontroller.index))
    .post( isloggedin , validatelistings,asyncwrap(listingcontroller.createlisting))
router
    .route("/:id")
    .delete(isloggedin,isowner, asyncwrap(listingcontroller.destorylisting))
    .get(asyncwrap(listingcontroller.renderlistinginfo))
    .put(isloggedin,isowner,  validatelistings  , asyncwrap(listingcontroller.updatelisting));



module.exports=router;
