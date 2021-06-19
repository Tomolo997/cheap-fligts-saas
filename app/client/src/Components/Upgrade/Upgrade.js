import React from 'react';
import '../../App/App.css';
let stripe = Stripe(
  'pk_test_51IxxvcJkVEDM03SsyEouRlG0tukqWjdFC8KiBhTZnOVJcXIQOgEF0EKarkcJGz1CGvfgE8MRinNxx3kLzOZ5Qsrd00Zv1hZwMt'
);
export default function Upgrade() {
  var createCheckoutSession = function (priceId) {
    return fetch('http://localhost:8000/api/v1/payment/pay', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId: priceId,
      }),
    }).then(function (result) {
      return result.json();
    });
  };

  const upgradeMe = (price_id) => {
    createCheckoutSession(price_id).then(function (data) {
      // Call Stripe.js method to redirect to the new Checkout page
      console.log(data.sessionId);
      stripe
        .redirectToCheckout({
          sessionId: data.sessionId,
        })
        .then(handleResult);
    });
  };

  return (
    <div className="upgradeTime">
      <div className="pricing_divUpgrade">
        {' '}
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
        <button
          onClick={() => {
            upgradeMe('price_1J081OJkVEDM03SsnZFRVUiO');
          }}
          className="pricing_button pricing_button_buy"
        >
          Join now
        </button>{' '}
      </div>
      <div className="pricing_divUpgrade">
        <div className="pricing_package">Pro</div>
        <div className="pricing_price_div">
          <div className="pricing_perMonth_div">
            <span className="pricing_currency">€</span>80
          </div>
          <div className="pricing_perMonth">PER MONTH</div>
        </div>

        <div className="pricing_features">
          <ul className="pricing_features_list">
            <li className="pricing_features_item">30 Destinations</li>
            <li className="pricing_features_item">
              Daily destination prices
            </li>{' '}
            <li className="pricing_features_item">Online Support</li>
            <li className="pricing_features_item">Email notification</li>
          </ul>
        </div>
        <button
          onClick={() => {
            upgradeMe('price_1J084NJkVEDM03SsxUZmPVER');
          }}
          className="pricing_button pricing_button_buy"
        >
          Join now
        </button>
      </div>
    </div>
  );
}