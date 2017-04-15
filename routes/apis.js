var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Place = require('../models/place.js');

/*Get /place 地點列表*/
router.get('/places', function(req, res) {
  Place.find(function(err,places){
    if(err)return next(err);
    res.json(places);
  });
});

/*post /place 地點*/

router.post('/places', function(req, res, next) {
  Place.create(req.body, function (err, post) {
    if (err) return next(err);
    console.log("receive post!",req.body);
    res.json(req.body);
  });
});

module.exports = router;
