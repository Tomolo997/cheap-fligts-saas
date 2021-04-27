import React, { Fragment, useState } from 'react';
import NavbarSignUp from '../NavbarSignUp/NavbarSignUp';
import FooterSignUp from '../FooterSignUp/FooterSignUp';
import '../../App/App.css';
const SignUp = () => {
  const [login, setLogin] = useState(false);

  const changeLoginPage = (e) => {
    e.preventDefault();
    setLogin(!login);
    console.log(login);
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
              className="input input_password"
              type="password"
              id="password"
              placeholder="Password"
            />
          </div>

          <button className="singup_button login_button_changed" type="submit">
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
      <form action="" className="sign_up-form">
        <h1 className="h1_signup">Create Your Account</h1>
        <div className="inputs_div">
          <div className="input_div">
            <label className="label_input" htmlFor="username">
              Username
            </label>
            <input
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
              className="input input_passwordConfirm"
              type="password"
              id="passwordConfirm"
              placeholder="Password confirm"
            />
          </div>
          <button className="singup_button" type="submit">
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
