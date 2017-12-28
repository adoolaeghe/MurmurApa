import express from 'express';
// var browserify = require('browserify')
// var path = require('path');
// var favicon = require('serve-favicon');
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');
// var exphbs = require('express-handlebars');
import bodyParser from 'body-parser';
// var routes = require('./routes/index');
// var index = require('./routes/index');
// var users = require('./routes/users');
import mongoose from 'mongoose';

// catch 404 and forward to error handler
let app = express();
import Mur from './models/mur'

// Connect to mongoose
// mongoose.connect('mongodb://localhost/')
// let db = mongoose.connection

app.get('/', function(req,res){
  res.send('please use the api end point');
})

app.get('/hello', function(req,res){
  res.send('hello');
})

app.listen(3000)
console.log('Running on port 3000')
