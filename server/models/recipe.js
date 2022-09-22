var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var recipeSchema = new Schema({
    name: {type:String}, //primary key
    category: {type: String,
               enum: ['Breakfast','Lunch','Dinner','Snack']},
    picture: {type: {
         data: Buffer,
         contentType: String
    }},
    tag: {type:[String]},
    instruction: {type:String},
    items:{ type: [{
     itemId:{type: Number
       // , index: true
    },
     item: {type:String,
            required: true}, 
     amount: {type: Number},
     unit:{type: String,
           enum:["grams","tablespoon","teaspoon","dl", "ml"]}
     }
     //,{ _id: false }
    ]}
 });

// recipeSchema.index({name:1, type: -1});
 module.exports = mongoose.model('recipes', recipeSchema);

 
 