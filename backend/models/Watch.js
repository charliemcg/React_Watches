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
