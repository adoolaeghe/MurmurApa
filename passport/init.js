const passport = require('koa-passport')
var login = require('./login')
var signup = require('./signup')
const User = require('../models/user.js')

User.findOne({ username: 'test' }, function (err, testUser) {
  if (!testUser) {
    console.log('test user did not exist; creating test user...')
    testUser = new User({
      username: 'test',
      password: 'test'
    })
    testUser.save()
  }
})

passport.serializeUser(function(user, done) {
  done(null, user._id)
})

passport.deserializeUser(function(id, done) {
  User.findById(id, done);
})

login(passport);
signup(passport);
