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


describe('Murs', () => {
  describe('/GET all mur', () => {
      it('it should GET all the murs', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
              res.should.have.status(200);
              done();
            });
      });
  });
});
