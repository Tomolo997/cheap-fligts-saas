const User = require("../models/userModel");
const Airports = require("../models/airports");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const appError = require("../utils/appError");
const { async } = require("regenerator-runtime");
const stripe = require("stripe")(
  "sk_test_51IxxvcJkVEDM03SsoiqQXiipym6kENermQpnqeiqP7zonwOUY57JcRHwzUpZA3DZzNPMz89gkNtvnFdw7q5YOjV1005MutyTyd"
);

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  res.status(200).json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    program: req.user.program,
    alreadyPaid: req.user.alreadyPaid,
  });
};

exports.getAirports = async (req, res, next) => {
  const airports = await Airports.find();
  res.status(200).json({
    airports: airports,
  });
};

exports.updateMe = async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user.id, {
    name: req.body.name,
    email: req.body.email,
  });
  console.log(user);
};
exports.upgradeMe = async (req, res, next) => {
  const { priceId } = req.body;
  console.log(priceId);
  const { id } = req.body;
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

      success_url: `http://localhost:4000/dashboard/upgrade/success/${id}/${priceId}`,
      cancel_url: "http://localhost:4000/upgrade/error",
    });

    console.log(session);

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

exports.successUpgrade = async (req, res, next) => {
  const { id } = req.body;
  const { priceId } = req.body;
  console.log(priceId);
  let program = "free";

  if (priceId === "price_1J084NJkVEDM03SsxUZmPVER") {
    program = "pro";
  }
  if (priceId === "price_1J081OJkVEDM03SsnZFRVUiO") {
    program = "standard";
  }

  const user = await User.findByIdAndUpdate(id, {
    program: program,
    alreadyPaid: true,
  });
};
