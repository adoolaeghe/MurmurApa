import assert from "assert";
import mongoose from "mongoose";

const Mur = require('../models/share').schema;

describe("mur", function() {
  it("can create a new mur", function(done) {
    var newMur = {
      "songName": "songName",
      "artistName": "artistName",
      "photoUrl": "photoUrl",
      "songUrl": "songUrl",
      "shareIncrementor": "0",
      "priceIncrementor": "0",
      "initialNbOfShare": "0",
      "initialSharePrice": "0"
    }
    newMur.addMur(newMur)
  });
});
