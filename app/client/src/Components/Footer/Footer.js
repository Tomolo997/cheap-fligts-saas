import React from 'react';
import '../../App/App.css';
import LinkedInLogo from '../../assets/Images/LinkedInLogo.png';
import TwitterLogo from '../../assets/Images/TwitterLogo.png';
export default function Footer() {
  return (
    <div className="Footer">
      <div className="footer_div">
        <div className="footer_socialMedia">
          <div>
            <a href="www.linkedIn.com">
              <img src={LinkedInLogo} />
            </a>
          </div>

          <div>
            <a href="www.twitter.com">
              <img src={TwitterLogo} />
            </a>
          </div>
        </div>

        <div className="footer_support">
          <div>
            <a className="footer_link" href="">
              Support
            </a>{' '}
          </div>
          <div>
            <a className="footer_link" href="/">
              Terms of use
            </a>{' '}
          </div>
        </div>

        <div className="footer_companyAt">@CostFriendlyFlights</div>
      </div>
    </div>
  );
}
