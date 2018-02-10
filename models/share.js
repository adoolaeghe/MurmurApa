import mongoose from "mongoose";

let shareSchema = mongoose.Schema({
  id: {
    type: Number,
  },
  price: {
    type: Number,
    required: false
  },
  owned: {
    type: Boolean,
    required: false
  },
  owner: {
    type: String,
    required: false
  },
  timeStamp: {
    type: Date,
    required: false
  }
})

module.exports = mongoose.model('Share', shareSchema);
