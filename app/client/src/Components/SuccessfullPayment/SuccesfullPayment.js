import "core-js";
import "regenerator-runtime/runtime";
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import NavbarSignUp from "../NavbarSignUp/NavbarSignUp";
import FooterSignUp from "../FooterSignUp/FooterSignUp";
import "../../App/App.css";
import { async } from "regenerator-runtime";
const SuccessfullPayment = ({ match }) => {
  const verify = (
    <div className="verified">
      <h1>You have succefully paid for the App</h1>
      <div>
        {" "}
        <a href="/login">Login here</a>{" "}
      </div>
    </div>
  );
  const { token } = useParams();
  useEffect(async () => {
    await axios.post("http://localhost:8000/api/v1/payment/successPayment", {
      token: token,
    });
  }, []);
  return (
    <div className="SignUp">
      <NavbarSignUp className="NavBar" />
      {/* Sign up form */}
      {verify}
      <FooterSignUp className="FooterSignUp" />
    </div>
  );
};

export default SuccessfullPayment;
