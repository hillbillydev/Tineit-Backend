var express = require('express');
var router = express.Router();
var passwordHash = require('password-hash');

var Company = require('../models/company');

router.post('/', function (req, res, next) {
    var company = new Company({
        name: req.body.name,
        secret: passwordHash.generate(req.body.secret)
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

module.exports = router;