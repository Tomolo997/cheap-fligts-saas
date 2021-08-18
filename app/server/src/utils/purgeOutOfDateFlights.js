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
const { pathToFileURL } = require("url");

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
const yea = async () => {
  const currentUserflights = await Flights.find();
  const date = Date.now();
  const date2 = new Date(date);

  const month = date2.getMonth() + 1;

  //we get the current month
  let filterThroughFlights = [];
  for (let i = 0; i < currentUserflights.length; i++) {
    const element = currentUserflights[i].flightsData;

    // index and how many arr.splice(i, 1);
    for (let j = 0; j < element.length; j++) {
      const outboundDate = element[j].outboundDate;
      const inboundDate = element[j].inboundDate;
      if (
        outboundDate.getMonth() + 1 < month &&
        inboundDate.getMonth() + 1 !== 1
      ) {
        element.splice(j, 1);
        continue;
      }
    }

    filterThroughFlights.push(currentUserflights[i]);
  }
  //console.log(filterThroughFlights);
  //   for (let i = 0; i < filterThroughFlights.length; i++) {
  //     const element = filterThroughFlights[i];
  //     for (let j = 0; j < element.length; j++) {
  //       const outboundDate = element[j].outboundDate;
  //       const inboundDate = element[j].inboundDate;
  //       if (
  //         outboundDate.getMonth() + 1 < month &&
  //         inboundDate.getMonth() + 1 !== 1
  //       ) {
  //         console.log(element[j]);
  //       }
  //     }
  //   }

  //find the current flight

  console.log(filterThroughFlights, currentUserflights);
  for (let i = 0; i < filterThroughFlights.length; i++) {
    const element = filterThroughFlights[i];
    await Flights.create(element);
  }
};

yea();

//process.exit(1);
