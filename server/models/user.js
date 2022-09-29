var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
   _id:{type: String},
    password: { type: String,
        required: true,},
    recipes: {type: [Schema.Types.ObjectId], ref: 'recipes'},
    weeklycalender:{type: [Schema.Types.ObjectId], ref:'weeklycalenders'},
    day:{type: [Schema.Types.ObjectId], ref:'day'},
    shoppinglist:{type:[Schema.Types.ObjectId], ref:'shoppinglists'} 
});

// Compile model from schema - makes it available
module.exports = mongoose.model('users', userSchema);