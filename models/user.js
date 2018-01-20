// This is the API model for users.
import mongoose from "mongoose";
import bcrypt from "bcrypt";

var passportLocalMongoose = require('passport-local-mongoose');

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
    type: String,
    required: false
  },
})

userSchema.plugin(passportLocalMongoose);

let User = module.exports = mongoose.model('userSchema', userSchema);
