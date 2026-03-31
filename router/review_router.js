const express = require("express")
const router =express.Router({mergeParams:true})
const { validatereviews } = require("../schemavalidate.js");
const asyncwrap = require("../utils/wrapasync.js");
const { isloggedin ,isowner, isAuthor} = require("../middleware.js");
const reviewcontroller=require("../controller/reviewcontroller.js")

router.post("/reviews",isloggedin,validatereviews, asyncwrap(reviewcontroller.createreview));
router.post("/reviews/:reviewid",isloggedin,isAuthor,asyncwrap(reviewcontroller.destroyreview));

module.exports=router;
