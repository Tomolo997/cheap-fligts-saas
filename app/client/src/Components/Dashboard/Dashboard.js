import React, { useState, useContext, useEffect } from 'react';
import '../../App/App.css';
import BurgerNav from '../BurgerNav/BurgerNav';
import MyFlights from '../MyFlights/MyFlights';
import Suggestions from '../Suggestions/Suggestions';
import AddAFlight from '../AddAFlight/AddAFlight';
import DashboardLogo from '../DashboardLogo/DashboardLogo';
import AuthContextProvider from '../../context/AuthContext';
import axios from 'axios';
import { async } from 'regenerator-runtime';

export default function Dashboard() {
  const { slider, setSlider } = useContext(AuthContextProvider);
  const [myFlightsShow, setMyFlightsShow] = useState(true);
  const [suggestionsShow, setSuggestionsShow] = useState(false);
  const [addAFlightShow, setAddAFlightShow] = useState(false);

  const [flightsResults, setFlightsResults] = useState([]);
  const [userId, setUserId] = useState('');
  const [fromToStart, setFromToStart] = useState([]);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const getMe = async () => {
    const res = await axios.get('http://localhost:8000/api/v1/users/getMe');
    setUserId(res.data.id);
    setUserName(res.data.name);
    setUserEmail(res.data.email);
  };

  const getUserFlights = async () => {
    const res = await axios.get(
      'http://localhost:8000/api/v1/flights/getMyFlights'
    );
    const flightResults = await res.data.data.flights;
    console.log(flightResults);
    setFlightsResults(flightResults);

    // const fromToArray = [];
    const fromToArray = [];
    for (let index = 0; index < flightResults.length; index++) {
      const element = flightResults[index];

      fromToArray.push({
        fromStart: element.results[0].flightFromSTART,
        toStart: element.results[0].flightToSTART,
        results: element.results,
        flightId: element.id,
      });
    }
    setFromToStart(fromToArray);
  };

  const decunstructTheData = async (data) => {
    console.log(fromToStart);
  };

  useEffect(() => {
    getMe();
    getUserFlights();
  }, []);

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
    <div onClick={decunstructTheData} className="slider">
      <div className="dashboard_slider_header">
        <DashboardLogo />
        <BurgerNav />
      </div>{' '}
      <div className="slider_mainComponents">
        hello {userName}
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

  const myFlightDivs = fromToStart.map((el) => (
    <MyFlights
      key={el.flightId}
      from={el.fromStart}
      to={el.toStart}
      results={el.results}
    />
  ));
  const yeA = () => {
    console.log(myFlightDivs);
  };
  return (
    <>
      <div onClick={yeA} className={slider ? 'dashboard' : 'dashboard_hide'}>
        {slider ? fatSlider : thinSlider}
        <div className="dashboard_mainInfo">
          {myFlightsShow && myFlightDivs}
          {suggestionsShow && <Suggestions />}
          {addAFlightShow && <AddAFlight />}
        </div>
      </div>
    </>
  );
}
