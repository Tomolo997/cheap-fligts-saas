import "core-js";
import "regenerator-runtime/runtime";
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import NavbarSignUp from "../NavbarSignUp/NavbarSignUp";
import FooterSignUp from "../FooterSignUp/FooterSignUp";
import "../../App/App.css";
const VerifyME = ({ match }) => {
  const API_CALL =
    process.env.NODE_ENV === "development" ? "http://localhost:8000" : "";

  const verify = (
    <div className="verified">
      You are now verified{" "}
      <a className="verified_login" href="/login">
        Go to login page and login
      </a>
    </div>
  );
  const { id, token } = useParams();
  useEffect(() => {
    verifyyyyyye();
  }, []);
  const verifyyyyyye = async () => {
    const res = await axios.put(API_CALL + "/api/v1/users/verification", {
      data: {
        id: id,
        token: token,
      },
    });
  };

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
