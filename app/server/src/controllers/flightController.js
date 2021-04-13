const User = require('../models/userModel');
const Flights = require('../models/fligthsModel');

exports.addFlight = async (req, res) => {
  try {
    //1) find the user
    const userID = await User.findById(req.params.userId);

    //2)Call the
  } catch (error) {
    console.log(error);
  }
};
