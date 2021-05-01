import React from "react";
import "../../App/App.css";
import { Link } from "react-router-dom";
export default function NavBar() {
  return (
    <div className="NavBar">
      <h1 className="logo_h1">
        Cost <span className="logo_friendly_span">friendly</span> flights
      </h1>
      <div className="middle_navbar_div">
        <button className="nav_button">About</button>
        <button className="nav_button">Pricing</button>
        <button className="nav_button">Contact</button>
      </div>

      <div className="navbar_sign-in">
        <Link to="/sign-up" className="signUp_link">
          Sign in
        </Link>
      </div>
    </div>
  );
}
