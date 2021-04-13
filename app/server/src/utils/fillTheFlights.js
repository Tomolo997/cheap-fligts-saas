//server.js
require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const port = process.env.PORT || 8000;
require('dotenv').config();
const User = require('../models/userModel');
const Flights = require('../models/fligthsModel');

//connection to the DB
const DB = process.env.DATABASE;
mongoose
  .connect(String(DB), {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB collection succesful');
  });

//get the current user
const fillTheStates = async (req, res) => {
  try {
    const user = await User.findById('607076397431e949e466607a');
    console.log(user);
  } catch (error) {
    console.log(error);
  }
};
fillTheStates();
