var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var shoppingListSchema = new Schema({
    week:{type: Number},
    name:{type:String},
    year:{type: Number},
    items:{ type: [{
      itemId:{type: Number },
        item: {type:String,
              required: true}, 
        amount: {type: Number},
        unit:{type: String,
             enum:["grams","kg","ml", "dl","l","pcs"]}
       }]}


});

 module.exports = mongoose.model('shoppinglists', shoppingListSchema);