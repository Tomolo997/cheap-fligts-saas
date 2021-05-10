import React, { useContext } from 'react';
import '../../App/App.css';
import { Link } from 'react-router-dom';
import AuthContextProvider from '../../context/AuthContext';
export default function NavBar() {
  const loggedIn = useContext(AuthContextProvider);
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
        {!loggedIn.loggedIn ? (
          <Link to="/sign-up" className="signUp_link">
            Sign in
          </Link>
        ) : (
          <Link to="/sign-up" className="signUp_link">
            Sign Out
          </Link>
        )}
      </div>
    </div>
  );
}
