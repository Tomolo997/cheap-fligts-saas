const User = require("../models/userModel");
const Airports = require("../models/airports");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const appError = require("../utils/appError");
const { async } = require("regenerator-runtime");

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  res.status(200).json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    program: req.user.program,
    alreadyPaid: req.user.alreadyPaid,
  });
};

exports.getAirports = async (req, res, next) => {
  const airports = await Airports.find();
  res.status(200).json({
    airports: airports,
  });
};

exports.updateMe = async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user.id, {
    name: req.body.name,
    email: req.body.email,
  });
  console.log(user);
};
