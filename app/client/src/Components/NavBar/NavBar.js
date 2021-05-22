import React, { useContext, useRef } from "react";
import "../../App/App.css";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthContextProvider from "../../context/AuthContext";
export default function NavBar(props) {
  const { loggedIn, getLoggedIn } = useContext(AuthContextProvider);

  // run this function from an event handler or an effect to execute scroll

  return (
    <div className="NavBar">
      <h1 className="logo_h1">
        Cost <span className="logo_friendly_span">friendly</span> flights
      </h1>
      <div className="middle_navbar_div">
        <button className="nav_button" onClick={props.executeScroll}>
          About
        </button>
        <button className="nav_button" onClick={props.executeScrollToPricing}>
          Pricing
        </button>
        <button className="nav_button" onClick={props.executeScrollToContact}>
          Contact
        </button>
      </div>

      <div className="navbar_sign-in">
        {loggedIn === false && (
          <Link to="/sign-up" className="signUp_link">
            Sign in
          </Link>
        )}
        {loggedIn === true && (
          <Link to="/dashboard" className="signUp_link">
            Dashboard
          </Link>
        )}
      </div>
    </div>
  );
}
