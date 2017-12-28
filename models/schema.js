var Layer = require("./layer.js");

function Schema(price, incrementRate, multiplier, initialShares) {
  this.currentPrice = price;
  this.incrementRate = incrementRate;
  this.multiplier = multiplier;
  this.layers = [new Layer(initialShares, 1)];
}

Schema.prototype.buy = function() {
  this.layers[this.layers.length - 1].buyShare();
  if (this.layers[this.layers.length - 1].checkLayerFull()) {
    var newNumberOfShares = this.calculateShareNumber();
    this.currentPrice = this.layers.length + this.incrementRate;
    this.layers.push(new Layer(newNumberOfShares, this.currentPrice));
  }
};

Schema.prototype.calculateShareNumber = function() {
  return this.layers[this.layers.length - 1].shares.length * this.multiplier;
};

module.exports = Schema;
