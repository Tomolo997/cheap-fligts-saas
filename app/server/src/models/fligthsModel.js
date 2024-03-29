const mongoose = require("mongoose");
const crypto = require("crypto");
const validator = require("validator");
const bycrpt = require("bcryptjs");
const flightSchema = mongoose.Schema(
  {
    //sem da podatke user, katere vse kraje hoče iskat
    flightsData: [
      {
        flightFrom: String,
        flightTo: String,
        outboundDate: Date,
        inboundDate: Date,
        fromFlightCountry: String,
        toFlightCountry: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
        flightsResults: [],
      },
    ],
    //dobi rezultate, item po item iz flightsData je vsak object
    user: {
      type: mongoose.Schema.ObjectId,
      //establish reference
      ref: "User",
      required: [true, "Flight must have a user"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
const Flights = mongoose.model("Flight", flightSchema);

module.exports = Flights;
