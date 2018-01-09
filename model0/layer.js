var Share = require("./share.js");

function Layer(shares, price) {
  this.shares = [];
  this.price = price;
  this.sharesAvailable = shares;
  for (i = 0; i < shares; i++) {
    this.generateShare(price);
  }
}

Layer.prototype.generateShare = function() {
  share = new Share(this.price);
  this.shares.push(share);
};

Layer.prototype.buyShare = function() {
  this.shares[this.sharesAvailable - 1].buy();
  this.sharesAvailable -= 1;
};

Layer.prototype.checkLayerFull = function() {
  if (this.sharesAvailable === 0) {
    return true;
  } else {
    return false;
  }
};

module.exports = Layer;
