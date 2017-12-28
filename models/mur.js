import mongoose from "mongoose";

let murSchema = mongoose.Schema({
  id: {
    type: Number,
  },
  songName: {
    type: String,
  },
  artistName: {
    type: String,
  },
  photoUrl: {
    type: String,
  },
  songUrl: {
    type: String,
  },
  songSchema: {
    type: Object
  }
})

let Mur = module.exports = mongoose.model('Mur', murSchema);

//Get Murs
module.exports.getMurs = (callback, limit) => {
   console.log('hello')
}
