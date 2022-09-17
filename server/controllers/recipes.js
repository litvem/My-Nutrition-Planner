var express = require('express');
var router = express.Router();

var Recipe = require('../models/recipe');
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
    console.log( "created" + recipe);
    recipe.save()
    .then(recipe =>{
      user.recipes.push(recipe);
    user.save();
    console.log("Recipe: " + recipe.name + " has been added to user: " + user.username)
    res.status(201).json({ 
      recipeCreated: recipe,
      links: {
        type: "GET",
        url: recipesPath + recipe._id
      } });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
  })
});

/*
User.findById(req.params.profileId, function(err,user){
    if(user ==null){
      return res.status(404).json({message:"User not found"});
    }

    var recipe = new Recipe(req.body);
    console.log( "created" + recipe);
    recipe.save(function (err){
      if(err){
        return res.status(500);
      }
      console.log("Recipe" + recipe.name + "created");
    });
    user.recipes.push(recipe);
    user.save();
    console.log("Recipe: " + recipe.name + " has been added to user: " + user.username)
    res.status(201).json({ 
      recipeCreated: recipe,
      links: {
        type: "GET",
        url: recipesPath + recipe._id
      } });
  });
*/


// get all 
router.get(recipesPath, function(req,res,next){
  User.findById({_id:req.params.profileId})
  .select('recipes')
  .populate('recipes')
  .then(user => {
    if (!user.recipes) {
      return res.status(404).json({
        message: "Recipe not found"
      });
    }
    res.status(200).json({
       recipes: recipes.recipes,
      request: {
        type: "GET",
        url: "http://localhost:3000/recipes"
      }
    });
  })
  .catch(err => {
    res.status(500).json({
      error: err
    });
  });
});

// getting specific - NOT WORKING YET -gettinf 
router.get(specificRecipesPath, function(req,res,next){
  User.find({_id: req.params.profileId})
  .populate('recipes',{
    match_:{_id: {$eq: req.params.recipeId}},
  })
  .exec()
  .then(user =>{
    if(user === null || recipe === null){
      return res.status(404).json({"message": 'Not found'}); 
    }
    console.log(user.recipe);
    res.status(200).json({
      recipes: user.recipes,
    request: {
       type: "GET",
       url: "http://localhost:3000/recipes"
    }
   });
  })
  .catch(err => {
    res.status(500).json({
      error: err
    });
  });  
});

// patch - partial replacement - NOT DONE YET
router.patch(specificRecipesPath, function(req, res, next) {
  User.find({_id: req.params.profileId})
  .populate('recipes',{
    match_:{_id: {$eq: req.params.recipeId}},
  })
  .exec()
  .then(user =>{
    if(user === null || recipe === null){
      return res.status(404).json({"message": 'Not found'}); 
    }
    user.recipes.name = (req.body.name ||  user.recipes.name);
    user.recipes.category = (req.body.category ||  user.recipes.category);      recipe.picture = (req.body.picture || recipe.picture);
    user.recipes.tag = (req.body.tag ||  user.recipes.tag);
    user.recipe.item = (req.body.item ||  user.recipes.item);
    user.recipes.instruction = (req.body.instruction ||  user.recipes.instruction);
    user.recipes.save();
  
    res.status(200).json({
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


// deleting specific - NOT DEL 
router.delete(specificRecipesPath, function(req, res, next) {
  User.findByIdAndUpdate({_id: req.params.profileId})
  .populate('recipes')
  .exec()
  .then(user =>{
    if(user === null || user.recipes === null ){
      return res.status(404).json({message: "Not found"});
    }
    user.recipes.pull({_id: req.params.recipeId});
    user.save();
    res.status(200).send({
      recipes : user.recipes,
      links:{
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

module.exports = router;