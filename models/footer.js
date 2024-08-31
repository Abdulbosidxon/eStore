const {model , Schema} = require("mongoose");
const subSchema = new Schema({
    id: { 
      type: Number,
      required: true
    },
    text: {
      type: String,
      required: true
    },
  });
const footer = new Schema({
  title:{
    type:String,
    required:true
  },
batafsil: [subSchema]

});

module.exports = model("Footer" , footer);