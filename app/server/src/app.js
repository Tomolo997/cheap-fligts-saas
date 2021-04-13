//requires
const express = require('express');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const userRouter = require('../src/routes/userRouter');
const flightRouter = require('../src/routes/flightRoutes');

//creatin of app.js
const app = express();
//first app uses => security,json and everything else
app.use(cors());
app.use(express.json({ limit: '10kb' }));
app.use(helmet());

//middleware
app.get('/', (req, res) => {
  res.send('Express server is up and running.');
});

//mounting the routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/flights', flightRouter);

module.exports = app;
