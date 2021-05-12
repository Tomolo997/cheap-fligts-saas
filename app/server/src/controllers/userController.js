const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const appError = require('../utils/appError');

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  res.status(200).json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
  });
};
