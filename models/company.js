var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name: { type: String, required: true },
    secret: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', requird: true }
});

module.exports = mongoose.model('Company', schema);