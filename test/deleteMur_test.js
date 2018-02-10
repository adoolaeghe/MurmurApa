//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Mur = require('../models/mur');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('/DELETE/:id mur', () => {
  it('it should DELETE a book given the id', (done) => {
    let mur = new Mur({
	    "songName": "songName",
      "artistName": "artistName",
      "photoUrl": "photoUrl",
      "songUrl": "songUrl",
      "shareIncrementor": 0,
      "priceIncrementor": 0,
      "initialNbOfShare": 0,
      "initialSharePrice": 0,
      "shareLimit": 0
    })
    mur.save((err, mur) => {
      chai.request(server)
      .delete('/mur/' + mur._id)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
    });
  });
});
