const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const appError = require("../utils/appError");
const stripe = require("stripe")(
  "sk_test_51IxxvcJkVEDM03SsoiqQXiipym6kENermQpnqeiqP7zonwOUY57JcRHwzUpZA3DZzNPMz89gkNtvnFdw7q5YOjV1005MutyTyd"
);

exports.succesfullPayment = async (req, res) => {
  console.log(req.body);
  const user = await User.findOneAndUpdate(
    { alreadyPaidToken: req.body.token },
    {
      alreadyPaid: true,
    }
  );

  console.log(user);
};

exports.payMe = async (req, res) => {
  const { priceId } = req.body;
  console.log(priceId);
  const { paidToken } = req.body;
  console.log(paidToken);
  // See https://stripe.com/docs/api/checkout/sessions/create
  // for additional parameters to pass.
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
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

      success_url: `http://localhost:4000/paid/${paidToken}`,
      cancel_url: "http://localhost:4000/",
    });
    res.send({
      sessionId: session.id,
    });
  } catch (e) {
    console.log(e.message);
    res.status(400);
    return res.send({
      error: {
        message: e.message,
      },
    });
  }
};
