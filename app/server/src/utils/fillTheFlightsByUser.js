//server.js
require('dotenv').config();
var cron = require('node-cron');

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const axios = require('axios');
const port = process.env.PORT || 8000;
require('dotenv').config();
const User = require('../models/userModel');
const Flights = require('../models/fligthsModel');
const FlightResults = require('../models/flightsResult');
const { async } = require('regenerator-runtime');

//connection to the DB
const DB = process.env.DATABASE;
mongoose
  .connect(
    'mongodb+srv://tomaz:tomaz@cheap-flights.bdzqr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log('DB collection succesful');
  });

function TranfromDateToSuitableLink(date) {
  const slice = date.slice(2, 10).split('-').join('');
  return slice;
}

const dateFormatForSkyscanner = (date) => {
  const months = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
  ];
  return date.getFullYear();
  // + '-' + months[date.getMonth()]
};

const fillTheFlights = async () => {
  const users = await User.find();
  //loopaj skozi vsakega userja
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const flightByUser = await Flights.find({ user: user.id });
    console.log(flightByUser);
  }

  process.exit(1);
};
fillTheFlights();
