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

router.delete('/:id', function (req, res, next) {
    var decoded = jwt.decode(req.headers.authorization);

    CompanyLetter.findById(req.params.id, function (err, doc) {
        if (err) {
            return res.status(404).json({
                title: 'An error occurred',
                error: err
            });
        }

        if (!doc) {
            return res.status(404).json({
                title: 'No companyLetter found',
                error: { message: 'CompanyLetter could not be found' }
            });
        }

        if (doc.user != decoded.user._id) {
            return res.status(401).json({
                title: 'Not Authorized',
                error: { message: 'Companyletter was created by other user' }
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

router.patch('/:id', function (req, res, next) {
    var decoded = jwt.decode(req.headers.authorization);

    CompanyLetter.findById(req.params.id, function (err, doc) {
        if (err) {
            return res.status(404).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!doc) {
            return res.status(404).json({
                title: 'No company letter found',
                error: { message: 'CompanyLetter could not be found' }
            });
        }

        if (doc.user != decoded.user._id) {
            return res.status(401).json({
                title: 'Not Authorized',
                error: { message: 'Companyletter created by other user' }
            });
        }

        doc.text = req.body.text;
        doc.save(function (err, result) {
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
        });
    });
});

module.exports = router;