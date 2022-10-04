var express = require('express');
var router = express.Router();

var Shoppinglist = require('../models/shoppinglist');
const User = require('../models/user');
const checkAuth = require('../middleware/check-auth');

var shoppinglistsPath = '/api/profiles/:profileId/shoppinglists';
var specificShoppinglistsPath = '/api/profiles/:profileId/shoppinglists/:shoplistId';

router.post(shoppinglistsPath, checkAuth, function(req, res,next) {
  User.findById(req.params.profileId)
  .exec()
  .then(user =>{
    if(user ==null){
      return res.status(404).json({message:"User not found"});
    }
    var shoppinglist = new Shoppinglist(req.body);
    shoppinglist.save()
    
    res.status(201).json({ 
      shoppinglistCreated: shoppinglist,
      links: {
        rel: "self",
        type: "GET",
        url: 'http://localhost:3000/api/profiles/'+ user._id + '/shoppinglist/' + shoppinglist._id 
      }
    });

    user.shoppinglists.push(shoppinglist);
    user.save();
      
  }) 
  .catch(err => {
    res.status(500).json({
      error: err
    });
  });
});


// get all 
router.get(shoppinglistsPath, checkAuth, function(req,res,next){
  User.findById({_id:req.params.profileId})
  .populate('shoppinglists')
  .then(user => {
    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }else if(user.shoppinglists.length === 0){
      return res.status(404).json({
        message: "Shoppinglist not found"
      });
    }else{
      return res.status(200).json({
        shoppinglists: user.shoppinglists,
        link: {
         rel: "Shoppinglist",
         type: "POST",
         url: 'http://localhost:3000/api/profiles/'+ user._id + '/shoppinglist'
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

// Get specific - for patch copy and add. 
router.get(specificShoppinglistsPath, checkAuth, function(req,res,next){

  User.findOne({_id:req.params.profileId })
  .populate({path: 'shoppinglists' , match:{_id: {$eq: req.params.shoplistId}},})
  .exec()
  .then(user =>{
    if(user === null){
      return res.status(404).json({message: 'User not found'}); 
    }
    if(user.shoppinglists.length === 0){
      return res.status(404).json({message: 'Shoppinglist not found'})
    }

    res.status(200).json({
      shoppinglist: user.shoppinglists,
      links: {
        rel: "self",
        type: "PATCH",
        url: 'http://localhost:3000/api/profiles/'+ user._id + '/shoppinglists/' + user.shoppinglists._id 
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
router.patch(specificShoppinglistsPath, checkAuth, function (req, res, next) {
  User.findById(req.params.profileId)
  .then(user =>{
    if(user === null){
      return res.status(404).json({message: 'User not found'}); 
    }
    if(user.shoppinglists.length === 0){
      return res.status(404).json({message: 'Shoppinglist not found'})
    }

    Shoppinglist.findByIdAndUpdate(req.params.shoplistId, req.body, { new: true })
    .then(shoppinglists =>{
      return res.status(200).json({
        updatedShoppinglist: shoppinglists
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
router.delete(specificShoppinglistsPath, checkAuth, function(req, res, next) {
  User.findOne({_id:req.params.profileId})
  .populate({path: 'shoppinglists' , match:{_id: {$eq: req.params.shoplistId}},})
  .exec()
  .then(user =>{
    if(user === null){
      return res.status(404).json({message: 'User not found'}); 
    }
    if(user.shoppinglists.length === 0){
      return res.status(404).json({message: 'Shoppinglist not found'})
    }
    user.shoppinglists.pull({_id: req.params.shoplistId});
    user.save();

    Shoppinglist.findOneAndDelete({_id: req.params.shoplistId})
    .then(shoppinglist =>{
      console.log(shoppinglist);
      return res.status(200).send({
        message : "The shoppinglist for week "+ shoppinglist.week +" has been deleted",
        link:{
          rel:'Shoppinglists',
          type:'POST',
          url:'http://localhost:3000/api/profiles/' + user._id + '/shoppinglists'
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