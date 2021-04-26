import React from 'react';
import '../../App/App.css';
import { Link } from 'react-router-dom';

const NavbarSignUp = () => {
  return (
    <div className="NavBar">
      {' '}
      <div>logo</div>
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
