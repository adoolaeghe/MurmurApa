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
  describe('Home route', () => {
    it('it should GET all the murs', (done) => {
      chai.request(server)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
    });
  });

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

  describe('Update a mur', () => {
    it('it should be able to post a mur', (done) => {
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
        .get('/mur/' + mur.id)
        .send(mur)
        .end((err, res) => {
            console.log(res.body)
            res.should.have.status(200);
            res.body.should.be.a('object');
          done();
        });
      });
    });
  });

  describe('/DELETE/:id book', () => {
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
            .delete('/mur/' + mur.id)
            .end((err, res) => {
              res.should.have.status(200);
              done();
            });
          });
      });
  });
});
