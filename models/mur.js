import mongoose from "mongoose";

let murSchema = mongoose.Schema({
  id: {
    type: Number,
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
  songSchema: {
    type: Schema.Types.ObjectId, ref: 'songSchema'
  }
})

let Mur = module.exports = mongoose.model('Mur', murSchema);

//Get All Murs
module.exports.getAllMurs = (callback, limit) => {
  Mur.find(callback);
}

//add a Murs
module.exports.addMur = (mur, callback) => {
  Mur.create(mur, callback);
}
