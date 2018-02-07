// import Koa from "koa";
// import Router from "koa-router";
// const app = new Koa()
// const router = require('koa-simple-router')
// const convert = require('koa-convert')
// const koaRes = require('koa-res')
// const logger = require('koa-logger')
// import User from '../models/user'
//
// var isAuthenticated = async (ctx, next) => {
// 	if (ctx.isAuthenticated()){
//     return next();
//   }
// }
//
// module.exports = function(passport) {
// 	app.use(router(_ => {
// 	    _.post('/signup', passport.authenticate('signup', {
// 				successRedirect: '/successjson',
// 				failureRedirect: '/failurejson',
// 				failureFlash : true
// 			}))
// 	}))
//
// 	// // HANDLE LOGIN POST //
// 	// router.post('/login', passport.authenticate('login', {
// 	// 	successRedirect: '/successjson',
// 	// 	failureRedirect: '/failurejson',
// 	// 	failureFlash : true
// 	// }));
//
// 	// HANFLE REGISTRATION POST //
// 	router.post('/signup', passport.authenticate('signup', {
// 		successRedirect: '/successjson',
// 		failureRedirect: '/failurejson',
// 		failureFlash : true
// 	}));
//
// 	// // HANDLE LOGOUT //
// 	// router.get('/signout',isAuthenticated, function(req, res, next) {
// 	//   req.logout();
// 	//   req.session.destroy(function (err) {
// 	//     if (err) { return next(err); }
// 	//     return res.send({ authenticated: req.isAuthenticated()});
// 	//   });
// 	// });
//   //
// 	// //GET A SPECIFIC USER//
// 	// router.get('/user/:id',isAuthenticated, (req, res) => {
// 	//   User.getUser(req.params.id, res, function(err, user) {
// 	//     if(err) {
// 	//       throw err;
// 	//     }
// 	//   })
// 	// })
//   //
// 	// //GET A SPECIFIC USER//
// 	// router.get('/users', isAuthenticated, (req, res) => {
// 	// 	User.getAllUsers(function(err, users){
// 	//     if(err) {
// 	//       throw err;
// 	//     }
// 	//     res.json(users)
// 	//   });
// 	// })
//   //
// 	// //USER STORE AN INSTANCE OF SHARE IT BOUGHT//
// 	// router.put('/user/:id/storeShare',isAuthenticated, (req, res, next) => {
// 	//   let shareId = req.session.share;
// 	// 	let sharePrice = req.session.sharePrice;
// 	//   User.storeShare(req.params.id, shareId, sharePrice, res, req, function(err) {
// 	//     if(err) {
// 	//       throw err;
// 	//     }
// 	//   })
// 	// })
//   //
// 	// //USER CAN STORE AN INSTANCE OF SHARE IT BOUGHT//
// 	// router.put('/user/topup',isAuthenticated, (req, res, next) => {
// 	// 	let amount = req.body.amount;
// 	//   User.topUp(req.session.passport.user, amount, res, req, function(err) {
// 	//     if(err) {
// 	//       throw err;
// 	//     }
// 	//   })
// 	// })
//   //
// 	// //USER CAN SELL A SHARE//
// 	// router.post('/user/:shareid/sellshare',isAuthenticated, (req, res, next) => {
// 	// 	let shareId = req.params.shareid;
//   //
// 	//   User.sellShare(req.session.passport.user, shareId, res, req, function(err, mur) {
// 	//     if(err) {
// 	//       throw err;
// 	//     }
// 	//   })
// 	// })
//   //
// 	// //USER SUCCESS AUTHENTICATION//
// 	// router.get('/successjson', function(req, res) {
// 	//   res.json({ message: 'sucess',
// 	//  						 authenticated: req.isAuthenticated()});
// 	// });
//   //
// 	// //USER FAILURE AUTHENTICATION//
// 	// router.get('/failurejson', function(req, res) {
//   //   res.json({ message: 'failure'});
// 	// });
//
// 	return router;
// }
