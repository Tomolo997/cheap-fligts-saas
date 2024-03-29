import React from 'react';
import '../../App/App.css';
import logo from '../../assets/Images/WhiteLogo.png';
export default function AboutSection(props) {
  return (
    <div className="AboutSection" ref={props.myRefToAbout}>
      <div className="mainText_aboutSection">
        <div className="logoImage_div">
          <img src={logo} alt="white Logo" className="logoImage" />
        </div>
        <div className="marketingSection">
          <h1 className="h1_marketingSection">
            Daily cost friendly flights from pre-selected airports or countries.
            Improve your{' '}
            <span className="marketingSection_span">travel offers</span> and{' '}
            <span className="marketingSection_span"> save time</span> searching
            for cheap flights.
          </h1>
        </div>
      </div>
    </div>
  );
}
