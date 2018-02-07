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
module.exports.getMurs = async (ctx) => {
  const murs = await Mur.find({})
  if (!murs) {
    throw new Error("There was an error retrieving your Murs.")
  } else {
    ctx.body = murs
  }
}

//ADD A MUR//
module.exports.addMur = async (mur, ctx) => {
  let murInstance = new Mur(mur);
  let trackSchema = murInstance.trackSchema;
  initializeTrackSchema(trackSchema, murInstance)
  for (var x = 0; x < murInstance.initialNbOfShare; x++) {
    addInitialSharetoLayer(trackSchema, murInstance, Share)
  }
  await murInstance.save(mur)
  ctx.body = murInstance
}

//UPDATE A MUR//
module.exports.updateMur = async (id, body, ctx) => {
  const mur = await Mur.findById(id, body)
  mur.songName = body.songName;
  mur.save();
  ctx.body = mur;
}

//GET A SPECIFIC MUR//
module.exports.getMur = async (id, ctx) => {
  const mur = await Mur.findById(id)
  if(!mur) {
    throw new Error("There was an error retrieving this mur.")
  }
  ctx.body = mur;
}

//DELETE A SPECIFIC MUR//
module.exports.deleteMur = async (id, ctx) => {
  const mur = await Mur.findByIdAndRemove(id)
  if(!mur) {
    throw new Error("There was an error finding this mur")
  }
  ctx.body = mur;
}

//BUY SHARE OF A MUR//
module.exports.buyShare = (id, res, req, callback) => {
  let sessionUser = req.session.user;
  const sessionUserId = req.session.passport.user;

  Mur.findById(id, function(err, mur) {
    if(!mur) {
      res.send("no mur with this id");
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
          res.send("unsufficient Rum Balance ");
          return
        }
        switchShareProperty(lastTrackLayers, i, sessionUserId);
        shareId = lastTrackLayers.shares[i]._id;
        sharePrice = lastTrackLayers.shares[i].price;
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
    req.session.share = shareId;
    req.session.sharePrice = sharePrice;
    var response = {
        message: "You successfully bought a new share !",
        share: lastTrackLayerSharesNb
    };
    res.redirect('/user/' + sessionUserId + '/storeShare');
  });
}

//BUY SHARE OF A MUR//
module.exports.sellShare = (id, res, req, callback) => {

}
