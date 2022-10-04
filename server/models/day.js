var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var daySchema = new Schema({
    name: { type: String ,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']},
    week: { type: Number },
    year: { type: Number },
    recipes:{ type: [Schema.Types.ObjectId], ref:'recipes'}
    // restriction 5 recipes in the front end.
});

module.exports = mongoose.model('days',daySchema);
