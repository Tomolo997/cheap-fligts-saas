import 'core-js';
import 'regenerator-runtime/runtime';
import React, { useState, useContext } from 'react';
import NavbarSignUp from '../NavbarSignUp/NavbarSignUp';
import FooterSignUp from '../FooterSignUp/FooterSignUp';
import '../../App/App.css';
const VerifyME = () => {
  const verify = <div>verifyME</div>;

  return (
    <div className="SignUp">
      <NavbarSignUp className="NavBar" />
      {/* Sign up form */}
      {verify}
      <FooterSignUp className="FooterSignUp" />
    </div>
  );
};

export default VerifyME;
