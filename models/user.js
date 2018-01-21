// This is the API model for users.
import mongoose from "mongoose";
import bcrypt from "bcrypt";

var passportLocalMongoose = require('passport-local-mongoose');
const murSchema = require('./mur').schema;

let userSchema = mongoose.Schema({
  id: {
    type: Number,
  },
  username: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  rumBalance: {
    type: String,
    required: false
  },
  ownedShare: {
    type: Array,
    required: false
  },
})

userSchema.plugin(passportLocalMongoose);
let User = module.exports = mongoose.model('userSchema', userSchema);

module.exports.storeShare = (id, shareId, res, req, callback) => {
  User.findById(id, function(err, user) {
    user.ownedShare.push(shareId);
    user.save();
  });
  res.status(200).send('you have bought a new share !!')
};
