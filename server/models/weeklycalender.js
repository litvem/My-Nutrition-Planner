var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var weeklycalenderSchema = new Schema({
    week: {type: Number},
    year:{type: Number},
    day:{type: [Schema.Types.ObjectId], ref:'day'}
    // restriction 5 recipes in the front end.
});

module.exports = mongoose.model('weeklycalenders',weeklycalenderSchema);