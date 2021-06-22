const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
//not protected routes
router.post('/signup', authController.singUp);
router.post('/login', authController.logIn);
router.get('/loggedIn', authController.isLoggedIn);
router.get('/logout', authController.logout);
router.put('/verification', authController.verify);

//protected routes
router.get('/getMe', authController.protect, userController.getMe);
router.get('/airports', authController.protect, userController.getAirports);
router.post('/upgradeMe', authController.protect, userController.upgradeMe);
router.put('/updateMe', authController.protect, userController.updateMe);
router.post(
  '/successUpgrade',
  authController.protect,
  userController.successUpgrade
);

module.exports = router;
