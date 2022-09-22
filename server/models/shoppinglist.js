var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var shoppingListSchema = new Schema({
    week:{type: Number},
    year:{type: Number},
    items:{ type: [{
        item: {type:String,
              required: true}, 
        amount: {type: Number},
        unit:{type: String,
             enum:["grams","kg","ml", "dl","l"]}
       }]}


});

 module.exports = mongoose.model('shoppinglists', shoppingListSchema);