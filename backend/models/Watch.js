const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const WatchSchema = new Schema({
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  housing: {
    type: String,
    required: false,
  },
  bracelet: {
    type: String,
    required: false,
  },
  dial: {
    type: String,
    required: false,
  },
  diameter: {
    type: String,
    required: false,
  },
  movement: {
    type: String,
    required: false,
  },
  complications: {
    type: Array,
    required: false,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  inStock: {
    type: Boolean,
    required: true,
  },
  //image willl be stored in base64
  image: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = Watch = mongoose.model("watches", WatchSchema);
