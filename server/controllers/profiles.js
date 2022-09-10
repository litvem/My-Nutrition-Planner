var express = require('express');
var router = express.Router();

var Profile = require('../models/profile');
var responseMessage = [];

router.post('/api/profiles',function(req, res,next) {
  var profile = new Profile(req.body);
  profile.save(function(err,profile){
      if(err) {return next(err);}
  res.status(201).json(profile);    
});
});


// get all 
router.get('/api/profiles', function(req,res,next){
    Profile.find(function(err,profiles){
      res.json({'profiles:': profiles});
    })
});
  
// getting specific 
router.get('/api/profiles/:id', function(req,res,next){
     var id = req.params.id;
      Profile.findById(id,function(err,profile){
        if(err){return next(err);}
        if(profile == null){
          return res.status(404).json({ 'message':'Profile not found'});
        }
        res.status(200).json(profile)
      });
}); 

/* Both are idempotent: 
they are supposed to change state of the resources 
only once and not again and again
*/

//put - replaces an existing resource on the server
router.put('/api/profiles/:id',function(req, res, next) {
  var id = req.params.id;
  Profile.findById(id, function(err, profile) {
      if (err) { return next(err); }
      if (profile == null) {
          return res.status(404).json({"message": "Profile not found"});
      }
      profile.username = req.body.username;
      profile.password = req.body.password;
      profile.email = req.body.email;
      profile.question = req.body.question;
      profile.answer = req.body.answer;

      profile.save();
      res.status(200).json(profile);
  });
});

// patch - partial replacement - specific attribute
router.patch('/api/profiles/:id', function(req, res, next) {
   var id = req.params.id;
  Profile.findById(id, function(err, profile) {
      if (err) { return next(err); }
      if (profile == null) {
          return res.status(404).json({"message": "Profile not found"});
      }
      profile.username = (req.body.username || profile.username);
      profile.password = (req.body.password || profile.password);
      profile.email = (req.body.email || profile.email);
      profile.question = (req.body.question || profile.question);
      profile.answer = (req.body.answer || profile.answer);
      
      profile.save();
      res.status(200).json(profile);
    
  });
});
// deleting specific 
router.delete('/api/profiles/:id', function(req, res, next) {
    var id = req.params.id;
    Profile.findOneAndDelete({_id: id}, function(err, profile) {
        if (err) { return next(err); }
        if (profile === null) {
            return res.status(404).json({'message': 'Profile not found'});
        }
        res.status(204).json(profile);
        console.log("profile: " + id + " has been deleted");
    });
});
  
module.exports = router;