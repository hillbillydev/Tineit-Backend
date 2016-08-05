var mongoose = require('mongoose');
var mongooseUniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var User = require('./user');
var Technique = require('./technique');
var Company = require('./company');

var schema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    apiKey: { type: String, unique: true }
});

schema.plugin(mongooseUniqueValidator);

schema.post('remove', function (doc) {
    var deletedUser = doc;
    Technique.find({ 'user': deletedUser._id }).exec(function (err, docs) {
        if (err) {
            return res.status(404).json({
                title: 'An error occurred',
                error: err
            });
        }

        docs.forEach(function (item) {
            item.remove();
        });
    }).then(function () {

        Company.find({ 'user': deletedUser._id }).exec(function (err, docs) {
            if (err) {
                return res.status(404).json({
                    title: 'An error occurred',
                    error: err
                });
            }

            docs.forEach(function (item) {
                item.remove();
            });
        });
    });
});

schema.methods.toJSON = function () {
    var obj = this.toObject()
    delete obj.password
    return obj
}

module.exports = mongoose.model('User', schema);