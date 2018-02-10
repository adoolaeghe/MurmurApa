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
const userSchema = require('./user').schema;

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
let User = mongoose.model('User', userSchema);

//GET ALL THE MUR//
module.exports.getAllMurs = (callback) => {
  Mur.find(callback);
}

//ADD A MUR//
module.exports.addMur = (mur, callback) => {
  let murInstance = new Mur(mur);
  let trackSchema = murInstance.trackSchema;
  trackSchema.layers[0].price = mur.initialSharePrice;
  initializeTrackSchema(trackSchema, murInstance)
  for (var x = 0; x < murInstance.initialNbOfShare; x++) {
    addInitialSharetoLayer(trackSchema, murInstance, Share)
  }
  murInstance.save(mur, callback)
}

//UPDATE A MUR//
module.exports.updateMur = (id, body, res, callback) => {
  Mur.findById(id, body, function (err, mur) {
    if(!mur) {
      res.status(404).send("no mur with this id")
    }
    mur.songName = body.songName;
    mur.save();
    res.json(mur);
  });
}

//GET A SPECIFIC MUR//
module.exports.getMur = (id, res, callback) => {
  Mur.findById(id, function (err, mur) {
    if(err) {
      throw err;
    }
    res.json(mur)
  });
}

//DELETE A SPECIFIC MUR//
module.exports.deleteMur = (id, res, callback) => {
  Mur.findByIdAndRemove(id, function (err, mur) {
    if(!mur) {
      res.status(404).send("no mur with this id")
    }
    var response = {
        message: "Mur successfully deleted",
    };
    res.status(200).send(response);
  });
}

//BUY SHARE OF A MUR//
module.exports.buyShare = (id, res, req, callback) => {
  let sessionUser = req.session.user;
  const sessionUserId = req.session.passport.user;

  Mur.findById(id, function(err, mur) {
    if(!mur) {
      res.status(404).send("no mur with this id");
    }

    /// EXTRACT THIS INTO A CLASSSS
    let trackSchema = mur.trackSchema;
    let trackLayers = trackSchema.layers;
    let lastTrackLayers = trackLayers[(trackLayers.length)-1];
    let lastTrackLayerSharesNb = lastTrackLayers.shares.length;
    let shareId = "";
    let sharePrice = null
    let newTrackLayers = {};

    for (var i = 0; i < lastTrackLayerSharesNb; i++) {
      if(!lastTrackLayers.shares[i].owned) {
        if(sessionUser.rumBalance < lastTrackLayers.shares[i].price) {
          res.send("unsufficient Rum Balance");
          return
        }
        switchShareProperty(lastTrackLayers, i, sessionUserId);
        shareId = lastTrackLayers.shares[i]._id;
        sharePrice = lastTrackLayers.price;
        trackSchema.totalValue += sharePrice;
        trackSchema.totalNbBoughtShare += 1;
        trackSchema.crtShareValue = (trackSchema.totalValue / trackSchema.totalNbBoughtShare)
        if(lastTrackLayers.sharesAvailable === 0) {
          createNewLayer(trackLayers, newTrackLayers, trackSchema, Layer, mur);
          newTrackLayers = trackLayers[(trackLayers.length)-1];
          newTrackLayers.sharesAvailable = (trackLayers[(trackLayers.length)-2].shares.length) * mur.shareIncrementor;
          newTrackLayers.price = (trackLayers[(trackLayers.length)-2].price) * mur.priceIncrementor;
          for (var x = 0; x < newTrackLayers.sharesAvailable; x++) {
            addSharetoLayer(trackLayers, newTrackLayers, trackSchema, Share, mur);
          }
        }
        break;
      }
    }
    mur.save(function(err) {
      if (err) {
        if (err.name === 'MongoError' && err.code === 11000) {
          // Duplicate username
          return res.status(500).send({ succes: false, message: 'User already exist!' });
        }
        // Some other error
        return res.status(500).send(err);
      }
      req.session.share = shareId;
      req.session.sharePrice = sharePrice;
      res.redirect('/user/' + sessionUserId + '/storeShare');
    });
  });
}
