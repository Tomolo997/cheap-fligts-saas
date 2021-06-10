import 'core-js';
import 'regenerator-runtime/runtime';
import React, { Fragment, useState, useContext } from 'react';
import NavbarSignUp from '../NavbarSignUp/NavbarSignUp';
import FooterSignUp from '../FooterSignUp/FooterSignUp';
import SignUpSuccess from '../signUpSuccess/signUpSuccess';
import axios from 'axios';
import UserAlreadyExists from '../Errors/UserAlreadyExists';
import ShortPasswordError from '../Errors/ShortPasswordError';
import PasswordsAreNotTheSame from '../Errors/PasswordsAreNotTheSame';
import '../../App/App.css';
import AuthContext from '../../context/AuthContext';
import LoginSuccess from '../LoginSuccess/LoginSuccess';
import { Link } from 'react-router-dom';
import ProvideValidEmail from '../Errors/ProvideValidEmail';
import PleaseEnterName from '../Errors/PleaseEnterName';
let stripe = Stripe(
  'pk_test_51IxxvcJkVEDM03SsyEouRlG0tukqWjdFC8KiBhTZnOVJcXIQOgEF0EKarkcJGz1CGvfgE8MRinNxx3kLzOZ5Qsrd00Zv1hZwMt'
);
const SignUp = () => {
  const [singUpSuccessfull, setSingUpSuccessfull] = useState(false);
  const [username, setUsername] = useState('');
  const [emailSignUp, setEmailSignUp] = useState('');
  const [passwordSignUp, setPasswordSignUp] = useState('');
  const [passwordConfirmSignUp, setPasswordConfirmSignUp] = useState('');
  const [userAlreadyExistError, setUserAlreadyExistError] = useState(false);
  const [shortPasswordError, setShortPasswordError] = useState(false);
  const [passwordsAreNotTheSame, setPasswordsAreNotTheSame] = useState(false);
  const [provideValidEmail, setProvideValidEmail] = useState(false);
  const [enterNameError, setEnterNameError] = useState(false);
  const { price_id, getLoggedIn, setUserEmail } = useContext(AuthContext);

  var createCheckoutSession = function (priceId) {
    return fetch('http://localhost:8000/api/v1/payment/pay', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId: priceId,
      }),
    }).then(function (result) {
      return result.json();
    });
  };

  const setEmailFromSignUp = (e) => {
    setEmailSignUp(e.target.value);
  };
  const setusernameFromSignUp = (e) => {
    setUsername(e.target.value);
  };

  const setPasswordFromSignUp = (e) => {
    setPasswordSignUp(e.target.value);
  };
  const setPasswordConfrimFromSignUp = (e) => {
    setPasswordConfirmSignUp(e.target.value);
  };

  const signUpUser = async (e) => {
    let program = 'free';
    //  console.log(username,emailSignUp,passwordConfirmSignUp,passwordSignUp);
    e.preventDefault();

    if (price_id === 'price_1J084NJkVEDM03SsxUZmPVER') {
      program = 'pro';
    }
    if (price_id === 'price_1J081OJkVEDM03SsnZFRVUiO') {
      program = 'standard';
    }
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:8000/api/v1/users/signup',
      data: {
        name: username,
        email: emailSignUp,
        password: passwordSignUp,
        passwordConfirm: passwordConfirmSignUp,
        program: program,
        canAccess: false,
      },
    });

    if (res.data.status === 'success') {
      setSingUpSuccessfull(true);
      setUserEmail(emailSignUp);
      console.log('success', 'logged in successfully!');
      if (program === 'free') {
        window.setTimeout(() => {
          location.assign('/login');
        }, 1500);
        return;
      }
      createCheckoutSession(price_id).then(function (data) {
        // Call Stripe.js method to redirect to the new Checkout page
        console.log(data.sessionId);
        stripe
          .redirectToCheckout({
            sessionId: data.sessionId,
          })
          .then(handleResult);
      });
      //
      setUserAlreadyExistError(false);
      setShortPasswordError(false);
      setPasswordsAreNotTheSame(false);
    } else if (res.data.status === 'error') {
      console.log(res.data.error);
      if (res.data.error.startsWith('E11000')) {
        setUserAlreadyExistError(true);
        setShortPasswordError(false);
        setProvideValidEmail(false);
        setEnterNameError(false);
        setPasswordsAreNotTheSame(false);
      }
      if (res.data.error.includes('shorter than the minimum allowed length')) {
        setShortPasswordError(true);

        setUserAlreadyExistError(false);
        setProvideValidEmail(false);
        setEnterNameError(false);
        setPasswordsAreNotTheSame(false);
      }
      if (res.data.error.includes('Please provide  your email')) {
        setProvideValidEmail(true);
        setPasswordsAreNotTheSame(false);
        setShortPasswordError(false);
        setEnterNameError(false);
        setUserAlreadyExistError(false);
      }
      if (res.data.error.includes('Please provide a valid email')) {
        setProvideValidEmail(true);
        setPasswordsAreNotTheSame(false);
        setShortPasswordError(false);
        setUserAlreadyExistError(false);
        setEnterNameError(false);
      }
      if (res.data.error.includes('Please tell us your name')) {
        setProvideValidEmail(false);
        setEnterNameError(true);
        setPasswordsAreNotTheSame(false);
        setShortPasswordError(false);
        setUserAlreadyExistError(false);
      }
    }
  };

  const singUpPage = (
    <div className="sign_up-form_div">
      {singUpSuccessfull ? <SignUpSuccess /> : null}

      <form action="" className="sign_up-form">
        <h1 className="h1_signup">Create Your Account</h1>
        <div className="inputs_div">
          <div className="input_div">
            <label className="label_input" htmlFor="username">
              Username
            </label>
            <input
              onChange={setusernameFromSignUp}
              className="input input_username"
              type="text"
              id="username"
              placeholder="Username"
              required
            />
          </div>
          <div className="input_div">
            <label className="label_input" htmlFor="email">
              Email
            </label>
            <input
              onChange={setEmailFromSignUp}
              className="input input_email"
              type="email"
              id="email"
              placeholder="Email"
              required
            />
          </div>

          <div className="input_div">
            <label className="label_input" htmlFor="Password">
              Password
            </label>
            <input
              onChange={setPasswordFromSignUp}
              className="input input_password"
              type="password"
              id="password"
              placeholder="Password"
            />
          </div>
          <div
            className={
              shortPasswordError
                ? 'password_too_short_error'
                : 'unactive_error password_too_short_error'
            }
          >
            {shortPasswordError ? (
              <ShortPasswordError></ShortPasswordError>
            ) : null}
          </div>

          <div className="input_div">
            <label className="label_input" htmlFor="passwordConfirm">
              Password Confirm
            </label>
            <input
              onChange={setPasswordConfrimFromSignUp}
              className="input input_passwordConfirm"
              type="password"
              id="passwordConfirm"
              placeholder="Password confirm"
            />
          </div>
          <div
            className={
              passwordsAreNotTheSame
                ? 'password_too_short_error'
                : 'unactive_error password_too_short_error'
            }
          >
            {passwordsAreNotTheSame ? (
              <PasswordsAreNotTheSame></PasswordsAreNotTheSame>
            ) : null}
          </div>
          <button onClick={signUpUser} className="singup_button" type="submit">
            SIGN UP
          </button>
          <p className="login_paragraph">
            Already have an account?{' '}
            <Link to="/login" className="login_button">
              Login here
            </Link>{' '}
          </p>
          <div
            className={
              userAlreadyExistError
                ? 'user_already_exists_error'
                : 'unactive_error user_already_exists_error'
            }
          >
            {userAlreadyExistError ? (
              <UserAlreadyExists></UserAlreadyExists>
            ) : null}
          </div>
          <div
            className={
              provideValidEmail
                ? 'user_already_exists_error'
                : 'unactive_error user_already_exists_error'
            }
          >
            {provideValidEmail ? <ProvideValidEmail></ProvideValidEmail> : null}
          </div>
          <div
            className={
              enterNameError
                ? 'user_already_exists_error'
                : 'unactive_error user_already_exists_error'
            }
          >
            {enterNameError ? <PleaseEnterName></PleaseEnterName> : null}
          </div>
        </div>
      </form>
    </div>
  );
  return (
    <div className="SignUp">
      <NavbarSignUp className="NavBar" />
      {/* Sign up form */}
      {singUpPage}
      <FooterSignUp className="FooterSignUp" />
    </div>
  );
};

export default SignUp;
