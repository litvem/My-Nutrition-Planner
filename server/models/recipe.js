var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var recipeSchema = new Schema({
      name: {type:String}, 
      category: {type: String,
            enum: ['Breakfast','Lunch','Dinner','Snack']
      },
      image:{type: String},
      imagePath: {type: String},
      tag: {type:[String]}, 
      instruction: {type:String},
      items:{ type: 
            [{
            itemId:{type: Number},
            item: {type:String,
                  required: true
            }, 
            amount: {type: Number},
            unit:{type: String,
            enum:["grams","kg","ml", "dl","l","pcs"]}
            }]
      },
      userID:{type: String}
 });


 module.exports = mongoose.model('recipes', recipeSchema);

 
 