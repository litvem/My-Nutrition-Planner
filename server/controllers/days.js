var express = require('express');
var router = express.Router();

var Day = require('../models/day');
const User = require('../models/user');
const checkAuth = require('../middleware/check-auth');

var daysPath = '/api/profiles/:profileId/days';
var specificDaysPath = '/api/profiles/:profileId/days/:dayId';


router.post(daysPath, checkAuth, function(req, res, next) {
  User.findById(req.params.profileId)
  .populate('days')
  .exec()
  .then(user => {
    if(user ==null) {
      return res.status(404).json({message:"User not found"});
    }
    var checkDay =  user.days.filter(days => days.year==req.body.year && days.week == req.body.week && days.name == req.body.name)

    if(checkDay.length > 0) {
      res.status(409).json({message:"Day already exist"});
    } else {
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
    }
      
  }) 
  .catch(err => {
    res.status(500).json({
      error: err
    });
  });
});


// Get all 
router.get(daysPath,function(req,res,next){
  var week = req.query.week;
  var year = req.query.year;
  var weekcalenders = req.query.weekcalenders

  User.findOne({_id:req.params.profileId})
  .populate('days')
  .populate('recipes')
  .exec()
  .then(user =>{
    if(user === null){
      return res.status(404).json({message: 'User not found'}); 
    }
    if(user.days.length === 0){
      return res.status(404).json({message: 'Day not found'})
    }
    if( (!week && year) || (week && !year) ){
      return res.status(404).json({message: 'Need year and week'})
    }
    const weekDay = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] 
    if(week && year) {
      var filtered =   user.days.filter(days => days.year == year && days.week ==  week)
                                    .sort((x,y)=>{
                                      if(y.year !== x.year && y.week !==x.week){
                                        return y.year - x.year || y.week - x.week;
                                      }else{
                                        return weekDay.indexOf(x.name) - weekDay.indexOf(y.name);
                                      } 
      })

      
      const weekdays = [{name: 'Monday'}, {name:'Tuesday' },{name:'Wednesday' }, {name:'Thursday' }, {name:'Friday' }, {name:'Saturday' }, {name:'Sunday' }]    

      let weekdayNames = weekdays.map(day => day.name.toLowerCase())

      for (const el of filtered) {
          weekdays[weekdayNames.indexOf(el.name.toLowerCase())] = el
      }
 
      res.status(200).json({
        days: weekdays,
        links: {
          rel: "self",
          type: "PATCH",
          url: 'http://localhost:3000/api/profiles/'+ user._id + '/days/' + user.days._id 
        }
      });

    }else if(weekcalenders){
      var weekcals = [...new Set(user.days.map(day =>`${day.week}:${day.year}`))]
      .map(m => {const [week,year] = m.split(':')
          .map(result => result | 0);
          return {week,year}; 
          })
      .sort((x,y) => {return  y.year - x.year || y.week - x.week})
    

      return res.status(200).json({ weeklyCalenders: weekcals});
    }else{
      var days = user.days.sort((x,y) => {return  y.year - x.year || y.week - x.week})
      res.status(200).json({
          days: days,
        links: {
          rel: "self",
          type: "PATCH",
          url: 'http://localhost:3000/api/profiles/'+ user._id + '/days/' + user.days._id 
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


// Get specific
router.get(specificDaysPath, checkAuth,function(req,res,next){

  User.findOne({_id:req.params.profileId})
  .populate({path: 'days' , match:{_id: {$eq: req.params.dayId}}, populate:{path: 'recipes'}})
  .exec()
  .then(user =>{
    if(user === null){
      return res.status(404).json({message: 'User not found'}); 
    }
    if(user.days.length === 0){
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


//put 
router.put(specificDaysPath,checkAuth, function (req, res, next) {
  var dayId = req.params.dayId;
  User.findOne({_id: req.params.profileId})
  .populate('days')
  .then(user =>{
    if(user === null){
      return res.status(404).json({message: 'Not found'}); 
    }

    var checkDay =  user.days.filter(days => days.year==req.body.year && days.week == req.body.week && days.name == req.body.name)
    if(checkDay.length > 0) {
      return res.status(404).json({message: 'This day already exist'}); 
    }

/*     if(!req.body.name || !req.body.week || !req.body.year || !req.body.recipes ){
      return res.status(400 ).json({message: ''}); 
    } */
  
    Day.findById(dayId)
    .then(day =>{
      day.name = req.body.name;
      day.week = req.body.week;
      day.year = req.body.year;
      day.recipes = req.body.recipes;
      day.save();

      return res.status(200).json({updatedDay: day});  
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
  }) 
});

// patch
router.patch(specificDaysPath,checkAuth, function (req, res, next) {
  User.findById(req.params.profileId)
  .then(user =>{
    if(user === null){
      return res.status(404).json({message: 'User not found'}); 
    }
    if(user.days.length === 0){
      return res.status(404).json({message: 'Day not found'})
    }

    var checkDay =  user.days.filter(days => days.year==req.body.year && days.week == req.body.week && days.name == req.body.name)
    if(checkDay.length > 0) {
      return res.status(404).json({message: 'This day already exist'}); 
    }

    Day.findByIdAndUpdate(req.params.dayId, req.body, { new: true })
    .then(day =>{
      return res.status(200).json({
        updatedDay: day
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
router.delete(specificDaysPath,checkAuth, function(req, res, next) {
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


//Delete all the days
router.delete(daysPath, checkAuth, function(req, res, next) {

  var week = req.query.week;
  var year = req.query.year;

  User.findOne({_id:req.params.profileId})
  .populate('days')
  .then( user => {
    if(user === null){
      return res.status(404).json({message: 'User not found'}); 
    }
    if(user.days.length === 0){
      return res.status(404).json({message: 'Days not found'})
    }
    if(week && year){
      var filtered = user.days.filter(day => {
        return day.week == week && day.year == year
      }) 

      Day.deleteMany({ "_id":{ $in: filtered} }, function(err) {
        if(err) return next(err);
      });

      return res.status(200).send({
        message : 'All days for week '+ week  +' deleted',
        link:{
          rel:'Days',
          type:'POST',
          url:'http://localhost:3000/api/profiles/' + user._id + '/days'
        }
      });

    }else{
      Day.deleteMany({ "_id":{ $in: user.days} }, function(err){
        if(err) return next(err);
      });
  
      user.days=[];
      user.save();
      
      return res.status(200).send({
        message : "All days have been deleted",
        link:{
          rel:'Days',
          type:'POST',
          url:'http://localhost:3000/api/profiles/' + user._id + '/days'
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

module.exports = router;