const mongoose=require("mongoose");
<<<<<<< HEAD
const passportlocalmongoose=require("passport-local-mongoose").default;
=======
const passportlocalmongoose=require("passport-local-mongoose");
>>>>>>> 4ee5ea57237774efbc251b794e72f99ae6f12045


const userschema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    }
});

userschema.plugin(passportlocalmongoose);


module.exports=new mongoose.model("User",userschema);
