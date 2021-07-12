const mongoose = require("mongoose");
const crypto = require("crypto");
const validator = require("validator");
const bycrpt = require("bcryptjs");
const flightResultsSchema = mongoose.Schema(
  {
    results: [],
    flightID: {
      type: mongoose.Schema.ObjectId,
      //establish reference
      ref: "flightID",
      required: [true, "flight must have a flightID"],
    },
    createdAt: Date,
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
const FlightResults = mongoose.model("FlightResults", flightResultsSchema);
module.exports = FlightResults;
