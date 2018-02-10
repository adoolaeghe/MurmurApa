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

describe('Murs', () => {
  describe('Get all the mur', () => {
    it('it should GET all with a correct response code', (done) => {
      chai.request(server)
      .get('/mur/all')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
    });
  });
});
