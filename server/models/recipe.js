var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var recipeSchema = new Schema({
      name: {type:String}, //primary key
      category: {type: String,
            enum: ['Breakfast','Lunch','Dinner','Snack']
      },
      recipeImage: {type: String},
      tag: {type:[String]}, // CHANGE TO TAGS
      instruction: {type:String},
      items:{ type: 
            [{
            itemId:{type: Number},
            item: {type:String,
                  required: true
            }, 
            amount: {type: Number},
            unit:{type: String,
            enum:["grams","kg","ml", "dl","l"]}
            }]
      }
 });


 module.exports = mongoose.model('recipes', recipeSchema);

 
 