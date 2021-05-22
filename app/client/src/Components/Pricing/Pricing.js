import React from "react";
import "../../App/App.css";

export default function Pricing(props) {
  return (
    <div className="Pricing" ref={props.myRefToPricing}>
      <h1 className="pricing_title">PRICING</h1>
      <div className="pricing_normal pricing_div">
        <div className="pricing_package">Normal</div>
        <div className="pricing_price_div">
          <div className="pricing_perMonth_div">
            <span className="pricing_currency">€</span>20
          </div>
          <div className="pricing_perMonth">PER MONTH</div>
        </div>

        <div className="pricing_features">
          <ul className="pricing_features_list">
            <li className="pricing_features_item">8 Destinations</li>
            <li className="pricing_features_item">Daily destination prices</li>
            <li className="pricing_features_item">Online Support</li>
          </ul>
        </div>
        <button className="pricing_button pricing_button_buy">Join now</button>
      </div>
      <div className="pricing_popular pricing_div">
        {" "}
        <div className="pricing_package">Popular</div>
        <div className="pricing_price_div">
          <div className="pricing_perMonth_div">
            <span className="pricing_currency">€</span>30
          </div>
          <div className="pricing_perMonth">PER MONTH</div>
        </div>
        <div className="pricing_features">
          <ul className="pricing_features_list">
            <li className="pricing_features_item">15 Destinations</li>
            <li className="pricing_features_item">Daily destination prices</li>
            <li className="pricing_features_item">Online Support</li>
            <li className="pricing_features_item">Email notifications</li>
          </ul>
        </div>
        <button className="pricing_button pricing_button_buy">Join now</button>{" "}
      </div>
      <div className="pricing_pro pricing_div">
        <div className="pricing_package">Pro</div>
        <div className="pricing_price_div">
          <div className="pricing_perMonth_div">
            <span className="pricing_currency">€</span>80
          </div>
          <div className="pricing_perMonth">PER MONTH</div>
        </div>

        <div className="pricing_features">
          <ul className="pricing_features_list">
            <li className="pricing_features_item">Unlimited Destinations</li>
            <li className="pricing_features_item">
              Daily destination prices
            </li>{" "}
            <li className="pricing_features_item">Online Support</li>
            <li className="pricing_features_item">Email notification</li>
          </ul>
        </div>
        <button className="pricing_button pricing_button_buy">Join now</button>
      </div>
    </div>
  );
}
