var express = require('express');
var router = express.Router();

var Recipe = require('../models/recipe');

router.post('/api/recipes',function(req, res,next) {
    var recipe = new Recipe(req.body);
    recipe.save(function(err,recipe){
        if(err) {return next(err);}
    res.status(201).json(recipe);    
  });
});

// get all 
router.get('/api/recipes', function(req,res,next){
    Recipe.find(function(err,recipes){
      res.json({'recipes:': recipes});
    })
  });
  
  // getting specific 
  router.get('/api/recipes/:id', function(req,res,next){
    var id = req.params.id;
    Recipe.findById(id,function(err,recipe){
        if(err){return next(err);}
        if(recipe == null){
          return res.status(404).json({ 'message':'Recipe not found'});
        }
        res.json(recipe)
    });
  });
  
//put - replaces an existing resource on the server
router.put('/api/recipes/:id',function(req, res, next) {
  var id = req.params.id;
  Recipe.findById(id, function(err, recipe) {
      if (err) { return next(err); }
      if (recipe == null) {
          return res.status(404).json({"message": "Recipe not found"});
      }
      recipe.name = req.body.name;
      recipe.category = req.body.category;
      recipe.picture = req.body.picture;
      recipe.tag = req.body.tag;
      recipe.item = req.body.item;
      recipe.instruction = req.body.instruction;

      recipe.save();
      res.status(200).json(recipe);
  });
});

// patch - partial replacement - specific attribute
router.patch('/api/recipes/:id', function(req, res, next) {
  var id = req.params.id;
  Recipe.findById(id, function(err, recipe) {
      if (err) { return next(err); }
      if (recipe == null) {
          return res.status(404).json({"message": "Recipe not found"});
      }
      recipe.name = (req.body.name || recipe.name);
      recipe.category = (req.body.category || recipe.category);
      recipe.picture = (req.body.picture || recipe.picture);
      recipe.tag = (req.body.tag || recipe.tag);
      recipe.item = (req.body.item || recipe.item);
      recipe.instruction = (req.body.instruction || recipe.instruction);
      
      recipe.save();
      res.status(200).json(recipe);
  });
});


  // deleting specific 
  router.delete('/api/recipes/:id', function(req, res, next) {
    var id = req.params.id;
    Recipe.findOneAndDelete({_id: id}, function(err, recipe) {
        if (err) { return next(err); }
        if (recipe === null) {
            return res.status(404).json({'message': 'Recipe not found'});
        }
        res.json(recipe);
    });
});

  
  module.exports = router;