var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var shoppingListSchema = new Schema({
    name:{ type: String},
    items:{ type: [{
        item: {type:String}, 
        amount: {type: Number},
        unit:{type: String}
        }]}
    
 });

 module.exports = mongoose.model('shoppinglists', shoppingListSchema);