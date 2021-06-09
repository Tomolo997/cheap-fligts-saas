import 'core-js';
import 'regenerator-runtime/runtime';
import React, { useState, useContext } from 'react';
import NavbarSignUp from '../NavbarSignUp/NavbarSignUp';
import FooterSignUp from '../FooterSignUp/FooterSignUp';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../App/App.css';
import AuthContext from '../../context/AuthContext';
import LoginSuccess from '../LoginSuccess/LoginSuccess';
const LoginPage = () => {
  const [login, setLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [singUpSuccessfull, setSingUpSuccessfull] = useState(false);
  const [loginSuccessfull, setLoginSuccessfull] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const { price_id, getLoggedIn } = useContext(AuthContext);

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

  const setEmailFromLogin = (e) => {
    setEmail(e.target.value);
  };
  const setPasswordFromLogin = (e) => {
    setPassword(e.target.value);
  };

  const loginUser = async (e) => {
    e.preventDefault();

    const res = await axios(
      {
        method: 'POST',
        url: 'http://localhost:8000/api/v1/users/login',
        data: {
          email: email,
          password: password,
        },
      },
      {
        withCredentials: true,
      }
    );

    if (res.data.status === 'success') {
      setLoginSuccessfull(true);
      window.setTimeout(() => {
        location.assign('/dashboard');
      }, 1500);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const loginPage = (
    <div className="sign_up-form_div">
      {loginSuccessfull ? (
        <LoginSuccess
          message={'Logged in succesfully, redirecting to your dashboard 😀'}
        />
      ) : null}
      <form action="" className="sign_up-form">
        <h1 className="h1_signup">Log in</h1>
        <div className="inputs_div">
          <div className="input_div">
            <label className="label_input" htmlFor="email">
              Email
            </label>
            <input
              onChange={setEmailFromLogin}
              className="input input_email"
              type="text"
              id="email_login"
              placeholder="Email"
            />
          </div>
          <div className="input_div">
            <label className="label_input" htmlFor="Password">
              Password
            </label>
            <input
              onChange={setPasswordFromLogin}
              className="input input_password"
              type="password"
              id="password"
              placeholder="Password"
            />
          </div>

          <button
            onClick={loginUser}
            className="singup_button login_button_changed"
            type="submit"
          >
            Log in
          </button>

          <p className="login_paragraph">
            Dont have an account ?{' '}
            <Link to="/sign-up" className="login_button">
              Sign up here
            </Link>{' '}
          </p>
        </div>
        <div
          className={
            loginError
              ? 'password_too_short_error'
              : 'unactive_error password_too_short_error'
          }
        >
          {loginError ? (
            <div>Incorrect email or password! please try again</div>
          ) : null}
        </div>
      </form>
    </div>
  );

  return (
    <div className="SignUp">
      <NavbarSignUp className="NavBar" />
      {/* Sign up form */}
      {loginPage}
      <FooterSignUp className="FooterSignUp" />
    </div>
  );
};

export default LoginPage;