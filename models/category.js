const {model, Schema} = require("mongoose");
 const category = new Schema({
    title:{ 
        type:String,
        required:true
    },
    comment:{
        type:String,
        required:true
    },
    manzil:{
        type:String,
        required:true
    },
    ikonka:{
        type:String,
        required:true
    },
 });

module.exports = model("Category" , category);
  