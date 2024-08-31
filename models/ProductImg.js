const {model , Schema} = require("mongoose");
const productImg = new Schema({
  image:{
    type:String,
    required:true
  }
});
module.exports = model("ProductImg" , productImg);