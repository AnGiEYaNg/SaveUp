'use strict';
var mongoose = require('mongoose');
var UserModel = mongoose.model('User');
var paypalInfo = require('./paypalInfo');
var bodyParser = require('body-parser');
// var jsonParser = bodyParser.json();
var paypal = require('paypal-rest-sdk');
var request = require('request');

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

var paypalApiRoot = 'https://api.sandbox.paypal.com';
var ourReturnUrl = "http://127.0.0.1:1337/api/paypal/transaction/finished";
var ourCancelUrl = "http://127.0.0.1:1337/api/paypal/transaction/cancelled";

var getPaypalToken = function () {
  var target = '/v1/oauth2/token';
  var tokenRoute = paypalApiRoot + target;



  // var options = {
  //   method: 'POST',
  //   url: tokenRoute,
  //   headers: {
  //     'User-Agent': 'request'
  //   }
  // };

  // var data = {
  //   grant_type: 'client_credentials'
  // };

  // function callback(error, response, body) {
  //   if (!error && response.statusCode == 200) {
  //     var info = JSON.parse(body);
  //     console.log(info.stargazers_count + " Stars");
  //     console.log(info.forks_count + " Forks");
  //   }
  // }

};

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': paypalInfo.ClientId,
  'client_secret': paypalInfo.Secret
});

var currentPayment;

router.get('/test', function (req, res) {

  console.log('hit api/paypal/transaction/test');


  var paypalPayment = {
      "intent": "sale",
      "payer": {
          "payment_method": "paypal"
      },
      "redirect_urls": {
        "return_url": ourReturnUrl,
        "cancel_url": ourCancelUrl
      },
      "transactions": [{
        "amount": {
          "currency": "USD",
          "total": 10
        }
      }]
  };
  
  paypal.payment.create(paypalPayment, {}, function (err, resp) {
    if (err) throw err;
    currentPayment = resp;

    res.json(resp);
  });

  // var card_data = {
  //   "type": "visa",
  //   "number": "4417119669820331",
  //   "expire_month": "11",
  //   "expire_year": "2018",
  //   "cvv2": "123",
  //   "first_name": "Joe",
  //   "last_name": "Shopper"
  // };

  // paypal.creditCard.create(card_data, function (error, credit_card){
  //   if (error) {
  //     console.log(error);
  //     throw error;
  //   } else {
  //     console.log("Create Credit-Card Response");
  //     console.log(credit_card);
  //     res.json(credit_card);
  //   }
  // });

});

// api/paypal/transaction/finished
router.get('/transaction/finished', function (req, res) {
  //PayerID paymentId, token
  var approvedTransaction = req.query;
  var payer = { payer_id : approvedTransaction.PayerID };

  paypal.payment.execute(approvedTransaction.paymentId, payer, {}, function (err, resp) {

    var transactionForSave = {
      date: new Date(resp.create_time),
      amount: resp.transactions[0].amount.details.subtotal
    };

    UserModel.findById(req.user._id)
    .exec()
    .then(function (foundUser) {

      foundUser.goals.plan.paymentsSoFar.push(transactionForSave);
      foundUser.save(function (err) {
        if (err) throw err;
        res.json(resp);
      });
    })
    .then(null, function (err) {
      console.log(err);
      throw err;
    });

  });
});

// api/paypal/transaction/cancelled
router.get('/transaction/cancelled', function (req, res) {
  console.log('hi from transaction cancelled\n', Object.keys(res));
  res.json(res);
});
