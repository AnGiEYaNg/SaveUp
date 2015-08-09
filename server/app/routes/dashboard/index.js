'use strict';
var router = require('express').Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = router;

router.put('/', function (req, res, next) {
  console.log('inside the put route req.body', req.body)
  console.log('req.user', req.user)
  console.log('req.user._id', req.user._id)
  User.findByIdAndUpdate(req.user._id, req.body).exec()
  .then(function (user) {
    console.log('user in the route', user)
    res.send(user);
  })
});