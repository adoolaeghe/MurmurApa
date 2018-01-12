import mongoose from "mongoose";

const trackSchema = require('./songSchema').schema;
const shareSchema = require('./share').schema;
const layerSchema = require('./layer').schema;

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
let Layer = mongoose.model('Layer', layerSchema);
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
    addInitialSharetoLayer(trackSchema, murInstance)
  }
  murInstance.save(mur, callback)
}

//update a Mur
module.exports.updateMur = (id, body, res, callback) => {
  Mur.findById(id, body, function (err, mur) {
    if(!mur) {
      res.send("no mur with this id")
    }
    mur.songName = body.songName;
    mur.save();
    res.json(mur);
  });
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

//delete a specific Mur
module.exports.buyShare = (id, res, callback) => {
  Mur.findById(id,function (err, mur) {
    if(!mur) {
      res.send("no mur with this id")
    }

    let trackSchema = mur.trackSchema
    let trackLayers = trackSchema.layers;
    let lastTrackLayers = trackLayers[(trackLayers.length)-1];
    let lastTrackLayerSharesNb = lastTrackLayers.shares.length;

    for (var i = 0; i < lastTrackLayerSharesNb; i++) {
      if(!lastTrackLayers.shares[i].owned){
        switchShareProperty(lastTrackLayers, i)
        if(lastTrackLayers.sharesAvailable === 0) {
          createNewLayer(trackLayers, lastTrackLayers, trackSchema);
          for (var x = 0; x < lastTrackLayers.sharesAvailable; x++) {
            addSharetoLayer(trackLayers, lastTrackLayers, trackSchema);
          }
        }
        break;
      }
    }
    mur.save();
    var response = {
        message: "Congratulation ! You successfully bought a new share !",
        shares: lastTrackLayers
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
  trackSchema.layers[0].totalPrice = (murInstance.initialSharePrice * murInstance.initialNbOfShare);
  trackSchema.layers[0].sharesAvailable = murInstance.initialNbOfShare;
}

let addInitialSharetoLayer = (trackSchema, murInstance) => {
  let initialShareInstance = new Share();
  initialShareInstance.price = murInstance.initialSharePrice;
  initialShareInstance.owned = "false";
  trackSchema.layers[0].shares.push(initialShareInstance);
}

let addSharetoLayer = (trackLayers, lastTrackLayers, trackSchema) => {
  let shareInstance = new Share();
  shareInstance.price = trackSchema.initialSharePrice * trackSchema.shareIncrementor;
  shareInstance.owned = "false";
  lastTrackLayers.shares.push(shareInstance);
}

let switchShareProperty = (lastTrackLayers, i) => {
  lastTrackLayers.shares[i].owned = true;
  lastTrackLayers.sharesAvailable -= 1;
}

let createNewLayer = (trackLayers, lastTrackLayers, trackSchema) => {
  trackLayers.push(new Layer());
  lastTrackLayers.sharesAvailable = (trackLayers[(trackLayers.length)-2].shares.length) * trackSchema.shareIncrementor;
}
