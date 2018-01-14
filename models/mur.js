import mongoose from "mongoose";
import {initializeTrackSchema,
        initializeDefaultSchema,
        initializeTrackSchemaLayer,
        addInitialSharetoLayer,
        addSharetoLayer,
        switchShareProperty,
        createNewLayer} from "../helpers/murSchema";

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
  let trackSchema = murInstance.trackSchema;
  initializeTrackSchema(trackSchema, murInstance)
  for (var x = 0; x < murInstance.initialNbOfShare; x++) {
    addInitialSharetoLayer(trackSchema, murInstance, Share)
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
    let newTrackLayers = {};

    for (var i = 0; i < lastTrackLayerSharesNb; i++) {
      if(!lastTrackLayers.shares[i].owned) {
        switchShareProperty(lastTrackLayers, i);
        if(lastTrackLayers.sharesAvailable === 0) {
          createNewLayer(trackLayers, newTrackLayers, trackSchema, Layer);
          newTrackLayers = trackLayers[(trackLayers.length)-1];
          newTrackLayers.sharesAvailable = (trackLayers[(trackLayers.length)-2].shares.length) * trackSchema.shareIncrementor;
          for (var x = 0; x < newTrackLayers.sharesAvailable; x++) {
            addSharetoLayer(trackLayers, newTrackLayers, trackSchema, Share);
          }
        }
        break;
      }
    }

    mur.save();
    var response = {
        message: "You successfully bought a new share !",
        layers: trackSchema
    };
    res.status(200).send(response);
  });
}
