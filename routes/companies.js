var express = require('express');
var router = express.Router();
var passwordHash = require('password-hash');
var jwt = require('jsonWebToken');

var Company = require('../models/company');
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
        var company = new Company({
            name: req.body.name,
            secret: req.body.secret,
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

router.get('/', function (req, res, next) {
    var decoded = jwt.decode(req.headers.authorization);

    Company.find({ 'user': decoded.user._id }).exec(function (err, docs) {
        if (err) {
            return res.status(400).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(200).json({
            message: 'Success',
            obj: docs
        });
    });
});

router.delete('/:id', function (req, res, next) {
    var decoded = jwt.decode(req.headers.authorization);

    Company.findById(req.params.id, function (err, doc) {
        if (err) {
            return res.status(404).json({
                title: 'An error occurred',
                error: err
            });
        }

        if (!doc) {
            return res.status(404).json({
                title: 'No company found',
                error: { message: 'Company could not be found' }
            });
        }

        if (doc.user != decoded.user._id) {
            return res.status(401).json({
                title: 'Not Authorized',
                error: { message: 'Company created by other user' }
            });
        }

        doc.remove(function (err, result) {
            if (err) {
                return res.status(404).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: result
            });
        })
    });
});

module.exports = router;