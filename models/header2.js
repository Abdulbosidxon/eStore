const {model, Schema} = require("mongoose");
 const header2 = new Schema({
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
    price:{
        type:String,
        required:true
    },
 });

module.exports = model("Header2" , header2);