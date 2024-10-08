const {model, Schema} = require("mongoose");
 const about = new Schema({
    title:{ 
        type:String,
        required:true
    },
    comment:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
 });

module.exports = model("About" , about);