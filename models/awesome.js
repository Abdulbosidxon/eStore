const {model, Schema} = require("mongoose");
 const awesome = new Schema({
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

module.exports = model("Awesome" , awesome);
  