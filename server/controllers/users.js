var express = require('express');
const mongoose = require("mongoose");
var router = express.Router();

var User = require('../models/user');

const userPath = '/api/profiles';
const specificUserPath = '/api/profiles/:profileId';
const userNotFound = "User not found";

router.post(userPath,function(req, res,next) {
  User.find({ username: req.body.username })
    .exec()
    .then(username => {
      if (username.length >= 1) {
        return res.status(409).json({
          message: "Username already exists"
        });
      } else {
        const user = new User(req.body);
        user
        .save()
        .then(result => {
          console.log(result);
          res.status(201).json({
            userCreated: result,
            links: [{
              rel: "self",
              type: 'PATCH',
              hrel: "http://localhost:3000/users/" + result._id,
            },{
              rel: "self",
              type: 'GET',
              hrel: "http://localhost:3000/users/" + result._id,
            },{
              rel: "self",
              type:'DELETE',
              hrel: "http://localhost:3000/users/" + result._id,
            }]
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err
          });
        });
      } 
    });
});

// get all 
router.get(userPath, function(req,res,next){
  User.find()
  .exec()
  .then(users =>{
    if(users.length === 0){
      return res.status(404).json({ message: userNotFound});
    }
    res.status(200).json({
    // nrOfUsers:users.length, 
     users: users,
    link: {
      rel: "self",
      type: 'POST',
      hrel: 'http://localhost:3000/api/profiles',
    }
    });
  })
  .catch(err => {
    res.status(500).json({
      error: err
    });
  });
});
 
// getting specific 
router.get(specificUserPath, function(req,res,next){
  User.findById({_id: req.params.profileId})
  .exec()
  .then(user =>{
    if(user == null){
      return res.status(404).json({ 'message':userNotFound});
    }
    res.status(200).json({
      // nrOfUsers:users.length, 
      user: user,
      link: {
        rel: "self",
        type: 'DELETE',
        hrel: 'http://localhost:3000/api/profiles/' + user._id,
      }
    });
  })
  .catch(err => {
    res.status(500).json({
      error: err
    })
  });
});

// patch - partial replacement - specific attribute
router.patch(specificUserPath, function(req, res, next) {
  User.findById({_id: req.params.profileId})
  .exec()
  .then(user =>{
    if (user == null) {
      return res.status(404).json({"message": userNotFound});
    }
    user.username = (req.body.username || user.username);
    user.password = (req.body.password || user.password);
    user.question = (req.body.question || user.question);
    user.answer = (req.body.answer || user.answer);
    
    user.save();
    res.status(200).json({
      // nrOfUsers:users.length, 
      updatedUser: user,
      link: {
        rel: "self",
        type: 'GET',
        hrel: 'http://localhost:3000/api/profiles/' + user._id,
      }
    });

  })
  .catch(err => {
    res.status(500).json({
      error: err
    });
  });
});

// deleting specific 

router.delete(specificUserPath, function(req, res, next) {
 // test what happens when we use remove instead of findOneAndDelete
  User.findOneAndDelete({_id: req.params.profileId})
  .exec()
  .then(user =>{
    if (user === null) {
      return res.status(404).json({'message': userNotFound});
    }
    res.status(200 ).json({
      message:'The user has been deleted',
      deleteRecipe: user,
      link: {
        rel: "self",
        type: 'POST',
        hrel: 'http://localhost:3000/api/profiles/',
      }
    });
  })
  .catch(err => {
    res.status(500).json({
      error: err
    });
  });
});

  
module.exports = router;
