//server.js
require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = require('../src/app');
const port = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, '../../../build')));
app.use(function (req, res, next) {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; font-src 'self'; img-src 'self'; script-src 'self'; style-src 'self'; frame-src 'self'"
  );
  next();
});
//connection to the DB
const DB = process.env.DATABASE;
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
