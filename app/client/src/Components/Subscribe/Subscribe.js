import React, { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import FooterSignUp from '../FooterSignUp/FooterSignUp';
import NavbarSignUp from '../NavbarSignUp/NavbarSignUp';

export default function Subscribe() {
  const { userEmail } = useContext(AuthContext);

  return (
    <div className="SignUp">
      <NavbarSignUp className="NavBar" />
      {/* Sign up form */}
      {userEmail}
      <FooterSignUp className="FooterSignUp" />
    </div>
  );
}
