//server.js
require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const axios = require('axios');
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

function TranfromDateToSuitableLink(date) {
  const slice = date.slice(2, 10).split('-').join('');

  return slice;
}

//get the current user
const fillTheStates = async (id) => {
  try {
    //fimd the user
    const users = await User.find();
    const UserIds = await users.map((el) => el._id);
    //find their flight
    //find all of the flights
    const flights = await Flights.find();
    const searchFlights = [];
    //search all of the flights
    for (let i = 0; i < flights.length; i++) {
      const { flightFrom, flightTo, outboundDate, inboundDate } = flights[
        i
      ].flightsData[0];
      searchFlights.push({
        flightFrom: flightFrom,
        flightTo: flightTo,
        fromDate: outboundDate.getFullYear(),
        toDate: inboundDate.getFullYear(),
      });
    }

    const flightResults = [];

    for (let index = 0; index < searchFlights.length; index++) {
      const { flightFrom, flightTo, fromDate, toDate } = searchFlights[index];
      const data = await axios.get(
        `https://partners.api.skyscanner.net/apiservices/browseroutes/v1.0/SL/eur/en-US/${flightFrom}/${flightTo}/${fromDate.toString()}/${toDate.toString()}?apikey=prtl6749387986743898559646983194`
      );
      await flightResults.push(data.data);
    }
    const flightResultQuotes = [];
    for (let index = 0; index < flightResults.length; index++) {
      const element = flightResults[index].Quotes;
      const places = flightResults[index].Places;
      placesArray = [];
      for (let i = 0; i < places.length; i++) {
        const element = places[i];
        placesArray.push({
          id: element.PlaceId,
          skyscannerCode: element.SkyscannerCode,
        });
      }
      console.log(placesArray);
      for (let index = 0; index < element.length; index++) {
        const element2 = element[index];

        const outboundDate = TranfromDateToSuitableLink(
          element2.OutboundLeg.DepartureDate
        );
        const inboundDate = TranfromDateToSuitableLink(
          element2.InboundLeg.DepartureDate
        );
        const fromFlight = placesArray.find(
          (el) => el.id === element2.OutboundLeg.OriginId
        ).skyscannerCode;
        const toFlight = placesArray.find(
          (el) => el.id === element2.OutboundLeg.DestinationId
        ).skyscannerCode;
        flightResultQuotes.push({
          price: element2.MinPrice,
          outboundDate: TranfromDateToSuitableLink(
            element2.OutboundLeg.DepartureDate
          ),
          inboundDate: TranfromDateToSuitableLink(
            element2.InboundLeg.DepartureDate
          ),
          from: fromFlight,
          to: toFlight,
          link: `https://www.skyscanner.net/transport/flights/${fromFlight}/${toFlight}/${outboundDate}/${inboundDate}/`,
        });
      }
    }
    console.log(flightResultQuotes);
    //enter into database

    await Flights.findByIdAndUpdate(flights[0], {
      flightResults: flightResultQuotes,
    });
    process.exit(1);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
fillTheStates();

/*  */
