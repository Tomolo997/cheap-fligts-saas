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

//get the current user
const fillTheStates = async () => {
  try {
    //find the all of the flights, all flights je array
    const allFlights = await Flights.find();
    //loop through all of the flights in the array,
    let flightsData = [];
    for (let i = 0; i < allFlights.length; i++) {
      const el = allFlights[i];
      // console.log(el.flightsData);
      for (let j = 0; j < el.flightsData.length; j++) {
        const jEl = el.flightsData[j];
        flightsData.push({
          flightID: jEl._id,
          user: el.user,
          flightFrom: jEl.flightFrom,
          flightTo: jEl.flightTo,
          inboundDate: dateFormatForSkyscanner(jEl.inboundDate).toString(),
          outboundDate: dateFormatForSkyscanner(jEl.outboundDate).toString(),
        });
      }
    }
    for (let i = 0; i < flightsData.length; i++) {
      const element = flightsData[i];
      const { flightFrom, flightTo, inboundDate, outboundDate } = element;
      console.log(flightFrom, flightTo, inboundDate, outboundDate);
      try {
        const data = await axios.get(
          `https://partners.api.skyscanner.net/apiservices/browseroutes/v1.0/SL/eur/en-US/${flightFrom}/${flightTo}/${outboundDate}/${inboundDate}?apikey=prtl6749387986743898559646983194`
        );
        element.results = data.data;
      } catch (error) {
        console.log(error);
      }
    }
    //loop through the places and place them into the array inside IDs
    let places = [];
    for (let i = 0; i < flightsData.length; i++) {
      const flight = flightsData[i].results.Places;
      for (let j = 0; j < flight.length; j++) {
        const elementJ = flight[j];
        places.push({
          id: elementJ.PlaceId,
          skyscannerCode: elementJ.SkyscannerCode,
        });
      }
    }

    let flightsResults = [];
    for (let i = 0; i < flightsData.length; i++) {
      const element = flightsData[i];
      for (let j = 0; j < element.results.Quotes.length; j++) {
        const elementJ = element.results.Quotes[j];
        flightsResults.push({
          flightID: element.flightID,
          flights: elementJ,
          user: element.user,
          flightFrom: element.flightFrom,
          flightTo: element.flightTo,
        });
      }
    }

    let flightsForFinal = [];

    for (let j = 0; j < flightsResults.length; j++) {
      const element = flightsResults[j];
      const fromFlight = places.find(
        (el) => el.id === element.flights.OutboundLeg.OriginId
      ).skyscannerCode;
      const toFlight = places.find(
        (el) => el.id === element.flights.OutboundLeg.DestinationId
      ).skyscannerCode;

      const fromDate = TranfromDateToSuitableLink(
        element.flights.OutboundLeg.DepartureDate
      );
      const toDate = TranfromDateToSuitableLink(
        element.flights.InboundLeg.DepartureDate
      );
      flightsForFinal.push({
        flightID: element.flightID,
        user: element.user,
        flightFromSTART: element.flightFrom,
        flightToSTART: element.flightTo,
        fromFlight: fromFlight,
        toFlight: toFlight,
        price: element.flights.MinPrice,
        formDate: element.flights.OutboundLeg.DepartureDate,
        toDate: element.flights.InboundLeg.DepartureDate,
        link: `https://www.skyscanner.net/transport/flights/${fromFlight}/${toFlight}/${fromDate}/${toDate}/`,
      });
    }
    const flightsForDB = [];
    for (let i = 0; i < allFlights.length; i++) {
      const element = allFlights[i];
      for (let index = 0; index < element.flightsData.length; index++) {
        const element2 = element.flightsData[index];
        console.log(element2);
        flightsForDB.push({
          flightID: element2._id,
          results: [],
          user: element.user,
        });
      }
    }

    for (let i = 0; i < flightsForFinal.length; i++) {
      const element = flightsForFinal[i];
      for (let j = 0; j < flightsForDB.length; j++) {
        const element2 = flightsForDB[j];
        if (element.flightID === element2.flightID) {
          element2.results.push(element);
        }
      }
    }
    await FlightResults.remove({});
    for (let i = 0; i < flightsForDB.length; i++) {
      const element = flightsForDB[i];
      await FlightResults.create(element);
    }

    console.log('Succesfully filled the states');
    process.exit(1);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
fillTheStates();
console.log('Filling the states');

export default fillTheStates();
