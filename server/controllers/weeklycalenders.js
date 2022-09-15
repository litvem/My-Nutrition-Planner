var express = require('express');
var Weeklycalender = require('../models/weeklycalender');

const weeklycalenderPath = '/api/profiles/:profileId/weeklycalenders';
const specificWeeklycalenderPath = '/api/profiles/:profileId/weeklycalenders/:weeklycalenderId';

var router = express.Router();

//Create weekly calender
router.post(weeklycalenderPath,function(req, res,next) {
    var weeklycalender = new Weeklycalender(req.body);
    weeklycalender.save(function(err, weeklycalender) {
        if(err) { return next(err); }
        res.status(201).json(weeklycalender);    
  });
});

//Get all weekly calenders
router.get(weeklycalenderPath, function(req, res, next) {
  Weeklycalender.find(function(err, weeklycalenders){
    if(err) { return next(err); }
    res.json({'weeklycalenders:': weeklycalenders});
  });
});

//Get specific weekly calender
router.get(specificWeeklycalenderPath, function(req, res, next) {
  var id = req.params.id;
  Weeklycalender.findOne(id, function(err, weeklycalender) {
      if(err) { return next(err); }
      if(weeklycalender === null) {
        return res.status(404).json({ 'message' : 'The weekly calender not found' });
      }
      res.json(weeklycalender);
    });
  });

  module.exports = router;