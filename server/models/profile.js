var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var profileSchema = new Schema({
    username: { type: String },
    password: { type: String },
    email: {type: String},
    question:{type: String},
    answer:{type: String}

});

// Compile model from schema - makes it available
module.exports = mongoose.model('profiles', profileSchema);