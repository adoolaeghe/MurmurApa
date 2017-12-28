var assert = require("assert");
var chai = require("chai");
var expect = chai.expect;
var Share = require("../models/share");
describe("Share", function() {
  describe("Initial State", function() {
    it("initialise with a given price", function() {
      var share = new Share(1);
      expect(share.price).to.equal(1);
    });

    it("initialise with owned state of false", function() {
      var share = new Share(1);
      expect(share.owned).to.be.false;
    });
  });
  describe("buy", function() {
    it("changes the state of owned from false to true", function() {
      var share = new Share(1);
      share.buy();
      expect(share.owned).to.be.true;
    });
  });
});
