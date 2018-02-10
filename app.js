import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';
import expressSession from 'express-session'
var LocalStrategy = require('passport-local').Strategy;
var RateLimit = require('express-rate-limit');


let app = express();
app.enable('trust proxy');

var limiter = new RateLimit({
  windowMs: 15*60*1000,
  max: 200,
  delayMs: 0
});

app.use(limiter);

var morgan = require('morgan')

app.use(morgan("common"));

import Mur from './models/mur'
import User from './models/user'

// Passport set up
passport.use(new LocalStrategy(User.authenticate()));

// Using the flash middleware provided by connect-flash to store messages in session
var flash = require('connect-flash');
app.use(flash());

// Initialize Passport
var initPassport = require('./passport/init');
initPassport(passport);

app.use(bodyParser.json())

//use sessions for tracking logins
app.use(expressSession({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false
}));

// initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Connect to mongoose
mongoose.connect('mongodb://localhost/MURMUR_TEST')
let db = mongoose.connection

var path = require('path');
var userRoute = require('./routes/user')(passport);
var murRoute = require('./routes/mur')();

app.use('/user', userRoute);
app.use('/mur', murRoute);

var isAuthenticated = function (req, res, next) {
	if (req.isAuthenticated()){
    return next();
  }
  res.send('you are note authenticated !!')
}

/// MURS API
app.get('/', function(req,res){
  res.send('Please refer to the API routes')
});

module.exports = app;

app.listen(8080, () => {
  console.log('LISTENING ON PORT');
});
