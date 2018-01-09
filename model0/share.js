function Share(price) {
  this.price = price;
  this.owned = false;
}

Share.prototype.buy = function() {
  this.owned = true;
};

module.exports = Share;
