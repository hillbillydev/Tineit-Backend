var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    text: { type: String, required: true },
    company: { type: Schema.Types.ObjectId, ref: 'Company', requird: true }
});

module.exports = mongoose.model('CompanyLetter', schema);