const User = require('../models/userModel');
const Flights = require('../models/fligthsModel');

exports.addFlight = async (req, res, next) => {
  try {
    //1) find the user
    const userID = await User.findById(req.user._id);
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
    const createdFlight = await Flights.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        createdFlight,
      },
    });

    //2)Call the
  } catch (error) {
    console.log(error);
  }
};
