var express = require('express');
var router = express.Router();

var Profile = require('../models/profile');

router.post('/api/profiles',function(req, res,next) {
    var profile = new Profile(req.body);
    profile.save(function(err,profile){
        if(err) {return next(err);}
    res.status(201).json(profile);    
  });
});

// get all 
router.get('/api/profiles', function(req,res,next){
    Pro.find(function(err,profiles){
      res.json({'profiles:': profiles});
    })
  });
  
  // getting specific 
  router.get('/api/profiles/:id', function(req,res,next){
    var id = req.params.id;
    Profile.findById(id,function(err,profile){
        if(err){return next(err);}
        if(profile == null){
          return res.status(404).json({ 'message':'Profile not found!'});
        }
        res.json(profile)
    });
  });

  // deleting specific 
  router.delete('/api/profiles/:id', function(req, res, next) {
    var id = req.params.id;
    Camel.findOneAndDelete({_id: id}, function(err, profile) {
        if (err) { return next(err); }
        if (profile === null) {
            return res.status(404).json({'message': 'Profile not found'});
        }
        res.json(profile);
    });
});

  
  module.exports = router;