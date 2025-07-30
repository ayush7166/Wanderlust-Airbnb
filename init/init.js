const express=require("express")
const app=express()
const mongoose=require("mongoose")
const Listing=require("../models/listing.js")
const initdata=require("./data.js")
const path=require("path")
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine","ejs")

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust")
}

main()
.then((res)=>{
    console.log("connection established")
})
.catch((e)=>{
    console.log("error",e)
})

const  initdb = async ()=>{
   await Listing.deleteMany({})
   await Listing.insertMany(initdata.data)
   console.log("data was initialized")
}
initdb()