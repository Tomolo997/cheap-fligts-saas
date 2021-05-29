import "core-js";
import "regenerator-runtime/runtime";
import React, { Fragment, useState, useContext } from "react";
import NavbarSignUp from "../NavbarSignUp/NavbarSignUp";
import FooterSignUp from "../FooterSignUp/FooterSignUp";
import SignUpSuccess from "../signUpSuccess/signUpSuccess";
import axios from "axios";
import UserAlreadyExists from "../Errors/UserAlreadyExists";
import ShortPasswordError from "../Errors/ShortPasswordError";
import PasswordsAreNotTheSame from "../Errors/PasswordsAreNotTheSame";
import "../../App/App.css";
import AuthContext from "../../context/AuthContext";
import LoginSuccess from "../LoginSuccess/LoginSuccess";
const SignUp = () => {
  const [login, setLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [singUpSuccessfull, setSingUpSuccessfull] = useState(false);
  const [loginSuccessfull, setLoginSuccessfull] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [emailSignUp, setEmailSignUp] = useState("");
  const [passwordSignUp, setPasswordSignUp] = useState("");
  const [passwordConfirmSignUp, setPasswordConfirmSignUp] = useState("");
  const [userAlreadyExistError, setUserAlreadyExistError] = useState(false);
  const [shortPasswordError, setShortPasswordError] = useState(false);
  const [passwordsAreNotTheSame, setPasswordsAreNotTheSame] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const { getLoggedIn } = useContext(AuthContext);
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

    const res = await axios(
      {
        method: "POST",
        url: "http://localhost:8000/api/v1/users/login",
        data: {
          email: email,
          password: password,
        },
      },
      {
        withCredentials: true,
      }
    );

    if (res.data.status === "success") {
      setLoginSuccessfull(true);
      window.setTimeout(() => {
        location.assign("/dashboard");
      }, 1500);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const signUpUser = async (e) => {
    //  console.log(username,emailSignUp,passwordConfirmSignUp,passwordSignUp);
    e.preventDefault();

    const res = await axios({
      method: "POST",
      url: "http://localhost:8000/api/v1/users/signup",
      data: {
        name: username,
        email: emailSignUp,
        password: passwordSignUp,
        passwordConfirm: passwordConfirmSignUp,
      },
    });
    if (res.data.status === "success") {
      setSingUpSuccessfull(true);
      console.log("success", "logged in successfully!");

      window.setTimeout(() => {
        location.assign("/dashboard");
      }, 1500);
      setUserAlreadyExistError(false);
      setShortPasswordError(false);
      setPasswordsAreNotTheSame(false);
    } else if (res.data.status === "error") {
      if (res.data.error.startsWith("E11000")) {
        setUserAlreadyExistError(true);
        setShortPasswordError(false);
        setPasswordsAreNotTheSame(false);
      }
      if (res.data.error.includes("shorter than the minimum allowed length")) {
        setShortPasswordError(true);
        setUserAlreadyExistError(false);
        setPasswordsAreNotTheSame(false);
      }
      if (res.data.error.includes("passwordConfirm")) {
        setPasswordsAreNotTheSame(true);
        setShortPasswordError(false);
        setUserAlreadyExistError(false);
      }
    }
  };

  const loginPage = (
    <div className="sign_up-form_div">
      {loginSuccessfull ? (
        <LoginSuccess
          message={"Logged in succesfully, redirecting to your dashboard 😀"}
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
            Dont have an account ?{" "}
            <button onClick={changeLoginPage} className="login_button">
              Sign up here
            </button>{" "}
          </p>
        </div>
        <div
          className={
            loginError
              ? "password_too_short_error"
              : "unactive_error password_too_short_error"
          }
        >
          {loginError ? (
            <div>Incorrect email or password! please try again</div>
          ) : null}
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
          <div
            className={
              shortPasswordError
                ? "password_too_short_error"
                : "unactive_error password_too_short_error"
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
                ? "password_too_short_error"
                : "unactive_error password_too_short_error"
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
            Already have an account?{" "}
            <button onClick={changeLoginPage} className="login_button">
              Login here
            </button>{" "}
          </p>
          <div
            className={
              userAlreadyExistError
                ? "user_already_exists_error"
                : "unactive_error user_already_exists_error"
            }
          >
            {userAlreadyExistError ? (
              <UserAlreadyExists></UserAlreadyExists>
            ) : null}
          </div>
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
