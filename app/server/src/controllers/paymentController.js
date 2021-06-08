const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const appError = require('../utils/appError');
const stripe = require('stripe')(
  'sk_test_51IxxvcJkVEDM03SsoiqQXiipym6kENermQpnqeiqP7zonwOUY57JcRHwzUpZA3DZzNPMz89gkNtvnFdw7q5YOjV1005MutyTyd'
);

exports.payMe = async (req, res) => {
  const { priceId } = req.body;

  // See https://stripe.com/docs/api/checkout/sessions/create
  // for additional parameters to pass.
  console.log(priceId);
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          // For metered billing, do not pass quantity
          quantity: 1,
        },
      ],
      // {CHECKOUT_SESSION_ID} is a string literal; do not change it!
      // the actual Session ID is returned in the query parameter when your customer
      // is redirected to the success page.
      success_url:
        'https://example.com/success.html?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:4000/sign-up',
    });

    res.send({
      sessionId: session.id,
    });
  } catch (e) {
    res.status(400);
    return res.send({
      error: {
        message: e.message,
      },
    });
  }
};
