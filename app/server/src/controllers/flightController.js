const User = require('../models/userModel');
const Flights = require('../models/fligthsModel');
const FlightResults = require('../models/flightsResult');
const addAFlightScript = require('../utils/addAFlightScript');
exports.addFlight = async (req, res, next) => {
  try {
    //1) find the user
    const userID = await User.findById(req.body.user);

    //add flight to the flights data
    /* flightsData: [
      {
        flightFrom: String,
        flightTo: String,
        outboundDate: Date,
        inboundDate: Date,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ], */
    //ce user se nima flighta
    //const createdFlight = await Flights.create(req.body);
    const flightFrom = req.body.flightsData[0].flightFrom;
    const flightTo = req.body.flightsData[0].flightTo;
    const outboundDate = req.body.flightsData[0].outboundDate;
    const inboundDate = req.body.flightsData[0].inboundDate;

    console.log(userID);

    console.log(userID.program);

    //find the program

    const flight = await Flights.findOne({ user: userID._id });
    console.log(flight.flightsData);
    if (userID.program === 'free' && flight.flightsData.length > 2) {
      res.status(201).json({
        status: 'error',
        data: {
          userID,
        },
      });
      return;
    }

    if (!flight) {
      const createdFlight = await Flights.create(req.body);
    }

    const flightAdded = await Flights.findByIdAndUpdate(
      { _id: flight._id },
      { $push: { flightsData: req.body.flightsData[0] } },
      { upsert: true }
    );
    res.status(201).json({
      status: 'success',
      data: {
        userID,
      },
    });

    const flighFound = await Flights.findOne({ _id: flightAdded._id });

    //2)Call thež
    addAFlightScript.addAFlight(
      flightFrom,
      flightTo,
      outboundDate,
      inboundDate,
      userID._id,
      flighFound.flightsData[flighFound.flightsData.length - 1]._id
    );
  } catch (error) {
    res.status(400).json({
      status: 'error',
    });
  }
};

exports.getFlights = async (req, res, next) => {
  //get user id
  const userId = req.user._id;
  //get all the flights RESULTS for the specific user
  const flights = await FlightResults.find({ user: userId });
  //get user all of the flights that the user wants to search for
  const flightsDataInit = await Flights.find({ user: userId });
  const userFlightsInit = flightsDataInit[0].flightsData;

  //filter all of the the results

  const flightsWithNoResult = flights.filter((el) => el.results.length === 0);

  const NoDataFlights = [];
  for (let index = 0; index < userFlightsInit.length; index++) {
    const element = userFlightsInit[index];
    for (let j = 0; j < flightsWithNoResult.length; j++) {
      const element2 = flightsWithNoResult[j];
      console.log(element._id == element2.flightID);

      if (String(element._id) == String(element2.flightID)) {
        NoDataFlights.push(element);
      }
    }
  }
  console.log(userFlightsInit);

  const flightsToSend = [];
  for (let index = 0; index < flights.length; index++) {
    const element = flights[index];
    if (element.results.length > 0) {
      flightsToSend.push(element);
    }
  }

  res.status(200).json({
    status: 'success',
    data: {
      flights: flightsToSend,
      initData: userFlightsInit,
      noResults: NoDataFlights,
    },
  });
  //get user flights results
};

exports.deleteFlight = async (req, res, next) => {
  try {
    //1) find the user
    const userID = await User.findById(req.body.user);
    console.log(req.body.user);
    console.log(req.body.flightID);
    console.log(req.body.flightResultsId);
    await Flights.updateOne(
      { user: userID },
      { $pull: { flightsData: { _id: req.body.flightID } } }
    );

    await FlightResults.findOneAndRemove({
      user: userID,
      _id: req.body.flightResultsId,
    });

    res.status(201).json({
      status: 'success',
      data: {
        message: 'succesfully deleted your flight',
      },
    });

    //2)Call the
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'error',
    });
  }
};
