const mongoose = require('mongoose');
const airportsSchema = mongoose.Schema(
  {
    //sem da podatke user, katere vse kraje hoče iskat
    data: [],
    //dobi rezultate, item po item iz flightsData je vsak object
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
const Airports = mongoose.model('Airports', airportsSchema);
module.exports = Airports;
