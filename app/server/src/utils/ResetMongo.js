const Users = require("../models/userModel");
const airportsFlights = require("../models/flightsResult");
const flightsModel = require("../models/fligthsModel");
const mongoose = require("mongoose");

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

async function yrea() {
  await Users.remove({});
  await airportsFlights.remove({});
  await flightsModel.remove({});
}

yrea();
