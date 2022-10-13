var express = require('express');
const mongoose = require("mongoose");
var router = express.Router();
const fs = require('fs');
const multer = require('multer');

var User = require('../models/user');
var Recipe = require('../models/recipe');
var Day = require('../models/day');
var Shoppinglist = require('../models/shoppinglist');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');

const userPath = '/api/profiles';
const specificUserPath = '/api/profiles/:profileId';
const userNotFound = "User not found";

router.post('/api/profiles/signup',function(req, res,next) {
  User.find({ username: req.body.username })
    .exec()
    .then(username => {
      if (username.length >= 1) {
        return res.status(409).json({
          message: "Username already exists"
        });
      } else {

        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
          const user = new User({
          username: req.body.username,
          password: hash
        });

          user.save()
          .then(newUser => {
            res.status(201).json({
              userCreated: newUser,
              links: [{
                rel: "self",
                type: 'PATCH',
                hrel: "http://localhost:3000/users/" + newUser._id,
              },{
                rel: "self",
                type: 'GET',
                hrel: "http://localhost:3000/users/" + newUser._id,
              },{
                rel: "self",
                type:'DELETE',
                hrel: "http://localhost:3000/users/" + newUser._id,
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
    }
  });
});

router.post("/api/profiles/login", (req, res, next) => {
  User.findOne({ username: req.body.username })
    .exec()
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Authentication failed"
        });
      }
      bcrypt.compare(req.body.password, user.password, (err, loginUser) => {
        if (err) {
          return res.status(401).json({
            message: "Authentication failed"
          });
        }
        if (loginUser) {
          const token = jwt.sign(
            {
              username: user.username,
              userId: user._id
            },
            process.env.JWT_KEY,
            {
                expiresIn: "1h"
            }
          );
          return res.status(200).json({
            message: "Authentication successful",
            token: token,
            id:user.id
          });
        }
        res.status(401).json({
          message: "Authentication failed"
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});


// get all -- not needed in project but for testing purpose
router.get(userPath, function(req,res,next){
  User.find()
  .exec()
  .then(users =>{
    if(users.length === 0){
      return res.status(404).json({ message: userNotFound});
    }
    res.status(200).json({
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
router.get(specificUserPath, checkAuth, function(req,res,next){
  User.findById({_id: req.params.profileId})
  .exec()
  .then(user =>{
    
    res.status(200).json({
      // nrOfUsers:users.length, 
      username: user.username,
      userId: user._id,
      recipes:user.recipes,
      shoppinglists: user.shoppinglists,
      days: user.days,

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

//put
router.put(specificUserPath, checkAuth, function(req, res, next) {
  User.findById({_id: req.params.profileId})
  .exec()
  .then(user =>{
    console.log(user)
    bcrypt.hash(req.body.password, 10, (err, hashPassword) => {
      if (err) {
        return res.status(500).json({
          error: err
        });
      } else {
        user.username = req.body.username;
        user.password = hashPassword;
        user.save();

      }
    });
    user.save();

      const token = jwt.sign(
        {
          username: req.body.username,
          userId: user._id
        },
        process.env.JWT_KEY,
        {
            expiresIn: "1h"
        }
      );

      res.status(200).json({
        token: token, 
        message: 'Password has ben updated',
        id: user.id,
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
  


// patch - partial replacement - specific attribute
router.patch(specificUserPath, checkAuth, function(req, res, next) {
 
  User.findById({_id: req.params.profileId})
  .exec()
  .then(user =>{
    if(user === null){
      return res.status(401).json({'message': userNotFound});   
    }
     User.find({ username: req.body.username })
    .exec()
    .then(username => {
      if (username.length >= 1) {
        return res.status(409).json({
          message: "Username already exists"
        });
      } else {
        user.username = req.body.username;
        user.save();
        const token = jwt.sign(
          {
            username: req.body.username,
            userId: user._id
          },
          process.env.JWT_KEY,
          {
              expiresIn: "1h"
          }
        );
        
        res.status(200).json({
          token: token, 
          updatedUser: user,
          link: {
            rel: "self",
            type: 'GET',
            hrel: 'http://localhost:3000/api/profiles/' + user._id,
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
  
});

router.delete(specificUserPath,checkAuth, function(req, res, next) {
  User.findOneAndDelete({_id: req.params.profileId})
  .populate('recipes')
  .exec()
  .then(user =>{
    if (user === null) {
      return res.status(401).json({'message': userNotFound});
    }
    var defaultImagePath = "uploads\\defaultRecipeImage.png-1664301312162.png";
    user.recipes.forEach(recipe => {
      if(recipe.imagePath !== defaultImagePath){
        fs.unlink(recipe.imagePath,(err =>{
          if(err) res.json(err);
          else{
           console.log('Image: ' + recipe.imagePath + ' has been deleted.')
          }
        }))
      }  
    })

    Recipe.deleteMany( {"_id":{$in: user.recipes}  }, function(err){
      if(err) return next(err);
    });
    
    Day.deleteMany({ "_id":{ $in: user.days} }, function(err){
      if(err) return next(err);
    });

    Shoppinglist.deleteMany({ "_id":{ $in: user.shoppinglists }  }, function(err){
      if(err) return next(err);
    });

    return res.status(200).json({
      message:'The user has been deleted',
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