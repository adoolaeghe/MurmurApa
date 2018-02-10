import mongoose from "mongoose";

const layerSchema = require('./layer').schema;

let trackSchema = mongoose.Schema({
  id: {
    type: Number,
  },
  totalNbShares: {
    type: Number,
    required: false
  },
  maxNbShares: {
    type: Number,
    required: false
  },
  crtSharePrice: {
    type: Number,
    required: false
  },
  crtShareValue: {
    type: Number,
    default: 0
  },
  totalValue: {
    type: Number,
    required: false
  },
  totalNbBoughtShare: {
    type: Number,
    required: false
  },
  crtRiskPrice: {
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
