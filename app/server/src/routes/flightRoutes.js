const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const flightController = require('../controllers/flightController');
//not protected routes
router.post('/addFlight', authController.protect, flightController.addFlight);

module.exports = router;
