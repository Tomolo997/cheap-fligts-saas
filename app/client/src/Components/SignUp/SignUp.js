import React, { Fragment } from 'react';
import NavbarSignUp from '../NavbarSignUp/NavbarSignUp';
import FooterSignUp from '../FooterSignUp/FooterSignUp';
import '../../App/App.css';
const SignUp = () => {
  return (
    <div className="SignUp">
      <NavbarSignUp className="NavBar" />
      <FooterSignUp />
    </div>
  );
};

export default SignUp;
