const { model, Schema } = require("mongoose");

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

const featureSchema = new Schema({
  title: { 
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  batafsil: [subSchema]
});

module.exports = model("Feature", featureSchema);
