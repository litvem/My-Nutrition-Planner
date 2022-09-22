var express = require('express');
const day = require('../models/day');
var router = express.Router();

var Day = require('../models/day');
const User = require('../models/user');

var daysPath = '/api/profiles/:profileId/days';
var specificDaysPath = '/api/profiles/:profileId/days/:dayId';


router.post(daysPath,function(req, res,next) {
  User.findById(req.params.profileId)
  .exec()
  .then(user =>{
    if(user ==null){
      return res.status(404).json({message:"User not found"});
    }

    var day = new Day(req.body);
    day.save()
    
    res.status(201).json({ 
        dayCreated: day,
         links: {
            rel: "self",
            type: "GET",
            url: 'http://localhost:3000/api/profiles/'+ user._id + '/days/' + day._id 
        }
    });

    user.days.push(day);
    user.save();
      
  }) 
  .catch(err => {
    res.status(500).json({
      error: err
    });
  });
});


// get all 
router.get(daysPath, function(req,res,next){
  User.findById({_id:req.params.profileId})
  .populate('days')
  .then(user => {
    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }else if(user.days.length === 0){
      return res.status(404).json({
        message: "Day not found"
      });
    }else{
      return res.status(200).json({
        days: user.days,
        link: {
         rel: "day",
         type: "POST",
         url: 'http://localhost:3000/api/profiles/'+ user._id + '/days'
       }
     });
    }
  })
  .catch(err => {
    res.status(500).json({
      error: err
    });
  });
});


// get specific
router.get(specificDaysPath, function(req,res,next){

  User.findOne({_id:req.params.profileId})
  .populate({path: 'days' , match:{_id: {$eq: req.params.dayId}}, populate:{path: 'recipes'}})
  .exec()
  .then(user =>{
    if(user === null){
      return res.status(404).json({message: 'User not found'}); 
    }
    if(user.days === null){
      return res.status(404).json({message: 'Day not found'})
    }
    res.status(200).json({
        day: user.days,
      links: {
        rel: "self",
        type: "PATCH",
        url: 'http://localhost:3000/api/profiles/'+ user._id + '/days/' + user.days._id 
      }
   });
  })
  .catch(err => {
    res.status(500).json({
      error: err
    });
  });  
});

// patch
router.patch(specificDaysPath, function (req, res, next) {
  User.findById(req.params.profileId)
  .then(user =>{
    if(user === null){
      return res.status(404).json({message: 'User not found'}); 
    }
    if(user.days.length === 0){
      return res.status(404).json({message: 'Day not found'})
    }

    Day.findByIdAndUpdate(req.params.dayId, req.body, { new: true })
    .then(day =>{
      return res.status(200).json({
        UpdatedDay: day
      });  
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
  }) 
});

// deleting specific
router.delete(specificDaysPath, function(req, res, next) {
  User.findOne({_id:req.params.profileId})
  .populate({path: 'days' , match:{_id: {$eq: req.params.dayId}},})
  .exec()
  .then(user =>{
    if(user === null){
      return res.status(404).json({message: 'User not found'}); 
    }
    if(user.days.length === 0){
      return res.status(404).json({message: 'Day not found'})
    }
    user.days.pull({_id: req.params.dayId});
    user.save();

    Day.findOneAndDelete({_id: req.params.dayId})
    .then(day =>{
  

      return res.status(200).send({
        message : "The day has been deleted",
        deletedday: day.name,
        link:{
          rel:'day',
          type:'POST',
          url:'http://localhost:3000/api/profiles/' + user._id + '/days'
        }
      });
    })
    .catch(err => {
      res.status(500).json({
      error: err
      });
    });
  }) 
});




module.exports = router;