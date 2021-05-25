const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const flightController = require('../controllers/flightController');
//not protected routes
router.get(
  '/getMyFlights',
  authController.protect,
  flightController.getFlights
);
router.post('/addFlight', authController.protect, flightController.addFlight);
router.delete(
  '/deleteFlight',
  authController.protect,
  flightController.deleteFlight
);

module.exports = router;
