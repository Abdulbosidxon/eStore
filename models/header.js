const {model, Schema} = require("mongoose");
 const header = new Schema({
    title:{ 
        type:String,
        required:true
    },
    comment:{
        type:String,
        required:true
    },
    headerImg:{
        type:String,
        required:true
    },
 });

module.exports = model("Header" , header);