const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
router.get('/logout', (req, res, next) => {
  console.log(123);
});

//not protected routes
router.post('/signup', authController.singUp);
router.post('/login', authController.logIn);

module.exports = router;
