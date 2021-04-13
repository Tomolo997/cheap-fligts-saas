const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

//not protected routes
router.post('/signup', authController.singUp);
router.post('/login', authController.logIn);
router.get('/logout', authController.logout);
module.exports = router;
