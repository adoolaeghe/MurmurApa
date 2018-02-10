var express = require('express');
var router = express.Router();

import User from '../models/user'

var isAuthenticated = function (req, res, next) {
	if (req.isAuthenticated()){
    return next();
  }
}

module.exports = function(passport) {

	// HANDLE LOGIN POST //
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/user/successjson',
		failureRedirect: '/user/failurejson',
		failureFlash : true
	}));

	// HANFLE REGISTRATION POST //
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/user/successjson',
		failureRedirect: '/user/failurejson',
		failureFlash : true
	}));

	// HANDLE LOGOUT //
	router.get('/signout',isAuthenticated, function(req, res, next) {
	  req.logout();
	  req.session.destroy(function (err) {
	    if (err) { return next(err); }
	    return res.send({ authenticated: req.isAuthenticated()});
	  });
	});

	//GET A SPECIFIC USER//
	router.get('/:id',isAuthenticated, (req, res) => {
	  User.getUser(req.params.id, res, function(err, user) {
	    if(err) {
	      throw err;
	    }
	  })
	})

	//GET A SPECIFIC USER//
	router.get('/users',  (req, res) => {
		User.getAllUsers(function(err, users){
	    if(err) {
	      throw err;
	    }
	    res.json(users)
	  });
	})

	//USER STORE AN INSTANCE OF SHARE IT BOUGHT//
	router.put('/:id/storeShare', (req, res, next) => {
	  let shareId = req.session.share;
		let sharePrice = req.session.sharePrice;
	  User.storeShare(req.params.id, shareId, sharePrice, res, req, function(err) {
	    if(err) {
	      throw err;
	    }
	  })
	})

	//USER CAN STORE AN INSTANCE OF SHARE IT BOUGHT//
	router.put('/topup', (req, res, next) => {
		let amount = req.body.amount;
	  User.topUp(req.session.passport.user, amount, res, req, function(err) {
	    if(err) {
	      throw err;
	    }
	  })
	})

	//USER CAN SELL A SHARE//
	router.post('/:shareid/sellshare', (req, res, next) => {
		let shareId = req.params.shareid;
	  User.sellShare(req.session.passport.user, shareId, res, req, function(err, mur) {
	    if(err) {
	      throw err;
	    }
	  })
	})

	//USER SUCCESS AUTHENTICATION//
	router.get('/successjson', function(req, res) {
	  res.json({ message: 'sucess',
	 						 authenticated: req.isAuthenticated()});
	});

	//USER FAILURE AUTHENTICATION//
	router.get('/failurejson', function(req, res) {
    res.json({ message: 'failure'});
	});

	return router;
}
