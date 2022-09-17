var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: { type: String,
        required: true,
        unique: true},
    password: { type: String,
        required: true,},
    question:{type: String,
        required: true},
    answer:{type: String,
        required: true},
    recipes: {type: [Schema.Types.ObjectId], ref: 'recipes'},
    weeklycalender:{type: [Schema.Types.ObjectId], ref:'weeklycalenders'},
    day:{type: [Schema.Types.ObjectId], ref:'day'},
    shoppinglist:{type:[Schema.Types.ObjectId], ref:'shoppinglists'} 
});

// Compile model from schema - makes it available
module.exports = mongoose.model('users', userSchema);