if(process.env.NODE_ENV != "production"){
    require('dotenv').config()
}
const mongoose=require("mongoose")
const Listing=require("../models/listing.js")
const initdata=require("./data.js")
const dburl=process.env.ATLASDB_URL;

async function main() {
    await mongoose.connect(dburl)
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
   initdata.data=initdata.data.map((obj)=>({...obj,owner:"68ac4bcba98cf7daf81c1752"}))
   await Listing.insertMany(initdata.data)
   console.log("data was initialized")
}
initdb()
