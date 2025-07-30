const mongoose = require("mongoose");
const Review=require("./review.js")
// const User=require("./owner.js")
const Schema=mongoose.Schema;
const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
        default: "https://images.dog.ceo/breeds/shihtzu/n02086240_4255.jpg",
        set: (v)=>
            v===""
                ? "https://images.dog.ceo/breeds/shihtzu/n02086240_4255.jpg"
                : v,
    },
    price: {
        type: Number,
    },
    location: {
        type: String,
    },
    country: {
        type: String,
    },
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:  "Review",
        },
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:  "User",
    },
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
