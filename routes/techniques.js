var express = require('express');
var router = express.Router();
var jwt = require('jsonWebToken');

var Technique = require('../models/technique');
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

        var technique = new Technique({
            name: req.body.name,
            percentage: req.body.percentage,
            user: doc
        });

        technique.save(function (err, doc) {
            if (err) {
                return res.status(404).json({
                    title: 'An error occured',
                    error: err
                });
            }
            return res.status(200).json({
                message: 'Success',
                obj: doc
            });
        });
    })
});

router.get('/', function (req, res, next) {
    var decoded = jwt.decode(req.headers.authorization);

    Technique.find({ 'user': decoded.user._id }).exec(function (err, docs) {
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
    })
});

router.patch('/:id', function (req, res, next) {
    var decoded = jwt.decode(req.headers.authorization);

    Technique.findById(req.params.id, function (err, doc) {
        if (err) {
            return res.status(404).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!doc) {
            return res.status(404).json({
                title: 'No technique found',
                error: { message: 'Technique could not be found' }
            });
        }

        if (doc.user != decoded.user._id) {
            return res.status(401).json({
                title: 'Not Authorized',
                error: { message: 'Technique created by other user' }
            });
        }

        doc.percentage = req.body.percentage;
        doc.name = req.body.name;
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