export function initializeTrackSchema(trackSchema, murInstance) {
  initializeDefaultTrackSchema(trackSchema, murInstance);
  initializeTrackSchemaLayer(trackSchema, murInstance);
}

export function initializeDefaultTrackSchema(trackSchema, murInstance) {
  trackSchema.totalNbShares = murInstance.initialNbOfShare;
  trackSchema.crtSharePrice = murInstance.initialSharePrice;
  trackSchema.layers.price = murInstance.initialSharePrice;
  trackSchema.totalValue = 0;
  trackSchema.totalNbBoughtShare = 0;
}

export function initializeTrackSchemaLayer(trackSchema, murInstance) {
  // trackSchema.layers[0].totalPrice = (murInstance.initialSharePrice * murInstance.initialNbOfShare);
  trackSchema.layers[0].sharesAvailable = murInstance.initialNbOfShare;
}

export function addInitialSharetoLayer(trackSchema, murInstance, Share) {
  let initialShareInstance = new Share();
  initialShareInstance.price = murInstance.initialSharePrice;
  initialShareInstance.owned = "false";
  trackSchema.layers[0].shares.push(initialShareInstance);
}

export function addSharetoLayer(trackLayers, newTrackLayers, trackSchema, Share, mur) {
  let shareInstance = new Share();
  shareInstance.price = mur.initialSharePrice * mur.shareIncrementor;
  shareInstance.owned = "false";
  newTrackLayers.shares.push(shareInstance);
}

export function switchShareProperty(lastTrackLayers, i, sessionUser) {
  lastTrackLayers.shares[i].owned = true;
  lastTrackLayers.shares[i].owner = sessionUser;
  lastTrackLayers.shares[i].buyingTime = Date.now();
  lastTrackLayers.sharesAvailable -= 1;
}

export function createNewLayer(trackLayers, newTrackLayers, trackSchema, Layer, mur) {
  trackLayers.push(new Layer());
  trackLayers[(trackLayers.length)-2].sharesAvailable = (trackLayers[(trackLayers.length)-2].shares.length) * mur.shareIncrementor;
}
