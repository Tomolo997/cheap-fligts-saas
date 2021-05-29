//server.js
require("dotenv").config();
var cron = require("node-cron");

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const axios = require("axios");
const port = process.env.PORT || 8000;
require("dotenv").config();
const User = require("../models/userModel");
const Flights = require("../models/fligthsModel");
const FlightResults = require("../models/flightsResult");
const { async } = require("regenerator-runtime");

//connection to the DB
const DB = process.env.DATABASE;
mongoose
  .connect(
    "mongodb+srv://tomaz:tomaz@cheap-flights.bdzqr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("DB collection succesfull");
  });

exports.addAFlight = async (
  flightFrom,
  flightTo,
  outboundDate,
  inboundDate
) => {
  console.log("adda af flight script ran");
};
