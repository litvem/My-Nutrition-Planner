var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// user? has a profile --> weekcalender, shoppinglist, 


var profileSchema = new Schema({
    username: { type: String,
    required: true},
    password: { type: String,
        required: true},
    email: {type: String,
        required: true},
    question:{type: String,
        required: true},
    answer:{type: String,
        required: true}

});

// Compile model from schema - makes it available
module.exports = mongoose.model('profiles', profileSchema);