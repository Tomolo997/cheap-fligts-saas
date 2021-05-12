import React, { useState, useContext } from 'react';
import '../../App/App.css';
import BurgerNav from '../BurgerNav/BurgerNav';
import MyFlights from '../MyFlights/MyFlights';
import Suggestions from '../Suggestions/Suggestions';
import AddAFlight from '../AddAFlight/AddAFlight';
import DashboardLogo from '../DashboardLogo/DashboardLogo';
import AuthContextProvider from '../../context/AuthContext';

export default function Dashboard() {
  const { slider, setSlider } = useContext(AuthContextProvider);
  const [myFlightsShow, setMyFlightsShow] = useState(true);
  const [suggestionsShow, setSuggestionsShow] = useState(false);
  const [addAFlightShow, setAddAFlightShow] = useState(false);

  const showMyFlights = () => {
    setMyFlightsShow(true);
    setSuggestionsShow(false);
    setAddAFlightShow(false);
  };
  const showSuggestions = () => {
    setMyFlightsShow(false);
    setSuggestionsShow(true);
    setAddAFlightShow(false);
  };
  const showAddAFlight = () => {
    setMyFlightsShow(false);
    setSuggestionsShow(false);
    setAddAFlightShow(true);
  };
  const thinSlider = (
    <div className="slider_thin">
      <div className="dashboard_slider_header">
        <DashboardLogo />
        <BurgerNav />
      </div>{' '}
      <div className="slider_mainComponents" style={{ display: 'none' }}>
        <div className="slider_component slider_component_hover">
          {' '}
          <h1 className="slider_component_h1">My flights</h1>
        </div>
        <div className="slider_component slider_component_hover">
          {' '}
          <h1 className="slider_component_h1">Suggestions</h1>
        </div>
        <div className="slider_component slider_component_hover">
          {' '}
          <h1 className="slider_component_h1">Add a flight</h1>
        </div>
      </div>
      <div className="slider_settings" style={{ display: 'none' }}>
        <div className="slider_component slider_component_settings">
          <h1 className="slider_component_h1">Settings</h1>
        </div>
        <div className="slider_component slider_component_settings">
          {' '}
          <h1 className="slider_component_h1"> Help</h1>
        </div>
        <div className="slider_component_settings">
          {' '}
          All rights reserved By @TomažOvsenjak
        </div>
      </div>
    </div>
  );

  const fatSlider = (
    <div className="slider">
      <div className="dashboard_slider_header">
        <DashboardLogo />
        <BurgerNav />
      </div>{' '}
      <div className="slider_mainComponents">
        <div
          onClick={showMyFlights}
          className="slider_component slider_component_hover"
        >
          {' '}
          <h1 className="slider_component_h1">My flights</h1>
        </div>
        <div
          onClick={showSuggestions}
          className="slider_component slider_component_hover"
        >
          {' '}
          <h1 className="slider_component_h1">Suggestions</h1>
        </div>
        <div
          onClick={showAddAFlight}
          className="slider_component slider_component_hover"
        >
          {' '}
          <h1 className="slider_component_h1">Add a flight</h1>
        </div>
      </div>
      <div className="slider_settings">
        <div className="slider_component slider_component_settings">
          <h1 className="slider_component_h1">Settings</h1>
        </div>
        <div className="slider_component slider_component_settings">
          {' '}
          <h1 className="slider_component_h1"> Help</h1>
        </div>
        <div className="slider_component_settings">
          {' '}
          All rights reserved By @TomažOvsenjak
        </div>
      </div>
    </div>
  );
  return (
    <>
      <div className={slider ? 'dashboard' : 'dashboard_hide'}>
        {slider ? fatSlider : thinSlider}
        <div className="dashboard_mainInfo">
          {myFlightsShow && <MyFlights />}
          {suggestionsShow && <Suggestions />}
          {addAFlightShow && <AddAFlight />}
        </div>
      </div>
    </>
  );
}
