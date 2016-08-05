var express = require('express');
var router = express.Router();
var jwt = require('jsonWebToken');

var CompanyLetter = require('../models/companyLetter');
var User = require('../models/user');


router.post('/', function (req, res, next) {
    var decoded = jwt.decode(req.headers.authorization);

    User.findById(decoded.user._id, function (err, doc) {
        if (err) {
            return res.status(404).json({
                title: 'An error occurred',
                error: err
            });
        }

        if (!doc) {
            return res.status(404).json({
                title: 'User not found',
                error: err
            });
        }

        var companyLetter = new CompanyLetter({
            text: req.body.text,
            company: req.body.companyId
        })

        companyLetter.save(function (err, doc) {
            if (err) {
                return res.status(404).json({
                    title: 'An error occurred',
                    error: err
                });
            }

            res.status(200).json({
                title: 'Success',
                obj: doc
            });
        });
    })
});

module.exports = router;