var express = require('express');
var router = express.Router();

import User from '../models/user'

var isAuthenticated = function (req, res, next) {
	if (req.isAuthenticated()){
    return next();
  }
}

module.exports = function(passport) {

	// Handle Login POST //
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/successjson',
		failureRedirect: '/failurejson',
		failureFlash : true
	}));

	// Handle Registration POST //
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/successjson',
		failureRedirect: '/failurejson',
		failureFlash : true
	}));

	// Handle Logout //
	router.get('/signout',isAuthenticated, function(req, res, next) {
	  req.logout();
	  req.session.destroy(function (err) {
	    if (err) { return next(err); }
	    return res.send({ authenticated: req.isAuthenticated()});
	  });
	});

	// Store an instance of a share//
	router.put('/user/:id/storeShare',isAuthenticated, (req, res, next) => {
	  let shareId = req.session.share;
	  User.storeShare(req.params.id, shareId, res, req, function(err, mur) {
	    if(err) {
	      throw err;
	    }
	  })
	})

	// Store an instance of a share//
	router.get('/user/:id',isAuthenticated, (req, res) => {
	  User.getUser(req.params.id, res, function(err, user) {
	    if(err) {
	      throw err;
	    }
	  })
	})

	router.get('/successjson', function(req, res) {
	  res.json({ message: 'sucess',
	 						 authenticated: req.isAuthenticated()});
	});

	router.get('/failurejson', function(req, res) {
    res.json({ message: 'failure'});
	});

	return router;
}
