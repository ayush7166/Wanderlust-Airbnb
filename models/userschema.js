const mongoose=require("mongoose");
const passportlocalmongoose=require("passport-local-mongoose");


const userschema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    }
});

userschema.plugin(passportlocalmongoose);


module.exports=new mongoose.model("User",userschema);
