var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var recipeSchema = new Schema({
  
     name: {type:String}, 
    category: {type: String,
               enum: ['Breakfast','Lunch','Dinner','Snack']},
    picture: {type: {
         data: Buffer,
         contectType: String
    }},
    tag: {type:[String]},
    instruction: {type:String},
    items:{ type: [{
     item: {type:String}, 
     amount: {type: Number},
     unit:{type: String,
           enum:["grams","tablespoon","teaspoon","dl", "ml"]}
     }]
     }
 });
 module.exports = mongoose.model('recipes', recipeSchema);

 
 