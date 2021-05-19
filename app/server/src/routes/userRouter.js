const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
//not protected routes
router.post('/signup', authController.singUp);
router.post('/login', authController.logIn);
router.get('/loggedIn', authController.isLoggedIn);
router.get('/logout', authController.logout);
//not protected routes

router.get('/getMe', authController.protect, userController.getMe);
router.get('/airports', authController.protect, userController.getAirports);

module.exports = router;
