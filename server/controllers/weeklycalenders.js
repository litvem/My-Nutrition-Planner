var express = require('express');
var router = express.Router();

var Weekcalender = require('../models/weeklycalender');

router.post('/api/weekcalenders',function(req, res,next) {
    var weekcalender = new Weekcalender(req.body);
    weekcalender.save(function(err,weekcalender){
        if(err) {return next(err);}
    res.status(201).json(weekcalender);    
  });
});

router.post('/api/weekcalenders/history',function(req, res,next) {
  var weekcalender = new Weekcalender(req.body);
  weekcalender.save(function(err,weekcalender){
      if(err) {return next(err);}
  res.status(201).json(weekcalender);    
});
});

// get all 
router.get('/api/weekcalenders/history', function(req,res,next){
    Recipe.find(function(err,weekcalenders){
      res.json({'weekcalenders:': weekcalenders});
    })
  });
  
  // getting specific 
  router.get('/api/weekcalenders/:id', function(req,res,next){
    var id = req.params.id;
    Weekcalender.findById(id,function(err,weekcalender){
        if(err){return next(err);}
        if(weekcalender == null){
          return res.status(404).json({ 'message':'The weekcalender not found'});
        }
        res.json(weekcalender)
    });
  });

  // deleting specific 
  router.delete('/api/weekcalenders/:id', function(req, res, next) {
    var id = req.params.id;
    Weekcalender.findOneAndDelete({_id: id}, function(err, weekcalender) {
        if (err) { return next(err); }
        if (weekcalender === null) {
            return res.status(404).json({'message': 'Weekcalender not found'});
        }
        res.json(weekcalender);
    });
});

  
  module.exports = router;