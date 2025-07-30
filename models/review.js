const express=require("express")
const mongoose=require("mongoose")

const reviewschema=mongoose.Schema({
    title :{
        type:String
    },
    rating:{
        type:Number,
        min:1,
        max:5
    },
    createdat:{
        type: Date,
        default:Date.now()
    }
})

const Reviews=mongoose.model("Review",reviewschema);
module.exports=Reviews;