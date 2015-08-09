'use strict';
var router = require('express').Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = router;

router.put('/', function (req, res, next) {
  UserModel.findByIdAndUpdate(req.user._id, req.body).exec()
  .then(function (user) {
    res.send(user);
  })
});