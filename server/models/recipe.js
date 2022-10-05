var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var recipeSchema = new Schema({
    _id:{type: String},
    name: {type:String}, 
    category: {type: String,
               enum: ['Breakfast','Lunch','Dinner','Snack']},
    picture: {type: {
         data: Buffer,
         contentType: String
    }},
    pictureURL: {type:String},
    instruction: {type:String},
    items:{ type: [{
     _id:{type: Number},
     item: {type:String}, 
     amount: {type: Number},
     unit:{type: String,
           enum:["grams","tablespoon","teaspoon","dl", "ml"]}
     }]
    }
 });
 module.exports = mongoose.model('recipes', recipeSchema);

 
 