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
const { pathToFileURL } = require('url');

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

  try {
    const data = await axios.get(
      `https://partners.api.skyscanner.net/apiservices/browseroutes/v1.0/SL/eur/en-US/${flightFrom}/${flightTo}/${outboundDate}/${outboundDate}?apikey=ra66933236979928`
    );

    const data2 = await axios.get(
      `https://partners.api.skyscanner.net/apiservices/browseroutes/v1.0/SL/eur/en-US/${flightFrom}/${flightTo}/${outboundDate}/${inboundDate}?apikey=ra66933236979928`
    );

    const data3 = await axios.get(
      `https://partners.api.skyscanner.net/apiservices/browseroutes/v1.0/SL/eur/en-US/${flightFrom}/${flightTo}/${inboundDate}/${inboundDate}?apikey=ra66933236979928`
    );
    const results = [
      ...data.data.Quotes,
      ...data2.data.Quotes,
      ...data3.data.Quotes,
    ];

    let places = [];
    for (let i = 0; i < data.data.Places.length; i++) {
      const flight = data.data.Places;
      for (let j = 0; j < flight.length; j++) {
        const elementJ = flight[j];
        places.push({
          id: elementJ.PlaceId || 'none',
          name: elementJ.CityName,
          skyscannerCode: elementJ.SkyscannerCode,
        });
      }
    }

    let flightsForFinal = [];
    for (let j = 0; j < results.length; j++) {
      const element = results[j];

      let fromFlight = places.find((el) => {
        return el.id === element.OutboundLeg.OriginId;
      });

      if (fromFlight !== undefined) {
        fromFlight = fromFlight.skyscannerCode;
      } else {
        fromFlight = 'No Data';
      }

      let toFlight = places.find((el) => {
        return el.id === element.OutboundLeg.DestinationId;
      });

      if (toFlight !== undefined) {
        toFlight = toFlight.skyscannerCode;
      } else {
        toFlight = 'No Data';
      }

      let fromFlightCountryorAirport = places.find(
        (el) => el.id === element.OutboundLeg.OriginId
      );

      if (fromFlightCountryorAirport !== undefined) {
        fromFlightCountryorAirport = fromFlightCountryorAirport.skyscannerCode;
      } else {
        fromFlightCountryorAirport = 'No Data';
      }

      let toFlightCountryorAirport = places.find(
        (el) => el.id === element.OutboundLeg.DestinationId
      );

      if (toFlightCountryorAirport !== undefined) {
        toFlightCountryorAirport = toFlightCountryorAirport.name;
      } else {
        toFlight = 'No Data';
      }
      const fromDate = TranfromDateToSuitableLink(
        element.OutboundLeg.DepartureDate
      );
      const toDate = TranfromDateToSuitableLink(
        element.InboundLeg.DepartureDate
      );
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

    flightsForFinal.sort((a, b) => a.price - b.price);

    await FlightResults.create({
      user: userID,
      flightID: flightId,
      results: flightsForFinal,
    });
  } catch (error) {
    console.log('ERRRORRR', error);
    return 'There has been an error';
  }
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
