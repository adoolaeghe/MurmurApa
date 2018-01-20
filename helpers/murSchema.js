export function initializeTrackSchema(trackSchema, murInstance) {
  initializeDefaultTrackSchema(trackSchema, murInstance);
  initializeTrackSchemaLayer(trackSchema, murInstance);
}

export function initializeDefaultTrackSchema(trackSchema, murInstance) {
  trackSchema.crtNbShares = murInstance.initialNbOfShare;
  trackSchema.shareIncrementor = murInstance.shareIncrementor;
  trackSchema.priceIncrementor = murInstance.priceIncrementor;
  trackSchema.crtSharePrice = murInstance.initialSharePrice;
  trackSchema.layers.price = murInstance.initialSharePrice;
}

export function initializeTrackSchemaLayer(trackSchema, murInstance) {
  trackSchema.layers[0].totalPrice = (murInstance.initialSharePrice * murInstance.initialNbOfShare);
  trackSchema.layers[0].sharesAvailable = murInstance.initialNbOfShare;
}

export function addInitialSharetoLayer(trackSchema, murInstance, Share) {
  let initialShareInstance = new Share();
  initialShareInstance.price = murInstance.initialSharePrice;
  initialShareInstance.owned = "false";
  trackSchema.layers[0].shares.push(initialShareInstance);
}

export function addSharetoLayer(trackLayers, newTrackLayers, trackSchema, Share) {
  let shareInstance = new Share();
  shareInstance.price = trackSchema.initialSharePrice * trackSchema.shareIncrementor;
  shareInstance.owned = "false";
  newTrackLayers.shares.push(shareInstance);
}

export function switchShareProperty(lastTrackLayers, i, sessionUser) {
  lastTrackLayers.shares[i].owned = true;
  lastTrackLayers.shares[i].owner = sessionUser;
  lastTrackLayers.sharesAvailable -= 1;

}

export function createNewLayer(trackLayers, newTrackLayers, trackSchema, Layer) {
  trackLayers.push(new Layer());
  trackLayers[(trackLayers.length)-2].sharesAvailable = (trackLayers[(trackLayers.length)-2].shares.length) * trackSchema.shareIncrementor;
}
