import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';
import expressSession from 'express-session'
var LocalStrategy = require('passport-local').Strategy;

let app = express();

import Mur from './models/mur'
import User from './models/user'

// Passport set up
passport.use(new LocalStrategy(User.authenticate()));

// Using the flash middleware provided by connect-flash to store messages in session
// and displaying in templates
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
var routes = require('./routes/user')(passport);

app.use('/', routes);

var isAuthenticated = function (req, res, next) {
	if (req.isAuthenticated()){
    return next();
  }
  res.send('you are note authenticated !!')
}

/// MURS API
app.get('/', function(req,res){
  res.send('heelo')
});

/// MURS API
app.get('/mur/all',isAuthenticated, function(req,res){
  Mur.getAllMurs(function(err, murs){
    if(err) {
      throw err;
    }
    res.json(murs)
  });
});

/// MUR API
app.post('/mur',isAuthenticated,(req,res) => {
  let mur = req.body;
  Mur.addMur(mur, function(err, mur) {
    if(err) {
      throw err;
    }
    res.json(mur);
  })
});

/// UPDATE NEW MUR
app.put('/mur/:id',isAuthenticated,(req,res) => {
  Mur.updateMur(req.params.id, req.body, res, function(err, mur){
    if(err) {
      throw err;
    }
  })
});

/// GET A MUR BY ID
app.get('/mur/:id', isAuthenticated,(req,res) => {
  Mur.getMur(req.params.id, res, function(err, mur){
    if(err) {
      throw err;
    }
  })
})

app.delete('/mur/:id',isAuthenticated,(req,res) => {
  Mur.deleteMur(req.params.id, res, function(err, mur){
    if(err) {
      throw err;
    }
  })
})

app.put('/mur/:id/buyshare',isAuthenticated, (req, res, next) => {
  Mur.buyShare(req.params.id, res, req, function(err, mur) {
    if(err) {
      throw err;
    }
  })
})



app.listen(8080)
console.log('Running on port 8080')
