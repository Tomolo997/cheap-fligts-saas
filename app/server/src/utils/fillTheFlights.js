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
      for (let j = 0; j < el.flightsData.length; j++) {
        const jEl = el.flightsData[j];
        flightsData.push({
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
          flights: elementJ,
          user: element.user,
          flightFrom: element.flightFrom,
          flightTo: element.flightTo,
        });
      }
    }

    console.log(flightsResults.length);
    console.log(flightsResults);

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

    console.log(flightsForFinal);
    // console.log(places);

    // console.log(places);

    // console.log(flightResults);
    //places imamo, imamo resultate flightov
    //narediti moramo končne array
    /*
        user: 607077e6fd1b8f0b18608afd,
    flightFrom: 'ZAG',
    flightTo: 'NTE',
    inboundDate: '2021',
    outboundDate: '2021',
    results: {
      Quotes: [],
      Carriers: [],
      Places: [],
      Currencies: [Array],
      Routes: []
    }
    flightResults:[
      {
        from:"IT-sky",
        to:"GR-sky",
        InboundDate:"2021",
        outboundDate:"2021",
        results:[{
          fromFlight:"VCE",
          toFlight:"ATH",
          inboundDate:210523,
          outboundDate:210526,
          price:123,
          link:"https://www.skyscanner.net/transport/flights/BLQ/ATH/210523/210526/"
        }]
      },
      {
        from:"ZAG",
        to:"CFU",
        InboundDate:"2021",
        outboundDate:"2021",
        results:[{
          fromFlight:"ZAG",
          toFlight:"CFU",
          inboundDate:210523,
          outboundDate:210526,
          price:21,
          link:"https://www.skyscanner.net/transport/flights/BLQ/ATH/210523/210526/"
        }]
      }

  {
    user: 607077e6fd1b8f0b18608afd,
    flightFrom: 'ZAG',
    flightTo: 'NTE',
    inboundDate: '2021',
    outboundDate: '2021',
    results: {
      Quotes: [],
      Carriers: [],
      Places: [],
      Currencies: [Array],
      Routes: []
    }
  }
    ]
    */

    process.exit(1);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
fillTheStates();

/*  
    // //fimd the user
    // const users = await User.find();
    // const UserIds = await users.map((el) => el._id);
    // //find their flight
    // //find all of the flights
    // const flights = await Flights.find();
    // const searchFlights = [];
    // //search all of the flights
    // for (let i = 0; i < flights.length; i++) {
    //   const { flightFrom, flightTo, outboundDate, inboundDate } = flights[
    //     i
    //   ].flightsData[0];
    //   searchFlights.push({
    //     flightFrom: flightFrom,
    //     flightTo: flightTo,
    //     fromDate: outboundDate.getFullYear(),
    //     toDate: inboundDate.getFullYear(),
    //   });
    // }

    // const flightResults = [];

    // for (let index = 0; index < searchFlights.length; index++) {
    //   const { flightFrom, flightTo, fromDate, toDate } = searchFlights[index];
    //   const data = await axios.get(
    //     `https://partners.api.skyscanner.net/apiservices/browseroutes/v1.0/SL/eur/en-US/${flightFrom}/${flightTo}/${fromDate.toString()}/${toDate.toString()}?apikey=prtl6749387986743898559646983194`
    //   );
    //   await flightResults.push(data.data);
    // }
    // const flightResultQuotes = [];
    // for (let index = 0; index < flightResults.length; index++) {
    //   const element = flightResults[index].Quotes;
    //   const places = flightResults[index].Places;
    //   placesArray = [];
    //   for (let i = 0; i < places.length; i++) {
    //     const element = places[i];
    //     placesArray.push({
    //       id: element.PlaceId,
    //       skyscannerCode: element.SkyscannerCode,
    //     });
    //   }
    //   console.log(placesArray);
    //   for (let index = 0; index < element.length; index++) {
    //     const element2 = element[index];

    //     const outboundDate = TranfromDateToSuitableLink(
    //       element2.OutboundLeg.DepartureDate
    //     );
    //     const inboundDate = TranfromDateToSuitableLink(
    //       element2.InboundLeg.DepartureDate
    //     );
    //     const fromFlight = placesArray.find(
    //       (el) => el.id === element2.OutboundLeg.OriginId
    //     ).skyscannerCode;
    //     const toFlight = placesArray.find(
    //       (el) => el.id === element2.OutboundLeg.DestinationId
    //     ).skyscannerCode;
    //     flightResultQuotes.push({
    //       price: element2.MinPrice,
    //       outboundDate: TranfromDateToSuitableLink(
    //         element2.OutboundLeg.DepartureDate
    //       ),
    //       inboundDate: TranfromDateToSuitableLink(
    //         element2.InboundLeg.DepartureDate
    //       ),
    //       from: fromFlight,
    //       to: toFlight,
    //       link: `https://www.skyscanner.net/transport/flights/${fromFlight}/${toFlight}/${outboundDate}/${inboundDate}/`,
    //     });
    //   }
    // }
    // console.log(flightResultQuotes);
    // //enter into database
    // console.log(flights);

    // await Flights.findByIdAndUpdate(flights[0]._id, {
    //   $set: {
    //     flightsResults: flightResultQuotes,
    //   },
    // });
    // process.exit(1);

    let flightResults = [];

    //

    for (let i = 0; i < flightsData.length; i++) {
      const el = flightsData[i];
      flightResults.push({
        user: el.user,
        from: el.flightFrom,
        to: el.flightTo,
        inboundDate: el.inboundDate,
        outboundDate: el.outboundDate,
        results: [],
      });
    }

    for (let i = 0; i < flightsData.length; i++) {
      const element = flightsData[i];
      const userID = element.user;
      const from = element.flightFrom;
      const to = element.flightTo;
      const flightBasedOnID = flightResults.find(
        (el) => el.user === userID && el.from === from && el.to === to
      );
      
      console.log(flightBasedOnID);
      // console.log(element.results.Quotes);
    }


*/
