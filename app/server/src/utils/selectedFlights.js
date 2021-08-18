require("dotenv").config();
var cron = require("node-cron");
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const axios = require("axios");
const port = process.env.PORT || 8000;

const flightsFromJSON = require("./../../flights.json");
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
  const flightsRes = await FlightResults.find();

  const flights = [];
  for (let i = 0; i < flightsRes.length; i++) {
    const element = flightsRes[i];
    if (flights.find((el) => el.user === element.user)) {
      continue;
    }
    flights.push({
      _id: element.flightID,
      user: element.user,
      flightData: [],
    });
  }

  // initialize a Set object
  const uniqueValuesSet = new Set();

  // array of objects with duplicate values
  const arr = [
    { name: "John Doe" },
    { name: "John Doe" },
    { name: "Lily Roy" },
    { name: "Helen" },
  ];

  const filteredArr = flights.filter((obj) => {
    // check if name property value is already in the set
    const isPresentInSet = uniqueValuesSet.has(obj.user);
    console.log(isPresentInSet);
    console.log(obj.user);
    // add name property value to Set
    uniqueValuesSet.add(obj.name);

    // return the negated value of
    // isPresentInSet variable
    return !isPresentInSet;
  });

  console.log(filteredArr.length);
  console.log(flights.length);

  for (let index = 0; index < flightsFromJSON.length; index++) {}
  console.log(flightsRes[1]);
};
yea();
