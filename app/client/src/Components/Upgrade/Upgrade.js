import axios from "axios";
import React, { useContext } from "react";
import "../../App/App.css";
import AuthContextProvider from "../../context/AuthContext";
let stripe = Stripe(
  "pk_live_51IxxvcJkVEDM03SsDJYRumbzNygxWpd4o70wxhPFxHEDD0o51ep9fAlgSRC0Dgp3gRf2Sm4OauTQE9sxzwub6VTC00sDqLfPMN"
);
export default function Upgrade(props) {
  const { UserIDforUpgrade } = useContext(AuthContextProvider);
  const API_CALL =
    process.env.NODE_ENV === "development" ? "http://localhost:8000" : "";

  var createCheckoutSessionForUpgrade = function async(priceId) {
    return fetch(API_CALL + "/api/v1/users/upgradeMe", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        priceId: priceId,
        id: UserIDforUpgrade,
      }),
    }).then(function (result) {
      return result.json();
    });
  };

  const upgradeMe = (price_id) => {
    createCheckoutSessionForUpgrade(price_id).then(function (data) {
      // Call Stripe.js method to redirect to the new Checkout page
      stripe
        .redirectToCheckout({
          sessionId: data.sessionId,
        })
        .then(handleResult);
    });
  };

  const showAllPrograms = (
    <div className="upgradeTime">
      <div className="pricing_divUpgrade">
        {" "}
        <div className="pricing_package">Popular</div>
        <div className="pricing_price_div">
          <div className="pricing_perMonth_div">
            <span className="pricing_currency">€</span>20
          </div>
          <div className="pricing_perMonth">PER MONTH</div>
        </div>
        <div className="pricing_features">
          <ul className="pricing_features_list">
            <li className="pricing_features_item">10 Destinations</li>
            <li className="pricing_features_item">Daily destination prices</li>
            <li className="pricing_features_item">Online Support</li>
            <li className="pricing_features_item">Email notification</li>
          </ul>
        </div>
        <button
          onClick={() => {
            upgradeMe("price_1J9WzpJkVEDM03SsxQG21dAP");
          }}
          className="pricing_button pricing_button_buy"
        >
          Join now
        </button>{" "}
      </div>
      <div className="pricing_divUpgrade">
        <div className="pricing_package">Pro</div>
        <div className="pricing_price_div">
          <div className="pricing_perMonth_div">
            <span className="pricing_currency">€</span>30
          </div>
          <div className="pricing_perMonth">PER MONTH</div>
        </div>

        <div className="pricing_features">
          <ul className="pricing_features_list">
            <li className="pricing_features_item">25 Destinations</li>
            <li className="pricing_features_item">
              Daily destination prices
            </li>{" "}
            <li className="pricing_features_item">Online Support</li>
            <li className="pricing_features_item">Email notification</li>
          </ul>
        </div>
        <button
          onClick={() => {
            upgradeMe("price_1J9X0iJkVEDM03Ssi5S9neE1");
          }}
          className="pricing_button pricing_button_buy"
        >
          Join now
        </button>
      </div>
    </div>
  );

  const showOnlyProProgram = (
    <div className="pricing_divUpgrade">
      <div className="pricing_package">Pro</div>
      <div className="pricing_price_div">
        <div className="pricing_perMonth_div">
          <span className="pricing_currency">€</span>30
        </div>
        <div className="pricing_perMonth">PER MONTH</div>
      </div>

      <div className="pricing_features">
        <ul className="pricing_features_list">
          <li className="pricing_features_item">25 Destinations</li>
          <li className="pricing_features_item">
            Daily destination prices
          </li>{" "}
          <li className="pricing_features_item">Online Support</li>
          <li className="pricing_features_item">Email notification</li>
        </ul>
      </div>
      <button
        onClick={() => {
          upgradeMe("price_1J9WzpJkVEDM03SsxQG21dAP");
        }}
        className="pricing_button pricing_button_buy"
      >
        Join now
      </button>
    </div>
  );

  const showMaximumUpdated = (
    <h1>
      This is the maximum program, please contact our support, if you want a
      program specified for you :D{" "}
    </h1>
  );

  return (
    <>
      {/* if the program is standard show only pro version */}
      {!props.standardProgram && !props.proProgram ? showAllPrograms : null}
      {!props.standardProgram && props.proProgram ? showMaximumUpdated : null}
    </>
  );
}
