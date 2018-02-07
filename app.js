import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-better-body";
import c2k from "koa-connect";

import mongoose from 'mongoose';
import passport from 'koa-passport';
import koaSession from 'koa-session'

var LocalStrategy = require('passport-local').Strategy;

const app = new Koa();

import Mur from './models/mur'
import User from './models/user'



app.use(bodyParser());

// Sessions
app.keys = ['secret']
app.use(koaSession({}, app))

// initialize Passport
app.use(passport.initialize())
app.use(passport.session())

// error handling
app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.status = err.status || 500
    ctx.body = err.message
    ctx.app.emit('error', err, ctx)
  }
})

// Connect to mongoose
mongoose.Promise = require('bluebird')
mongoose
.connect('mongodb://localhost/MURMUR_TEST')
.then((response) => {
    console.log('mongo connection created')
})
.catch((err) => {
    console.log("Error connecting to Mongo")
    console.log(err);
})

let db = mongoose.connection

var path = require('path');
// var routes = require('./routes/user')(passport);


var isAuthenticated = function (req, res, next) {
	if (req.isAuthenticated()){
    return next();
  }
  res.send('you are note authenticated !!')
}

const router = require('koa-simple-router')
const convert = require('koa-convert')
const koaRes = require('koa-res')
const logger = require('koa-logger')

app.use(convert(koaRes()))
app.use(logger())

/// MURS API
app.use(router(_ => {

    _.get('/', async (ctx) => {
      ctx.body = 'Please refer to the API routes'
    }),

    _.get('/mur/all', async (ctx) => {
      return Mur.getMurs(ctx)
    }),

    _.post('/mur', async (ctx) => {
      let mur = await ctx.request.fields;
      return Mur.addMur(mur, ctx)
    })

    _.post('/mur/:id', async (ctx) => {
      let murId = await ctx.params.id;
      let updatedMur = await ctx.request.fields;
      return Mur.updateMur(murId, updatedMur, ctx)
    })

    _.get('/mur/:id', async (ctx) => {
      let murId = await ctx.params.id;
      return Mur.getMur(murId, ctx)
    })

    _.delete('/mur/:id', async (ctx) => {
      let murId = await ctx.params.id;
      return Mur.deleteMur(murId, ctx)
    })

    _.put('/mur/:id/buyshare', async (ctx) => {
      let murId = await ctx.params.id;
      return Mur.buyShare(murId, ctx)
    })
}))

app.use(router(_ => {
    _.post('/signup', passport.authenticate('signup', {
      successRedirect: '/successjson',
      failureRedirect: '/failurejson',
      failureFlash : true
    }))
}))


const CSRF = require('koa-csrf')

// trust proxy
app.proxy = true

// sessions
const session = require('koa-generic-session')
const MongoStore = require('koa-generic-session-mongo')

app.keys = ['your-session-secret', 'another-session-secret']
app.use(convert(session({
  store: new MongoStore()
})))



// authentication
require('./passport/init')

app.use(passport.initialize())
app.use(passport.session())

// routes
const fs    = require('fs')
const route = require('koa-route')


app.use(route.post('/custom', async (ctx, next) => {
  console.log(ctx.request.fields)
  let user = await ctx.request.fields;
  return passport.authenticate('signup', async (user, info, status) => {
    if (user === false) {
      ctx.status = 401
      ctx.body = { success: false }
    } else {
      ctx.body = { success: true }
      return ctx.login(user)
    }
  })(ctx, next)
}))

// POST /login
app.use(route.post('/login',
  passport.authenticate('local', {
    successRedirect: '/app',
    failureRedirect: '/'
  })
))

app.use(route.get('/logout', function(ctx) {
  ctx.logout()
  ctx.redirect('/')
}))

app.use(route.get('/auth/facebook',
  passport.authenticate('facebook')
))

app.use(route.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/app',
    failureRedirect: '/'
  })
))

app.use(route.get('/auth/twitter',
  passport.authenticate('twitter')
))

app.use(route.get('/auth/twitter/callback',
  passport.authenticate('twitter', {
    successRedirect: '/app',
    failureRedirect: '/'
  })
))

app.use(route.get('/auth/google',
  passport.authenticate('google')
))

app.use(route.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/app',
    failureRedirect: '/'
  })
))

// Require authentication for now
app.use(function(ctx, next) {
  if (ctx.isAuthenticated()) {
    return next()
  } else {
    ctx.redirect('/')
  }
})

app.use(route.get('/app', function(ctx) {
  ctx.type = 'html'
  ctx.body = fs.createReadStream('views/app.html')
}))


//
// router.put('/mur/:id/buyshare',isAuthenticated, (req, res, next) => {
//   Mur.buyShare(req.params.id, res, req, function(err, mur) {
//     if(err) {
//       throw err;
//     }
//   })
// })
// app.use(router.routes()).use(router.allowedMethods());

app.listen(8080)
console.log('Running on port 8080')
