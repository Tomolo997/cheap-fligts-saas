const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const appError = require('../utils/appError');

exports.getMe = (req, res, next) => {
  console.log(req);
  req.params.id = req.user.id;
  next();
};
