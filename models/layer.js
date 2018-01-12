import mongoose from "mongoose";

const shareSchema = require('./share').schema;

let layerSchema = mongoose.Schema({
  id: {
    type: Number,
  },
  price: {
    type: Number,
    required: false
  },
  totalPrice: {
    type: Number,
    required: false
  },
  shares: {
    type: [shareSchema],
  },
  sharesAvailable: {
    type: Number,
  }
})

module.exports = mongoose.model('layerSchema', layerSchema);
