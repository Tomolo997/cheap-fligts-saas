const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const appError = require('../utils/appError');
const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') {
    cookieOptions.secure = true;
  }

  res.cookie('jwt', token, cookieOptions);
  //remove the password from the outpu
  user.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.singUp = async (req, res) => {
  try {
    console.log(req.body);
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      passwordChangedAt: req.body.passwordChangedAt,
    });
    createSendToken(newUser, 201, res);
    res.status(200).json({
      status: 'success',
      data: {
        message: 'Created new user',
        userName: req.body.name,
        userEmail: req.body.email,
      },
    });
  } catch (error) {
    res.status(400).json({
      data: {
        status: 'error',
        message: 'User with this email already exists',
      },
    });
    console.log(error);
  }
};

exports.logIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  //1) check if the email and passwords exists
  if (!email || !password) {
    return next(new appError('Please provide email and password', 400));
  }
  //2) check if user exists and password is correct
  const user = await User.findOne({
    email: email,
  }).select('+password');

  //   const correct = await user.correctPassword(password, user.password);
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new appError('incorrect email or password', 401));
  }

  //3) if everytingh ok , send token to client
  console.log(res);
  createSendToken(user, 200, res);
});

exports.logout = (req, res) => {
  res.cookie('jwt', 'null', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({ status: 'success' });
};

exports.protect = catchAsync(async (req, res, next) => {
  //1) Get the token and check if it exists
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
    console.log(123);
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
    console.log('cookie');
  }
  console.log(token);
  console.log('PROTECTED');
  if (!token) {
    return next(
      new appError('You are not logged in, please login to get access', 401)
    );
  }
  //2) Verification token
  //all this is sa function that we need to call that returns a promise

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //3) Check if user still exists
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return next(
      new appError('The user beloning to the user does not exist'),
      401
    );
  }
  //4) Check if user changed password after token was issued

  if (freshUser.changedPasswordAfter(decoded.iat)) {
    return new appError(
      'The user recentiuly changed password, plase login again',
      401
    );
  }
  //only if the previous 4 are correct then the next will be called and then the user gets the routes
  req.user = freshUser;
  next();
});

exports.isLoggedIn = async (req, res, next) => {
  console.log('isloggedin runned');
  if (req.cookies.jwt) {
    //we need the try catch because, we wan t to catch the errors loccaly, so we removed catchAsync
    try {
      token = req.cookies.jwt;
      console.log(token);
      //verifys the token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      //3) Check if user still exists
      const freshUser = await User.findById(decoded.id);
      if (!freshUser) {
        next();
      }
      //4) Check if user changed password after token was issued

      if (freshUser.changedPasswordAfter(decoded.iat)) {
        next();
      }

      //if it comes to here, there is a logged in user

      //each tmeplate will have access to the res.locals
      res.user = freshUser;
      //the frontend checks if the user is logged in
      res.json(true);
      return next();
    } catch (error) {
      //if there is an error => so no user, we want to go to next middleware,
      //so bassicaly saying there is no logged in user
      res.json(false);
      return next();
    }
  }
  //if there is no cookie
  res.json(false);
  next();
};
