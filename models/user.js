var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
});

var mongooseUniqueValidator = require('mongoose-unique-validator');

schema.plugin(mongooseUniqueValidator);

schema.methods.toJSON = function () {
    var obj = this.toObject()
    delete obj.password
    return obj
}

module.exports = mongoose.model('User',  schema);