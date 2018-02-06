//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Mur = require('../models/mur');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../routes/user');
let should = chai.should();

chai.use(chaiHttp);

const user = {
	"username": "username",
	"firstName": "firstName",
	"lastName": "lastName",
	"email": "email",
	"password": "fesfdqzdqzdesssword"
}

describe('Users', () => {
  describe('login', () => {
    chai.request(server)
    .post('/signup')
    .send(user)
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('object');
      done();
    });
  });
});
