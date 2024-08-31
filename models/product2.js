const {model , Schema} = require("mongoose");
const product2 = new Schema({
  image:{
    type:String,
    required:true
  }
});
module.exports = model("Product2" , product2);