var express = require('express');
var router = express.Router();
var passwordHash = require('password-hash');
var jwt = require('jsonwebtoken');
var randomstring = require('randomstring');

var User = require('../models/user');

router.post('/', function (req, res, next) {
    var user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: passwordHash.generate(req.body.password),
        email: req.body.email
    });

    user.save(function (err, result) {
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

router.post('/signin', function (req, res, next) {

    User.findOne({ email: req.body.email }, function (err, doc) {
        if (err) {
            return res.status(404).json({
                title: 'An error occurred',
                error: err
            });
        }

        if (!doc) {
            return res.status(404).json({
                title: 'No user found',
                error: { message: 'User could not be found' }
            });
        }

        if (!passwordHash.verify(req.body.password, doc.password)) {
            return res.status(404).json({
                title: 'Could not sign you in',
                error: { message: 'Invalid password' }
            });
        }

        var token = jwt.sign({ user: doc }, 'secret', { expiresIn: 7200 });
        res.status(200).json({
            message: 'Success',
            token: token
        });
    })
});

router.get('/apikey', function (req, res, next) {
    var decoded = jwt.decode(req.headers.authorization);

    User.findById(decoded.user._id, function (err, doc) {
        if (err) {
            return res.status(404).json({
                title: 'An error occurred',
                error: err
            });
        }

        if (doc.apiKey !== null) {
            return res.status(304).json({
                title: 'You already have a api key.'
            });
        }

        doc.apiKey = randomstring.generate({
            length: 20,
            charset: 'alphanumeric'
        });

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
    })
});

router.delete('/', function (req, res, next) {
    var decoded = jwt.decode(req.headers.authorization);
    User.findById(decoded.user._id, function (err, doc) {
        if (err) {
            return res.status(404).json({
                title: 'An error occurred',
                error: err
            });
        }

        doc.remove(function (err, doc) {
            if (err) {
                return res.status(404).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            return res.status(200).json({
                title: 'Success',
            });
        });
    });

});

module.exports = router;