import React from 'react';
import '../../App/App.css';
import { Link } from 'react-router-dom';
import logo from '../../../../Images/CheapLogo.png';
const NavbarSignUp = () => {
  return (
    <div className="NavBar">
      {' '}
      <Link to="/" className="logo_link">
        <h1 className="logo_h1 logo_h1_singup">
          Cheap <span className="logo_friendly_span">friendly</span> flights
        </h1>
      </Link>
      <div className="middle_navbar_div"></div>
      <div className="navbar_sign-in">
        <Link to="/" className="signUp_link">
          Home
        </Link>
      </div>
    </div>
  );
};

export default NavbarSignUp;
