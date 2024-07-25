const mongoose = require("mongoose");
const plm = require("passport-local-mongoose")
const userSchema = mongoose.Schema({
   fullname:String,
   username:String,
   email:String,
   password:String,
   blogs:[{ type:mongoose.Schema.Types.ObjectId, ref:"blog"},],
   profile:{
      type:String,
      
      default: "https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113_1280.png"
   }
});

userSchema.plugin(plm);
module.exports = mongoose.model("user",userSchema);