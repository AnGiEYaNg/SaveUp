'use strict';
var mongoose = require('mongoose');
var UserModel = mongoose.model('User');
// var _ = require('lodash');
var braintreeInfo = require('./braintreeInfo');
var braintree = require('braintree');
var util = require('util');

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var router = require('express').Router();
module.exports = router;

var ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).end();
    }
};

//Enable CORS
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var gateway = braintree.connect({
    environment:  braintree.Environment.Sandbox,
    merchantId:   braintreeInfo.merchantId,
    publicKey:    braintreeInfo.publicKey,
    privateKey:   braintreeInfo.privateKey
});

//api/braintree/test
router.get('/test', function (req, res) {
	console.log('in braintree test\n');
	res.end();
});

//api/braintree/token
router.post('/token', function (request, response) {

  gateway.clientToken.generate({}, function (err, res) {
    
    if (err) throw err;
    console.log('token', res.clientToken);
    response.json({
      "client_token": res.clientToken
    });
  });
});

router.post('/process', jsonParser, function (request, response) {
  var transaction = request.body;

  gateway.transaction.sale({
    amount: transaction.amount,
    paymentMethodNonce: transaction.payment_method_nonce
  }, function (err, result) {
    if (err) throw err;
    console.log(util.inspect(result));
    response.json(result);
  });
});
