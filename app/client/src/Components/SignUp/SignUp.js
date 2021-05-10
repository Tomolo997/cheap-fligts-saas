import 'core-js';
import 'regenerator-runtime/runtime';
import React, { Fragment, useState } from 'react';
import NavbarSignUp from '../NavbarSignUp/NavbarSignUp';
import FooterSignUp from '../FooterSignUp/FooterSignUp';
import SignUpSuccess from '../signUpSuccess/signUpSuccess';
import axios from 'axios';
import '../../App/App.css';
const SignUp = () => {
  const [login, setLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [singUpSuccessfull, setSingUpSuccessfull] = useState(false);
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [emailSignUp, setEmailSignUp] = useState('');
  const [passwordSignUp, setPasswordSignUp] = useState('');
  const [passwordConfirmSignUp, setPasswordConfirmSignUp] = useState('');
  const changeLoginPage = (e) => {
    e.preventDefault();
    setLogin(!login);
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

  const setEmailFromLogin = (e) => {
    setEmail(e.target.value);
  };
  const setPasswordFromLogin = (e) => {
    setPassword(e.target.value);
  };

  const loginUser = async (e) => {
    e.preventDefault();

    try {
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
        console.log('success', 'logged in successfully!');
        // window.setTimeout(() => {
        //   location.assign('/dashboard');
        // }, 1500);
      }
    } catch (error) {
      console.log('error', error.message);
    }
  };
  const logout = async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: 'http://localhost:3000/api/v1/users/logout',
      });
      if (res.data.status === 'success') {
        location.reload(true);
      }
    } catch (error) {
      console.log(error.response);
      showAlert('error', 'error logging out ! try again');
    }
  };

  const signUpUser = async (e) => {
    //  console.log(username,emailSignUp,passwordConfirmSignUp,passwordSignUp);
    e.preventDefault();

    try {
      const res = await axios({
        method: 'POST',
        url: 'http://localhost:8000/api/v1/users/signup',
        data: {
          name: username,
          email: emailSignUp,
          password: passwordSignUp,
          passwordConfirm: passwordConfirmSignUp,
        },
      });
      if (res.data.status === 'success') {
        setSingUpSuccessfull(true);
        console.log('success', 'logged in successfully!');

        window.setTimeout(() => {
          location.assign('/dashboard');
        }, 1500);
      }
    } catch (error) {
      console.log('error', error.message);
    }
  };

  const loginPage = (
    <div className="sign_up-form_div">
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
            <button onClick={changeLoginPage} className="login_button">
              Sign up here
            </button>{' '}
          </p>
        </div>
      </form>
    </div>
  );

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
            />
          </div>
          <div className="input_div">
            <label className="label_input" htmlFor="email">
              Email
            </label>
            <input
              onChange={setEmailFromSignUp}
              className="input input_email"
              type="text"
              id="email"
              placeholder="Email"
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
          <button onClick={signUpUser} className="singup_button" type="submit">
            SIGN UP
          </button>
          <p className="login_paragraph">
            Already have an account ?{' '}
            <button onClick={changeLoginPage} className="login_button">
              Login here
            </button>{' '}
          </p>
        </div>
      </form>
    </div>
  );
  return (
    <div className="SignUp">
      <NavbarSignUp className="NavBar" />
      {/* Sign up form */}
      {login ? loginPage : singUpPage}
      <FooterSignUp className="FooterSignUp" />
    </div>
  );
};

export default SignUp;
