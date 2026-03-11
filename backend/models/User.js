const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
 name:String,
 email:String,
 password:String,
 role:{type:String,default:"user"},
 isVerified:{type:Boolean,default:true},
 refreshToken:String
});

module.exports = mongoose.model("User",userSchema);