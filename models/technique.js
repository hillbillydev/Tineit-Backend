var mongoose = require('mongoose');
var mongooseUniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var scheme = new Schema({
    name: { type: String, requried: true, unique: true },
    percentage: { type: Number, requried: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', requird: true }
});

scheme.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Technique', scheme);