'use strict';
var mongoose = require('mongoose');
var UserModel = mongoose.model('User');
var paypalInfo = require('./paypalInfo');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var paypal = require('paypal-rest-sdk');
// var _ = require('lodash');

var router = require('express').Router();
module.exports = router;

var ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).end();
    }
};

var paypalApiRoot = 'api.sandbox.paypal.com';

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': paypalInfo.ClientId,
  'client_secret': paypalInfo.Secret
});

// api/paypal/transaction/finished
router.get('/transaction/finished', function (req, res) {
	console.log('hi from transaction finished');
	res.end();
});
