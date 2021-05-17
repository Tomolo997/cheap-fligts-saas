const User = require('../models/userModel');
const Flights = require('../models/fligthsModel');
const FlightResults = require('../models/flightsResult');

exports.addFlight = async (req, res, next) => {
  try {
    //1) find the user
    console.log(req.body.user);
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
    const flight = await Flights.findOne({ user: userID._id });
    if (!flight) {
      const createdFlight = await Flights.create(req.body);
    }

    const flightAdded = await Flights.findByIdAndUpdate(
      { _id: flight._id },
      { $push: { flightsData: req.body.flightsData[0] } },
      { upsert: true }
    );
    console.log(flightAdded);
    res.status(201).json({
      status: 'success',
      data: {
        userID,
      },
    });

    //2)Call the
  } catch (error) {
    res.status(400).json({
      status: 'error',
    });
  }
};

exports.getFlights = async (req, res, next) => {
  //get user id
  const userId = req.user._id;
  const flights = await FlightResults.find({ user: userId });
  //get user flights
  const flightsDataInit = await Flights.find({ user: userId });
  const userFlightsInit = flightsDataInit[0].flightsData;

  console.log(userFlightsInit);
  const flightsToSend = [];
  for (let index = 0; index < flights.length; index++) {
    const element = flights[index];

    flightsToSend.push(element);
  }

  res.status(200).json({
    status: 'success',
    data: {
      flights: flightsToSend,
      noResults: userFlightsInit,
    },
  });
  //get user flights results
};
