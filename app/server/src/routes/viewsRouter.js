const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const router = express.Router();
//not protected routes
//not protected routes
router.get('/dashboard', authController.protect, userController.getMe);
module.exports = router;
