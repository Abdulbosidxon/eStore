const {model , Schema} = require("mongoose");
const subSchema = new Schema({
    id: { 
      type: Number,
      required: true
    },
    image2: {
      type: String,
      required: true
    },
  });
const product = new Schema({
    
  name:{
    type:String,
    required:true
  },
  title:{
    type:String,
    required:true
  },
  image:{
    type:String,
    required:true
  },
batafsil: [subSchema]

});

module.exports = model("Product" , product);