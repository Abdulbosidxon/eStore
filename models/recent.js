const { model, Schema } = require("mongoose");

const sub2Schema = new Schema({
  id: { 
    type: Number,
    required: true
  },
  image2: {
    type: String,
    required: true
  },
});

const recentSchema = new Schema({
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
  description: {
    type: String,
    required: true
  },
  like: {
    type: String,
    required: true
  },
  btnName: {
    type: String,
    required: true
  },
  batafsil: [sub2Schema]
});

module.exports = model("Recent", recentSchema);
