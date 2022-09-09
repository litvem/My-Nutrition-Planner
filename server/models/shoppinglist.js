var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var shoppingListSchema = new Schema({
    weekcalender:{type: Schema.Types.ObjectId, ref:'weekcalender'},  
    shoppingItems:{ type: Schema.Types.ObjectId, ref: 'recipe' }
 });

 module.exports = mongoose.model('shoppinglists', shoppingListSchema);