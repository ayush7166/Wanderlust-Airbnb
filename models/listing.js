const mongoose = require("mongoose");
const Reviews=require("./reviewsSchema");
const User=require("./userschema.js");
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
            type:mongoose.Schema.ObjectId,
            ref:"Review",

        }
    ],
    owner:{
            type:mongoose.Schema.ObjectId,
            ref:"User",    
        }
});

listingSchema.post("findOneAndDelete",async (data)=>{
    if(data){
        await Reviews.deleteMany({_id: {$in:data.reviews}});
    }
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;