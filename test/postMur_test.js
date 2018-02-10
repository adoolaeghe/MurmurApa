//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Mur = require('../models/mur');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

const mur = {
  "songName": "songName",
  "artistName": "artistName",
  "photoUrl": "photoUrl",
  "songUrl": "songUrl",
  "shareIncrementor": 0,
  "priceIncrementor": 0,
  "initialNbOfShare": 0,
  "initialSharePrice": 0,
  "shareLimit": 0
}

chai.use(chaiHttp);

describe('Post a mur', () => {
  it('it should be able to post a mur', (done) => {
    chai.request(server)
    .post('/mur')
    .send(mur)
    .end((err, res) => {
      res.should.have.status(200);
      done();
    });
  });
});

/// TEST POSTING MULTIPLE TIME
/// TEST USER OWNED SHARE
/// TEST
