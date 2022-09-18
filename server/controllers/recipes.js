var express = require('express');
var router = express.Router();

var Recipe = require('../models/recipe');
const user = require('../models/user');
const User = require('../models/user');

var recipesPath = '/api/profiles/:profileId/recipes';
var specificRecipesPath = '/api/profiles/:profileId/recipes/:recipeId';

const recipeNotFound = "User not found";

router.post(recipesPath,function(req, res,next) {
  User.findById(req.params.profileId)
  .exec()
  .then(user =>{
    if(user ==null){
      return res.status(404).json({message:"User not found"});
    }
    var recipe = new Recipe(req.body);
    recipe.save()
    
    res.status(201).json({ 
      recipeCreated: recipe,
      links: {
        rel: "self",
        type: "GET",
        url: recipesPath + recipe._id
      }
    });

    user.recipes.push(recipe);
    user.save();
      
  }) 
  .catch(err => {
    res.status(500).json({
      error: err
    });
  });
});

// get all 
router.get(recipesPath, function(req,res,next){
  User.findById({_id:req.params.profileId})
  .populate('recipes')
  .then(user => {
    if (!user) {
      return res.status(404).json({
        message: "Not found"
      });
    }
    res.status(200).json({
       recipes: user.recipes,
      request: {
        rel: "Recipe",
        type: "POST",
        url: recipesPath
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
/*
router.get('/api/profiles/:profileId/recipes/:recipeId', function(req,res,next){

  User.findOne({_id:req.params.profileId })
  .populate({
    path: "recipies" , match_:{_id: {$eq: req.params.recipeId}},
  })
  .exec(function(err, user){
      if(err){
        return res.status(500).send(err);
      }
      if(user === null|| recipes === null){
        return res.status(404).json({message: 'Not found'}); 
      }

      return res.status(200).send(user)
  });  
});
*/



router.get('/api/profiles/:profileId/recipes/:recipeId', function(req,res,next){

  User.findOne({_id:req.params.profileId })
  .populate({path: 'recipes' , match:{_id: {$eq: req.params.recipeId}},})
  .exec()
  .then(user =>{
    if(user === null){
      return res.status(404).json({message: 'Not found'}); 
    }
    res.status(200).send(user.recipes)
  })
  .catch(err => {
    res.status(500).json({
      error: err
    });
  });  
});


// patch - partial replacement - NOT DONE YET
router.patch(specificRecipesPath, function(req, res, next) {
  
  User.findOne({_id:req.params.profileId })
  .populate({path: 'recipes' , match:{_id: {$eq: req.params.recipeId}},})
  .exec()
  .then(user =>{
    if(user === null){
      return res.status(404).json({message: 'Not found'}); 
    }
    user.recipes.name = (req.body.name ||  user.recipes.name);
    user.recipes.category = (req.body.category ||  user.recipes.category);      recipe.picture = (req.body.picture || recipe.picture);
    user.recipes.tag = (req.body.tag ||  user.recipes.tag);
    user.recipe.item = (req.body.item ||  user.recipes.item);
    user.recipes.instruction = (req.body.instruction ||  user.recipes.instruction);
    user.recipes.save();
    return res.status(200).json({
      updatedRecipes: user.recipes,
    request: {
      rel: 'self',
       type: "GET",
       url: recipesPath
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
router.delete(specificRecipesPath, function(req, res, next) {
  User.findByIdAndUpdate({_id:req.params.profileId })
  .populate('recipes')
  .exec()
  .then(user =>{
    if(user === null || user.recipes._id === req.params.recipeId ){
      return res.status(404).json({message: "Not found"});
    }else{
      user.recipes.pull({_id: req.params.recipeId});
      user.save();
      return res.status(200).send({
        message : "The recipe has been deleted",
        recipe: user.recipes._id,
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