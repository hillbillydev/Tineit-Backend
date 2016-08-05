var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var scheme = new Schema({
    name: { type: String, requried: true, unique: true },
    percentage: { type: Number, requried: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});


module.exports = mongoose.model('Technique', scheme);