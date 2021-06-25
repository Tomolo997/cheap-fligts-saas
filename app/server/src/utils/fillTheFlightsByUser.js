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
    console.log("DB collection succesful");
  });

function TranfromDateToSuitableLink(date) {
  const slice = date.slice(2, 10).split("-").join("");
  return slice;
}

const dateFormatForSkyscanner = (date) => {
  const months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];

  if (date.getDate() == 1 && date.getMonth() == 0) {
    return date.getFullYear();
  } else {
    return date.getFullYear() + "-" + months[date.getMonth()];
  }

  // + '-' + months[date.getMonth()]
};

const fillTheFlights = async () => {
  const users = await User.find();
  let x = 0;
  //loopaj skozi vsakega userja
  await FlightResults.remove({});
  while (x < users.length) {
    await new Promise((r) => setTimeout(r, 60000));

    const currentUserflights = await Flights.find({ user: users[x].id });
    //loop through all of the flights in the array,
    let flightsData = [];
    for (let i = 0; i < currentUserflights.length; i++) {
      const el = currentUserflights[i];
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
      console.log(flightFrom, flightTo, outboundDate, inboundDate);
      try {
        const data = await axios.get(
          `https://partners.api.skyscanner.net/apiservices/browseroutes/v1.0/SL/eur/en-US/${flightFrom}/${flightTo}/${outboundDate}/${outboundDate}?apikey=ra66933236979928`
        );
        const data2 = await axios.get(
          `https://partners.api.skyscanner.net/apiservices/browseroutes/v1.0/SL/eur/en-US/${flightFrom}/${flightTo}/${outboundDate}/${inboundDate}?apikey=ra66933236979928`
        );
        const data3 = await axios.get(
          `https://partners.api.skyscanner.net/apiservices/browseroutes/v1.0/SL/eur/en-US/${flightFrom}/${flightTo}/${inboundDate}/${inboundDate}?apikey=prtl6749387986743898559646983194`
        );
        element.results = data.data;
        element.resultsQuotes = [
          ...data.data.Quotes,
          ...data2.data.Quotes,
          ...data3.data.Quotes,
        ];
      } catch (error) {
        console.log(error);
        continue;
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
          name: elementJ.CityName,
          skyscannerCode: elementJ.SkyscannerCode,
        });
      }
    }
    let flightsResults = [];
    for (let i = 0; i < flightsData.length; i++) {
      const element = flightsData[i];
      for (let j = 0; j < element.resultsQuotes.length; j++) {
        const elementJ = element.resultsQuotes[j];
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

      let fromFlight = places.find((el) => {
        return el.id === element.flights.OutboundLeg.OriginId;
      });

      if (fromFlight !== undefined) {
        fromFlight = fromFlight.skyscannerCode;
      } else {
        fromFlight = "No Data";
      }

      let toFlight = places.find((el) => {
        return el.id === element.flights.OutboundLeg.DestinationId;
      });

      if (toFlight !== undefined) {
        toFlight = toFlight.skyscannerCode;
      } else {
        toFlight = "No Data";
      }

      let fromFlightCountryorAirport = places.find(
        (el) => el.id === element.flights.OutboundLeg.OriginId
      );

      if (fromFlightCountryorAirport !== undefined) {
        fromFlightCountryorAirport = fromFlightCountryorAirport.skyscannerCode;
      } else {
        fromFlightCountryorAirport = "No Data";
      }

      let toFlightCountryorAirport = places.find(
        (el) => el.id === element.flights.OutboundLeg.DestinationId
      );

      if (toFlightCountryorAirport !== undefined) {
        toFlightCountryorAirport = toFlightCountryorAirport.name;
      } else {
        toFlight = "No Data";
      }

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
        fromFlightCountry: fromFlightCountryorAirport,
        toFlightCountry: toFlightCountryorAirport,
        price: element.flights.MinPrice,
        formDate: element.flights.OutboundLeg.DepartureDate,
        toDate: element.flights.InboundLeg.DepartureDate,
        updated: Date.now(),
        link: `https://www.skyscanner.net/transport/flights/${fromFlight}/${toFlight}/${fromDate}/${toDate}/`,
      });
    }

    flightsForFinal.sort((a, b) => a.price - b.price);

    const flightsForDB = [];
    for (let i = 0; i < currentUserflights.length; i++) {
      const element = currentUserflights[i];
      for (let index = 0; index < element.flightsData.length; index++) {
        const element2 = element.flightsData[index];
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

    console.log(flightsForDB[0]);

    for (let i = 0; i < flightsForDB.length; i++) {
      const element = flightsForDB[i];
      await FlightResults.create(element);
    }

    console.log(users[x].email + "Succesfully filled the states");
    x++;
  }

  process.exit(1);
};
fillTheFlights();
