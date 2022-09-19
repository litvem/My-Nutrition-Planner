var express = require('express');
var router = express.Router();

var Recipe = require('../models/recipe');
const User = require('../models/user');

var recipesPath = '/api/profiles/:profileId/recipes';
var specificRecipesPath = '/api/profiles/:profileId/recipes/:recipeId';

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
        url: 'http://localhost:3000/api/profiles/'+ user._id +/recipes/ + recipe._id 
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
       link: {
        rel: "Recipe",
        type: "POST",
        url: 'http://localhost:3000/api/profiles/'+ user._id + '/recipes'
      }
    });
  })
  .catch(err => {
    res.status(500).json({
      error: err
    });
  });
});

// Get specific
router.get(specificRecipesPath, function(req,res,next){

  User.findOne({_id:req.params.profileId })
  .populate({path: 'recipes' , match:{_id: {$eq: req.params.recipeId}},})
  .exec()
  .then(user =>{
    if(user === null){
      return res.status(404).json({message: 'User not found'}); 
    }
    if(user.recipes.length === 0){
      return res.status(404).json({message: 'Recipe not found'})
    }
    res.status(200).json({
      recipe: user.recipes,
      links: {
        rel: "self",
        type: "PATCH",
        url: 'http://localhost:3000/api/profiles/'+ user._id +/recipes/ + user.recipes._id 
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
  
  User.findOne({_id:req.params.profileId })
  .then(user=>{
    if(user === null){
      return res.status(404).json({message: 'User not found'}); 
    }else{
      Recipe.findById({_id:req.params.recipeId })
      .then(recipe =>{
        if(recipe === null){
           return res.status(404).json({message: 'Recipe not found'}) 
        }
      
        recipe.name = (req.body.name ||  recipe.name);
        recipe.category = (req.body.category ||  recipe.category);      
        recipe.picture = (req.body.picture || recipe.picture);
        recipe.tag = (req.body.tag ||  recipe.tag);
        recipe.item = (req.body.item ||  recipe.item);
        recipe.instruction = (req.body.instruction ||  recipe.instruction);
    
        recipe.save();

        return res.status(200).json({
          updatedRecipe: recipe,
          links: {
            rel: "self",
            type: "GET",
            url: 'http://localhost:3000/api/profiles/'+ user._id +/recipes/ + recipes._id 
          }
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


// deleting specific
router.delete(specificRecipesPath, function(req, res, next) {
  User.findByIdAndUpdate({_id:req.params.profileId })
  .populate('recipes')
  .exec()
  .then(user =>{
    if(user === null){
      return res.status(404).json({message: "Not found"});
    }else if (user.recipes._id === req.params.recipeId){
      return res.status(404).json({message: "Recipe not found"});
    }else{
      var recipeName = user.recipes
      user.recipes.pull({_id: req.params.recipeId});
      user.save();
      return res.status(200).send({
        message : "The recipe has been deleted",
        recipeName: recipeName,
        link:{
          rel:'recipes',
          type:'POST',
          url:'http://localhost:3000/api/profiles/' + user._id + '/recipes'
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