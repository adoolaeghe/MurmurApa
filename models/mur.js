import mongoose from "mongoose";

const trackSchema = require('./songSchema').schema;
const shareSchema = require('./share').schema;

console.log(shareSchema);

let Schema = mongoose.Schema;

let murSchema = mongoose.Schema({
  id: {
    type: Number,
  },
  initialNbOfShare: {
    type: Number,
    required: true
  },
  initialSharePrice: {
    type: Number,
    required: true
  },
  priceIncrementor: {
    type: Number,
    required: true
  },
  shareIncrementor: {
    type: Number,
    required: true
  },
  songName: {
    type: String,
    required: true
  },
  artistName: {
    type: String,
    required: true
  },
  photoUrl: {
    type: String,
    required: true
  },
  songUrl: {
    type: String,
    required: true
  },
  trackSchema: {
    type: trackSchema,
    default: {
      crtRiskPrice: 0
    }
  }
})
let Mur = module.exports = mongoose.model('Mur', murSchema);
let Share = mongoose.model('Share', shareSchema);
//Get All Murs
module.exports.getAllMurs = (callback) => {
  Mur.find(callback);
}

//add a Mur
module.exports.addMur = (mur, callback) => {
  let murInstance = new Mur(mur);
  let trackSchema = murInstance.trackSchema
  trackSchema.crtNbShares = murInstance.initialNbOfShare;
  trackSchema.shareIncrementor = murInstance.shareIncrementor;
  trackSchema.priceIncrementor = murInstance.priceIncrementor;
  trackSchema.crtSharePrice = murInstance.initialSharePrice;
  /// YOU nee to calculate the nextLayerSharePrice
  trackSchema.layers.price = murInstance.initialSharePrice;
  for (var x = 0; x < murInstance.initialNbOfShare; x++) {
    let shareInstance = new Share();
    shareInstance.price = murInstance.initialSharePrice;
    shareInstance.owned = "false";
    trackSchema.layers.shares.push(shareInstance)
  }
  trackSchema.layers.totalPrice = (murInstance.initialSharePrice * murInstance.initialNbOfShare);
  murInstance.save(mur, callback)
}

//add a Mur
module.exports.addSongSchemaToMur = (callback) => {
  SongSchema.create(callback);
}

//update a Mur
module.exports.updateMur = (mur, callback) => {
  // update a mure here
}

//get a specific Mur
module.exports.getMur = (mur, callback) => {
  // get a specific mur here
}

//delete a specific Mur
module.exports.deleteMur = (mur, callback) => {
  // delete a specific mur here
}
