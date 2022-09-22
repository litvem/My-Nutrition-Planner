var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    _id:{type: String},
    password: { type: String,
        required: true},
    question:{type: String,
        required: true}, 
    answer:{type: String,
        required: true},
    recipes: {type: [Schema.Types.ObjectId], ref: 'recipes'},
    weeklycalenders:{type: [Schema.Types.ObjectId], ref:'weeklycalenders'},
    days:{type: [Schema.Types.ObjectId], ref:'days'},
    shoppinglists:{type:[Schema.Types.ObjectId], ref:'shoppinglists'} 
});

// Compile model from schema - makes it available
module.exports = mongoose.model('users', userSchema);