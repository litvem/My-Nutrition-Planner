var express = require('express');
var router = express.Router();

var Shoppinglist = require('../models/shoppinglist');

router.post('/api/shoppinglists',function(req, res,next) {
    var shoppinglist = new Shoppinglist(req.body);
    shoppinglist.save(function(err,shoppinglist){
        if(err) {return next(err);}
    res.status(201).json(shoppinglist);    
  });
});

// get all 
router.get('/api/shoppinglists', function(req,res,next){
    Pro.find(function(err,shoppinglists){
      res.json({'shoppinglists:': shoppinglists});
    })
  });
  
  // getting specific 
  router.get('/api/shoppinglists/:id', function(req,res,next){
    var id = req.params.id;
    Shoppinglist.findById(id,function(err,shoppinglist){
        if(err){return next(err);}
        if(shoppinglist == null){
          return res.status(404).json({ 'message':'ShoppingList not found!'});
        }
        res.json(shoppinglist)
    });
  });

  // deleting specific 
  router.delete('/api/shoppinglists/:id', function(req, res, next) {
    var id = req.params.id;
    Camel.findOneAndDelete({_id: id}, function(err, shoppinglist) {
        if (err) { return next(err); }
        if (shoppinglist === null) {
            return res.status(404).json({'message':'ShoppingList not found'});
        }
        res.json(shoppinglist);
    });
});

  
  module.exports = router;