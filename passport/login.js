var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/user');
var bCrypt = require('bcrypt-nodejs');

var isValidPassword = function(password, user){
	return bCrypt.compareSync(user, password);
}

module.exports = function(passport){
	passport.use('login', new LocalStrategy({
        passReqToCallback : true
      },
      function(req, username, password, done) {
        User.findOne({ 'username' :  username },
          function(err, user) {
            if (err) {
              return done(err);
            }
            if (!user){
              return done(null, false, req.flash('message', 'User Not found.'));
            }
            if (!isValidPassword(user.password, password)){
              return done(null, false, req.flash('message', 'Invalid Password'));
            }
            req.session.user = user
            return done(null, user);
          }
        );
      })
    );
}
