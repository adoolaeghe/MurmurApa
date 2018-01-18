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

// BodyParser
app.use(bodyParser.json())

//use sessions for tracking logins
app.use(expressSession({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Connect to mongoose
mongoose.connect('mongodb://localhost/MURMUR_TEST')
let db = mongoose.connection

var path = require('path');
var routes = require('./routes/index')(passport);
app.use('/', routes);

// app.get('/', function(req,res){
//   res.send("Please use the specified api routes")
// });

/// MURS API
app.get('/mur/all', function(req,res){
  Mur.getAllMurs(function(err, murs){
    if(err) {
      throw err;
    }
    res.json(murs)
  });
});

/// MUR API
app.post('/mur', (req,res) => {
  let mur = req.body;
  Mur.addMur(mur, function(err, mur){
    if(err) {
      throw err;
    }
    res.json(mur);
  })
});

/// UPDATE NEW MUR
app.put('/mur/:id', (req,res) => {
  Mur.updateMur(req.params.id, req.body, res, function(err, mur){
    if(err) {
      throw err;
    }
  })
});

/// GET A MUR BY ID
app.get('/mur/:id', (req,res) => {
  Mur.getMur(req.params.id, res, function(err, mur){
    if(err) {
      throw err;
    }
  })
})

app.delete('/mur/:id', (req,res) => {
  Mur.deleteMur(req.params.id, res, function(err, mur){
    if(err) {
      throw err;
    }
  })
})

app.put('/mur/:id/buyshare', (req, res) => {
  Mur.buyShare(req.params.id, res, function(err, mur) {
    if(err) {
      throw err;
    }
  })
})

/// USER API

// app.post('/signup', passport.authenticate('signup', {
//    failureFlash : true
//  }));

// app.post('/user', (req,res) => {
//   let user = req.body;
//   User.createUser(user, function(err, user) {
//     if(err) {
//       throw err;
//     }
//     res.json(user);
//   })
// });

/// MURS API
// app.get('/user/all', function(req,res){
//   User.getAllUsers(function(err, users){
//     if(err) {
//       throw err;
//     }
//     console.log('her')
//     res.json(users)
//   });
// });
//
// app.post('/user/login', (req,res) => {
//
// });
//
// app.get('/user/logout', (req,res) => {
//
// });
//
// app.get('/user/:username', (req,res) => {
//
// });
//
// app.put('/user/:username', (req,res) => {
//
// });
//
// app.delete('/user/:username', (req,res) => {
//
// });

app.listen(8080)
console.log('Running on port 8080')
