import React, { useState, useContext, useEffect } from 'react';
import '../../App/App.css';
import BurgerNav from '../BurgerNav/BurgerNav';
import MyFlights from '../MyFlights/MyFlights';
import Suggestions from '../Suggestions/Suggestions';
import AddAFlight from '../AddAFlight/AddAFlight';
import DashboardLogo from '../DashboardLogo/DashboardLogo';
import AuthContextProvider from '../../context/AuthContext';
import axios from 'axios';
import Spinner from '../Spinner/Spinner';
import { async } from 'regenerator-runtime';
import LoginSuccess from '../LoginSuccess/LoginSuccess';
import AirportSVG from '../../../public/Images/airplane.svg';
import NewMessageSVG from '../../../public/Images/new-message.svg';
import AddAFlightSVG from '../../../public/Images/circle-with-plus.svg';

export default function Dashboard() {
  const { slider, setSlider } = useContext(AuthContextProvider);
  const [loginSuccessfull, setLoginSuccessfull] = useState(false);
  const [airportsFromDB, setAirportsFromDB] = useState([]);
  const [myFlightsShow, setMyFlightsShow] = useState(true);
  const [suggestionsShow, setSuggestionsShow] = useState(false);
  const [addAFlightShow, setAddAFlightShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [flightsResults, setFlightsResults] = useState([]);
  const [deletedFlightID, setDeletedFlightID] = useState('');
  const [deletedflightResultsId, setDeletedflightResultsId] = useState('');
  const [userId, setUserId] = useState('');
  const [fromToStart, setFromToStart] = useState([]);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const getMe = async () => {
    const res = await axios.get('http://localhost:8000/api/v1/users/getMe');
    const fuckingAirports = await axios.get(
      'http://localhost:8000/api/v1/users/airports'
    );
    setAirportsFromDB(fuckingAirports.data.airports[0].data);
    setUserId(res.data.id);
    setUserName(res.data.name);
    setUserEmail(res.data.email);
  };

  const deleteFlight = async () => {
    const res = await axios.delete(
      'http://localhost:8000/api/v1/flights/deleteFlight',
      {
        data: {
          user: userId,
          flightID: deletedFlightID,
          flightResultsId: deletedflightResultsId,
        },
      }
    );
  };

  const getUserFlights = async () => {
    const res = await axios.get(
      'http://localhost:8000/api/v1/flights/getMyFlights'
    );
    const flightResults = await res.data.data.flights;
    const initData = await res.data.data.initData;
    const noResults = await res.data.data.noResults;
    const userID = flightResults[0].user;
    setFlightsResults(flightResults);
    // const fromToArray = [];
    const fromToArray = [];
    for (let index = 0; index < flightResults.length; index++) {
      const element = flightResults[index];
      console.log(element);
      const findFlight = initData.find((el) => el._id === element.flightID);
      fromToArray.push({
        fromStart: element.results[0].flightFromSTART,
        toStart: element.results[0].flightToSTART,
        results: element.results,
        flightResultsID: element.id,
        flightId: element.flightID,
        dateTo: findFlight.inboundDate,
        dateFrom: findFlight.outboundDate,
      });
    }
    console.log('flight results', flightResults);
    console.log('No results', noResults);
    for (let i = 0; i < noResults.length; i++) {
      const element = noResults[i];
      fromToArray.push({
        fromStart: element.flightFrom,
        toStart: element.flightTo,
        results: [
          {
            flightFromSTART: element.flightFrom,
            flightID: element._id,
            flightToSTART: element.flightTo,
            formDate: '2021-05-22T00:00:00.000',
            fromFlight: 'No Data',
            fromFlightCountry: 'No Data',
            link: 'No Data',
            price: 'No Data',
            toDate: '2021-05-22T00:00:00.000Z',
            toFlight: 'No Data',
            toFlightCountry: 'No Data',
            updated: 1621616899340,
            user: userID,
          },
        ],
        dateTo: element.inboundDate,
        flightId: element._id,
        dateFrom: element.outboundDate,
      });
    }
    // for (let index = 0; index < noDataFlights.length; index++) {
    //   const element = noDataFlights[index];
    //   fromToArray.push({
    //     fromStart: 'no results :(',
    //     toStart: 'no results :(',
    //     results: 'no results :(',
    //     flightId: 'no results :(',
    //   });
    // }
    console.log('from to start', fromToArray);
    setFromToStart(fromToArray);
    setLoading(false);
  };

  useEffect(() => {
    getMe();
    getUserFlights();
  }, []);

  async function logoutBtn() {
    try {
      const res = await axios.get('http://localhost:8000/api/v1/users/logout');
      console.log(res);
      if (res.data.status === 'success') {
        setLoginSuccessfull(true);
        setTimeout(() => location.assign('/'), 750);
      }
      getLoggedIn();
    } catch (error) {
      console.log(error.response);
    }
  }
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
      </div>{' '}
      <div className="slider_mainComponents" style={{ display: 'none' }}>
        <div className="slider_component slider_component_hover">
          {' '}
          <h1 className="slider_component_h1">Flights</h1>
        </div>
        <div className="slider_component slider_component_hover">
          {' '}
          <h1 className="slider_component_h1">Suggestions</h1>
        </div>
        <div className="slider_component slider_component_hover">
          {' '}
          <h1 className="slider_component_h1">Add Flight</h1>
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
        <div className="slider_component_username">
          {' '}
          <h1 className="slider_component_h1_username">Hello {userName}</h1>
        </div>
        <div
          onClick={showMyFlights}
          className="slider_component slider_component_hover"
        >
          {' '}
          <AirportSVG className="svg_dashboard"></AirportSVG>
          <h1 className="slider_component_h1">Flights</h1>
        </div>
        <div
          onClick={showSuggestions}
          className="slider_component slider_component_hover"
        >
          {' '}
          <NewMessageSVG className="svg_dashboard"></NewMessageSVG>
          <h1 className="slider_component_h1">Suggestions</h1>
        </div>
        <div
          onClick={showAddAFlight}
          className="slider_component slider_component_hover"
        >
          {' '}
          <AddAFlightSVG className="svg_dashboard"></AddAFlightSVG>
          <h1 className="slider_component_h1">Add Flight</h1>
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
        <div className="logout_component ">
          {' '}
          <button
            onClick={logoutBtn}
            className="singup_button singup_button_dashboard"
          >
            Log out
          </button>
        </div>
        <div className="slider_component_settings rights_reserved">
          {' '}
          All rights reserved By @TomažOvsenjak
        </div>
      </div>
    </div>
  );

  const myFlightDivs = fromToStart.map((el) => (
    <MyFlights
      key={el.flightId}
      flightId={el.flightID}
      user={userId}
      id={el._id}
      deleteFlight={deleteFlight}
      from={el.fromStart}
      to={el.toStart}
      results={el.results}
      slider={slider}
      dateFrom={el.dateFrom}
      dateTo={el.dateTo}
    />
  ));

  return (
    <>
      <div className={slider ? 'dashboard' : 'dashboard_hide'}>
        {slider ? fatSlider : thinSlider}
        <div className="dashboard_mainInfo">
          {loginSuccessfull ? (
            <LoginSuccess
              message={
                'Log out succesfull, redirecting you to the landing page 😀 '
              }
            />
          ) : null}
          {!loading ? myFlightsShow && myFlightDivs : <Spinner></Spinner>}
          {suggestionsShow && <Suggestions />}

          {addAFlightShow && (
            <AddAFlight airportsFromDB={airportsFromDB} userId={userId} />
          )}
        </div>
      </div>
    </>
  );
}
