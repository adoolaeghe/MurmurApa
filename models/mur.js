import mongoose from "mongoose";

const trackSchema = require('./songSchema').schema;
const shareSchema = require('./share').schema;

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
  initializeTrackSchema(trackSchema, murInstance)
  for (var x = 0; x < murInstance.initialNbOfShare; x++) {
    let shareInstance = new Share();
    shareInstance.price = murInstance.initialSharePrice;
    shareInstance.owned = "false";
    trackSchema.layers.shares.push(shareInstance)
  }
  murInstance.save(mur, callback)
}

//update a Mur
module.exports.updateMur = (mur, callback) => {
}

//get a specific Mur
module.exports.getMur = (id, res, callback) => {
  Mur.findById(id, function (err, mur) {
    if(!mur) {
      res.send("no mur with this id")
    }
    res.json(mur)
  });
}

//delete a specific Mur
module.exports.deleteMur = (id, res, callback) => {
  Mur.findByIdAndRemove(id, function (err, mur) {
    if(!mur) {
      res.send("no mur with this id")
    }
    var response = {
        message: "Todo successfully deleted",
    };
    res.status(200).send(response);
  });
}

let initializeTrackSchema = (trackSchema, murInstance) => {
  trackSchema.crtNbShares = murInstance.initialNbOfShare;
  trackSchema.shareIncrementor = murInstance.shareIncrementor;
  trackSchema.priceIncrementor = murInstance.priceIncrementor;
  trackSchema.crtSharePrice = murInstance.initialSharePrice;
  trackSchema.layers.price = murInstance.initialSharePrice;
  trackSchema.layers.totalPrice = (murInstance.initialSharePrice * murInstance.initialNbOfShare);
}
