var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var shoppingListSchema = new Schema({
<<<<<<< HEAD
    week:{type: Number},
    year:{type: Number},
    items:{ type: [{
      itemId:{type: Number },
        item: {type:String,
              required: true}, 
        amount: {type: Number},
        unit:{type: String,
             enum:["grams","kg","ml", "dl","l"]}
       }]}


});
=======
    name:{ type: String},
    items:{ type: [{
        item: {type:String}, 
        amount: {type: Number},
        unit:{type: String}
        }]}
    
 });
>>>>>>> gabi-front-end

 module.exports = mongoose.model('shoppinglists', shoppingListSchema);