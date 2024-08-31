const {model, Schema} = require("mongoose");
 const awesomeT = new Schema({
    title:{ 
        type:String,
        required:true
    },
 });

module.exports = model("AwesomeT" , awesomeT);
  