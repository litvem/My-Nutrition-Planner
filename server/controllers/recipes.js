var express = require('express');
var router = express.Router();
const multer = require('multer');
const fs = require('fs');

var Recipe = require('../models/recipe');
const User = require('../models/user');

var recipesPath = '/api/profiles/:profileId/recipes';
var specificRecipesPath = '/api/profiles/:profileId/recipes/:recipeId';
var defaultImagePath = "uploads\\defaultRecipeImage.png-1664301312162.png";
var defaultImage = "http://localhost:3000/uploads/defaultRecipeImage.png-1664301312162.png";

const FILE_TYPE_MAP = {
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg',
    'image/png': 'png'
}

const storage = multer.diskStorage({
  destination: function(req,file,callback){
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error('Invalid image type');
    if(isValid){
      uploadError = null
    }
    callback(null, './uploads/');
  },
  filename: function(req,file,callback){
    const filename = file.originalname.split(' ').join('-');
    const extension = FILE_TYPE_MAP[file.mimetype];
    callback(null, `${filename}-${Date.now()}.${extension}`)
    console.log(file.originalname);
  }
});

const upload = multer({
  storage:storage,
  limits: {
    fileSize: 1024 * 1024 * 10
  }
})


router.post(recipesPath, upload.single('recipeImage'),function(req, res,next) {
  console.log(req.file);
  User.findById(req.params.profileId)
  .exec()
  .then(user =>{
    if(user ==null){
      return res.status(404).json({message:"User not found"});
    }
    if(req.file){
      const fileName =req.file.filename;
      const basePath =`${req.protocol}://${req.get('host')}/uploads/`;

      var recipe = new Recipe({
      name: req.body.name,
      category: req.body.category,
      image: `${basePath}${fileName}`,
      imagePath: req.file.path, 
      tag: req.body.tag,
      instruction: req.body.instruction,
      items:req.body.items
    });

    recipe.save()
    
     res.status(201).json({ 
      recipeCreated: recipe,
      links: {
        rel: "self",
        type: "GET",
        url: 'http://localhost:3000/api/profiles/'+ user._id + '/recipes/'+ recipe._id 
      }
    });

    user.recipes.push(recipe);
    user.save();
    }else{
      var recipe = new Recipe({
        name: req.body.name,
        category: req.body.category,
        image: defaultImage,
        imagePath: req.body.imagePath,
        tag: req.body.tag,
        instruction: req.body.instruction,
        items:req.body.items
      });
  
      recipe.save()
      
      res.status(201).json({ 
        recipeCreated: recipe,
        links: {
          rel: "self",
          type: "GET",
          url: 'http://localhost:3000/api/profiles/'+ user._id + '/recipes/'+ recipe._id 
        }
      });
  
      user.recipes.push(recipe);
      user.save();
    }     
  }) 
  .catch(err => {
    res.status(500).json({
      error: err
    });
  });
});



// get all 
router.get(recipesPath, function(req,res,next){

  var filter = req.query.category;

  User.findOne({_id:req.params.profileId})
  .populate('recipes')
  .then(user => {
    if (!user) {
      return res.status(404).json({
        message: "Not found"
      });
    }
    if(user.recipes.length === 0){
      return res.status(404).json({
        message: "Recipe not found"
      });
    }

    if(filter){
       res.json(user.recipes.filter(document =>{
        return filter === document.category ;
      }));
    }else{
       res.status(200).json({
        recipes: user.recipes,
        link: {
         rel: "Recipe",
         type: "POST",
         url: 'http://localhost:3000/api/profiles/'+ user._id + '/recipes'
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
        url: 'http://localhost:3000/api/profiles/'+ user._id + '/recipes/' + user.recipes._id 
      }
   });
  })
  .catch(err => {
    res.status(500).json({
      error: err
    });
  });  
});

//PATCH -

router.patch(specificRecipesPath, upload.single('recipeImage'), function (req, res, next) {
  User.findById(req.params.profileId)
  .then(user =>{
    if(user === null){
      return res.status(404).json({message: 'User not found'}); 
    }
    if(user.recipes.length === 0){
      return res.status(404).json({message: 'Recipe not found'})
    }
      Recipe.findByIdAndUpdate(req.params.recipeId, req.body, { new: true })
      .then(recipeResult =>{
        if(req.file){
          if(recipeResult.image !== defaultImage){
            fs.unlink(recipeResult.imagePath,(err =>{
              if(err) res.json(err);
              else{
               console.log('Image: ' + recipeResult.imagePath + ' has been deleted.')
              }
            }))
          }

        const fileName =req.file.filename;
        const basePath =`${req.protocol}://${req.get('host')}/uploads/`;
        recipeResult.image = `${basePath}${fileName}`;
        recipeResult.imagePath = req.file.path;
        recipeResult.save();
        }
    
        return res.status(200).json({
        updatedRecipe: recipeResult
        }); 
      })
      .catch(err => {
        res.status(500).json({
        error: err        
        });
      })
  });   
});




// deleting specific
router.delete(specificRecipesPath, function(req, res, next) {
  User.findOne({_id:req.params.profileId})
  .populate({path: 'recipes' , match:{_id: {$eq: req.params.recipeId}},})
  .exec()
  .then(user =>{
    if(user === null){
      return res.status(404).json({message: 'User not found'}); 
    }
    if(user.recipes.length === 0){
      return res.status(404).json({message: 'Recipe not found'})
    }
    user.recipes.pull({_id: req.params.recipeId});
    user.save();

    Recipe.findOneAndDelete({_id: req.params.recipeId})
    .then(recipe =>{
      if(recipe.imagePath !== defaultImagePath){
        fs.unlink(recipe.imagePath,(err =>{
          if(err) res.json(err);
          else{
           console.log('Image: ' + recipe.imagePath + ' has been deleted.')
          }
        }))
      
        return res.status(200).send({
          message : "The recipe has been deleted",
          deletedRecipe: recipe.name,
          deletedImage: 'Image has been deleted.',
          imagePath: recipe.image,
          link:{
            rel:'recipes',
            type:'POST',
            url:'http://localhost:3000/api/profiles/' + user._id + '/recipes'
          }
        });

      }else{
        return res.status(200).send({
          message : "The recipe has been deleted",
          deletedRecipe: recipe.name,
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
  }) 
});

module.exports = router;
