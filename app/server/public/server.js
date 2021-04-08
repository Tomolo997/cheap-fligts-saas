//server.js
require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = require('../src/app');
const port = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, '../../../build')));

//connection to the DB
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB collection succesful');
  });

app.listen(port, (_) => console.log(`The server is listening on port ${port}`));
