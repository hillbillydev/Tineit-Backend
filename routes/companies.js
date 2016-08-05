var express = require('express');
var router = express.Router();
var passwordHash = require('password-hash');

var Company = require('../models/company');
var User = require('../models/user');

router.post('/', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);

    User.findById(decoded.user._id, function (err, doc) {
        if (err) {
            return res.status(404).json({
                title: 'An error occurred',
                error: err
            });
        }

        var company = new Company({
            name: req.body.name,
            secret: passwordHash.generate(req.body.secret),
            user: doc
        });
        company.save(function (err, result) {
            if (err) {
                return res.status(404).json({
                    title: 'An error occured',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: result
            })
        });
    });
});

module.exports = router;