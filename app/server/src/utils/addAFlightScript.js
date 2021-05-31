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
    console.log('DB collection succesfull');
  });

exports.addAFlight = async (
  flightFrom,
  flightTo,
  outboundDate,
  inboundDate,
  userID,
  flightId
) => {
  //Flight results moramo dodati
  /*
  {
  flightID: 60b282713d732e1ec522696f,
  results: [],
  user: 607076397431e949e466607a
}
  */

  //get the results
  const data = await axios.get(
    `https://partners.api.skyscanner.net/apiservices/browseroutes/v1.0/SL/eur/en-US/${flightFrom}/${flightTo}/${outboundDate}/${inboundDate}?apikey=ra66933236979928`
  );

  const results = data.data.Quotes;
  let places = [];
  for (let i = 0; i < data.data.Places.length; i++) {
    const flight = data.data.Places;
    for (let j = 0; j < flight.length; j++) {
      const elementJ = flight[j];
      places.push({
        id: elementJ.PlaceId,
        name: elementJ.CityName,
        skyscannerCode: elementJ.SkyscannerCode,
      });
    }
  }
  let flightsForFinal = [];
  for (let j = 0; j < results.length; j++) {
    const element = results[j];
    const fromFlight = places.find(
      (el) => el.id === element.OutboundLeg.OriginId
    ).skyscannerCode;
    const toFlight = places.find(
      (el) => el.id === element.OutboundLeg.DestinationId
    ).skyscannerCode;

    const fromFlightCountryorAirport = places.find(
      (el) => el.id === element.OutboundLeg.OriginId
    ).name;

    const toFlightCountryorAirport = places.find(
      (el) => el.id === element.OutboundLeg.DestinationId
    ).name;
    const fromDate = TranfromDateToSuitableLink(
      element.OutboundLeg.DepartureDate
    );
    const toDate = TranfromDateToSuitableLink(element.InboundLeg.DepartureDate);
    flightsForFinal.push({
      flightID: flightId,
      user: userID,
      flightFromSTART: flightFrom,
      flightToSTART: flightTo,
      fromFlight: fromFlight,
      toFlight: toFlight,
      fromFlightCountry: fromFlightCountryorAirport,
      toFlightCountry: toFlightCountryorAirport,
      price: element.MinPrice,
      formDate: element.OutboundLeg.DepartureDate,
      toDate: element.InboundLeg.DepartureDate,
      updated: Date.now(),
      link: `https://www.skyscanner.net/transport/flights/${fromFlight}/${toFlight}/${fromDate}/${toDate}/`,
    });
  }

  await FlightResults.create({
    user: userID,
    flightID: flightId,
    results: flightsForFinal,
  });
};

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

  if (date.getDate() == 1 && date.getMonth() == 0) {
    return date.getFullYear();
  } else {
    return date.getFullYear() + '-' + months[date.getMonth()];
  }
};
