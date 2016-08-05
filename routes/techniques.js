var express = require('express');
var router = express.Router();
var jwt = require('jsonWebToken');

var Technique = require('../models/technique');
var User = require('../models/user');

router.post('/', function (req, res, next) {
    var decoded = jwt.decode(req.headers.authorization);

    if (!decoded) {
        return res.status(401).json({
            title: 'Not Authorized'
        })
    }

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

module.exports = router;