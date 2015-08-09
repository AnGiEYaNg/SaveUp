'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/members', require('./members'));
router.use('/dashboard', require('./dashboard'));
router.use('/paypal', require('./paypal'));
// router.use('/braintree', require('./braintree'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
