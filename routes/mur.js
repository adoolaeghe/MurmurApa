var express = require('express');
var router = express.Router();

import Mur from '../models/mur'
import User from '../models/user'


module.exports = function(passport) {

  router.get('/all', function(req,res){
    Mur.getAllMurs(function(err, murs){
      if(err) {
        throw err;
      }
      res.json(murs)
    });
  });

  router.post('/', (req,res) => {
    let mur = req.body;
    Mur.addMur(mur, function(err, mur) {
      if(err) {
        throw err;
      }
      res.json(mur);
    })
  });

  router.post('/:id',(req,res) => {
    Mur.updateMur(req.params.id, req.body, res, function(err, mur){
      if(err) {
        throw err;
      }
    })
  });

  router.get('/:id', (req,res) => {
    Mur.getMur(req.params.id, res, function(err, mur){
      if(err) {
        throw err;
      }
    })
  })

  router.delete('/:id', (req,res) => {
    Mur.deleteMur(req.params.id, res, function(err, mur){
      if(err) {
        throw err;
      }
    })
  })

  router.put('/:id/buyshare', (req, res, next) => {
    Mur.buyShare(req.params.id, res, req, function(err, mur) {
      if(err) {
        throw err;
      }
    })
  })

	return router;
}
