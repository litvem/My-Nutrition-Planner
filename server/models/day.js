var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var daySchema = new Schema({
    name: {type:String},
    recipes:{type: [Schema.Types.ObjectId], ref:'recipes'}
    // restriction 5 recipes in the front end.
});

module.exports = mongoose.model('days',daySchema);