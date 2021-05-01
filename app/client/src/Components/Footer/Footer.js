import React from "react";
import "../../App/App.css";
import TwitterLogo from "../../../../Images/twitter_logo.svg";
export default function Footer() {
  return (
    <div className="Footer">
      <div className="footer_div">
        <div className="footer_socialMedia">
          <div>
            <img src={TwitterLogo}></img>
          </div>
          <div>Linked in</div>
        </div>
        <div className="footer_info">
          <div>info</div>
        </div>
        <div className="footer_support">
          <div>Support</div>
          <div>Terms of use</div>
        </div>

        <div className="footer_companyAt">@CostFriendlyFlights</div>
      </div>
    </div>
  );
}
