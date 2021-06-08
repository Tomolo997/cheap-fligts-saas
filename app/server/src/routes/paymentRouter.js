const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const flightController = require('../controllers/flightController');
const paymentController = require('../controllers/paymentController');
router.post('/pay', paymentController.payMe);

module.exports = router;
