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
    item:{ type: {
     item: String, 
     amount: Number, // look into how to use doubles
     lowercase: true // converts to lowercase - only for strings 
     },
    instruction: {type:String},
     }
 });
 module.exports = mongoose.model('recipes', recipeSchema);

 
 