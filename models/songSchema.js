import mongoose from "mongoose";

const layerSchema = require('./layer').schema;

let trackSchema = mongoose.Schema({
  id: {
    type: Number,
  },
  priceIncrementor: {
    type: Number,
    required: false
  },
  shareIncrementor: {
    type: Number,
    required: false
  },
  initialSharePrice: {
    type: Number,
    required: false
  },
  crtNbShares: {
    type: Number,
    required: false
  },
  crtSharePrice: {
    type: Number,
    required: false
  },
  crtRiskPrice: {
    type: Number,
    required: false
  },
  avgPrice: {
    type: Number,
    required: false
  },
  avgPriceNxtLyr: {
    type: Number,
    required: false
  },
  layers: {
    type: [layerSchema],
    default: {
      price: 0,
    }
  }
})

module.exports = mongoose.model('trackSchema', trackSchema);
