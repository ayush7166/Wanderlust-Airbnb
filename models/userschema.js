const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

// fix for both local + render
const plugin = passportLocalMongoose.default || passportLocalMongoose;

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});

// apply plugin
userSchema.plugin(plugin);

module.exports = mongoose.model("User", userSchema);