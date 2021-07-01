//requires
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');
const userRouter = require('../src/routes/userRouter');
const paymentRouter = require('../src/routes/paymentRouter');
const flightRouter = require('../src/routes/flightRoutes');
const viewsRouter = require('../src/routes/viewsRouter');
const axios = require('axios');
const { contentSecurityPolicy } = require('helmet');
axios.defaults.withCredentials = true;
//creatin of app.js
const app = express();
//first app uses => security,json and everything else

app.use(express.json({ limit: '10kb' }));
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cookieParser());
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  res.set(
    'Content-Security-Policy',
    "default-src 'self' https://*.mapbox.com https://*.stripe.com ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdnjs.cloudflare.com https://api.mapbox.com https://js.stripe.com/v3/ 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
  );
  next();
});
app.use(cors({ origin: ['http://localhost:5000'], credentials: true }));
app.use(helmet());
//middleware
app.get('/*', (req, res) => {
  res.send('Express server is up and running.');
});

//mounting the routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/flights', flightRouter);
app.use('/api/v1/payment', paymentRouter);

module.exports = app;
