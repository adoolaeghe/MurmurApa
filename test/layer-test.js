var assert = require("assert");
var chai = require("chai");
var expect = chai.expect;
var Layer = require("../models/layer");

describe("Layer", function() {
  it("initialise with a given price", function() {
    var layer = new Layer(4, 1);
    expect(layer.shares.length).to.equal(4);
  });
  it("it can an available share", function() {
    var layer = new Layer(4, 1);
    layer.buyShare();
    expect(layer.sharesAvailable).to.equal(3);
  });
});
