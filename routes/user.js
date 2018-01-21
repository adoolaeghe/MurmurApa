var express = require('express');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
	if (req.isAuthenticated()){
    return next();
  }
}

module.exports = function(passport){
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

	router.get('/successjson', function(req, res) {
	  res.json({ message: 'sucess',
	 						 authenticated: req.isAuthenticated()});
	});

	router.get('/failurejson', function(req, res) {
    res.json({ message: 'failure'});
	});

	return router;
}
