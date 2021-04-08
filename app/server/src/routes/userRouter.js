const express = require('express');
const router = express.Router();
router.get('/logout', (req, res, next) => {
  console.log(123);
});

module.exports = router;
