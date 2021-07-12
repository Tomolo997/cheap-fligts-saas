import React, { useState, useContext, useEffect } from "react";
import "../../App/App.css";
import BurgerNav from "../BurgerNav/BurgerNav";
import MyFlights from "../MyFlights/MyFlights";
import Suggestions from "../Suggestions/Suggestions";
import AddAFlight from "../AddAFlight/AddAFlight";
import DashboardLogo from "../DashboardLogo/DashboardLogo";
import AuthContextProvider from "../../context/AuthContext";
import axios from "axios";
import UpdateProgramError from "../UpdateProgramError/UpdateProgramError";
import Spinner from "../Spinner/Spinner";
import Settings from "../Settings/Settings";
import { async } from "regenerator-runtime";
import LoginSuccess from "../LoginSuccess/LoginSuccess";
import AirportSVG from "../../assets/Images/airplane.svg";
import NewMessageSVG from "../../assets/Images/new-message.svg";
import AddAFlightSVG from "../../assets/Images/circle-with-plus.svg";
import Help from "../Help/Help";
import Upgrade from "../Upgrade/Upgrade";

export default function Dashboard() {
  const API_CALL =
    process.env.NODE_ENV === "development" ? "http://localhost:8000" : "";

  const { slider, setSlider, setUserIDforUpgrade } =
    useContext(AuthContextProvider);
  const [loginSuccessfull, setLoginSuccessfull] = useState(false);
  const [airportsFromDB, setAirportsFromDB] = useState([]);
  const [myFlightsShow, setMyFlightsShow] = useState(true);
  const [suggestionsShow, setSuggestionsShow] = useState(false);
  const [helpShow, setHelpShow] = useState(false);
  const [addAFlightShow, setAddAFlightShow] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [loading, setLoading] = useState(true);
  const [flightsResults, setFlightsResults] = useState([]);
  const [userId, setUserId] = useState("");
  const [proProgram, setProProgram] = useState(false);
  const [standardProgram, setStandardProgram] = useState(false);
  const [fromToStart, setFromToStart] = useState([]);
  const [userName, setUserName] = useState("");
  const [updateProgramErrorDiv, setUpdateProgramErrorDiv] = useState(false);
  const [userProgram, setUserProgram] = useState("free");
  const [userEmail, setUserEmail] = useState("");

  const getMe = async () => {
    const res = await axios.get(API_CALL + "/api/v1/users/getMe");
    const fuckingAirports = await axios.get(
      API_CALL + "/api/v1/users/airports"
    );
    setAirportsFromDB(fuckingAirports.data.airports[0].data);
    setUserProgram(res.data.program);
    setUserId(res.data.id);
    setUserIDforUpgrade(res.data.id);
    setUserName(res.data.name);
    setUserEmail(res.data.email);
    setTimeout(() => setLoading(false), 2000);

    if (res.data.program === "pro") {
      setProProgram(true);
    }
    if (res.data.program === "standard") {
      setStandardProgram(true);
    }

    if (res.data.program === "standard" || res.data.program === "pro") {
      if (res.data.alreadyPaid) {
        return getUserFlights();
      } else {
        setUpdateProgramErrorDiv(true);
        setLoading(false);
      }
    } else {
      getUserFlights();
    }
  };
  const getMeAfterUpdate = async () => {
    const res = await axios.get(API_CALL + "/api/v1/users/getMe");
    setUserId(res.data.id);
    console.log(res);
    setUserName(res.data.name);
    setUserEmail(res.data.email);
  };
  const convertToReadableTime = (date) => {
    const yearMonthDay = date.split("T")[0];
    const timeOfTheDay = date.split("T")[1].slice(0, 5);
    return yearMonthDay + " at " + timeOfTheDay;
  };
  const getUserFlights = async () => {
    try {
      const res = await axios.get(API_CALL + "/api/v1/flights/getMyFlights");

      const flightResults = await res.data.data.flights;
      const initData = await res.data.data.initData;
      const noResults = await res.data.data.noResults;
      const userID = userId;
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
          createdAt: convertToReadableTime(element.createdAt),
          dateTo: findFlight.inboundDate,
          dateFrom: findFlight.outboundDate,
        });
      }
      console.log("flight results", flightResults);
      console.log("No results", noResults);
      for (let i = 0; i < noResults.length; i++) {
        const element = noResults[i];
        fromToArray.push({
          fromStart: element.flightFrom,
          toStart: element.flightTo,
          createdAt: convertToReadableTime(element.createdAt),
          results: [
            {
              flightFromSTART: element.flightFrom,
              flightID: element._id,
              flightToSTART: element.flightTo,
              formDate: "2021-05-22T00:00:00.000",
              fromFlight: "No Data",
              fromFlightCountry: "No Data",
              link: "No Data",
              price: "No Data",
              toDate: "2021-05-22T00:00:00.000Z",
              toFlight: "No Data",
              toFlightCountry: "No Data",
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
      console.log("from to start", fromToArray);
      setFromToStart(fromToArray);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMe();
  }, []);

  async function logoutBtn() {
    try {
      const res = await axios.get(API_CALL + "/api/v1/users/logout");
      console.log(res);
      if (res.data.status === "success") {
        setLoginSuccessfull(true);
        setTimeout(() => location.assign("/"), 750);
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
    setHelpShow(false);
    setShowSettings(false);
  };
  const showSuggestions = () => {
    setMyFlightsShow(false);
    setSuggestionsShow(true);
    setAddAFlightShow(false);
    setHelpShow(false);
    setShowSettings(false);
  };
  const showAddAFlight = () => {
    setMyFlightsShow(false);
    setSuggestionsShow(false);
    setHelpShow(false);
    setAddAFlightShow(true);
    setShowSettings(false);
  };
  const showSettingsClick = () => {
    setMyFlightsShow(false);
    setSuggestionsShow(false);
    setAddAFlightShow(false);
    setHelpShow(false);
    setShowSettings(true);
  };
  const showHelpClick = () => {
    setMyFlightsShow(false);
    setSuggestionsShow(false);
    setAddAFlightShow(false);
    setShowSettings(false);
    setHelpShow(true);
  };
  const thinSlider = (
    <div className="slider_thin">
      <div className="dashboard_slider_header">
        <DashboardLogo />
      </div>{" "}
      <div className="slider_mainComponents" style={{ display: "none" }}>
        <div className="slider_component slider_component_hover">
          {" "}
          <h1 className="slider_component_h1">Flights</h1>
        </div>
        <div className="slider_component slider_component_hover">
          {" "}
          <h1 className="slider_component_h1">Suggestions</h1>
        </div>
        <div className="slider_component slider_component_hover">
          {" "}
          <h1 className="slider_component_h1">Add Flight</h1>
        </div>
      </div>
      <div className="slider_settings" style={{ display: "none" }}>
        <div className="slider_component slider_component_settings">
          <h1 className="slider_component_h1">Settings</h1>
        </div>
        <div className="slider_component slider_component_settings">
          {" "}
          <h1 className="slider_component_h1"> Help</h1>
        </div>

        <div className="slider_component_settings">
          {" "}
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
      </div>{" "}
      <div className="slider_mainComponents">
        <div className="slider_component_username">
          {" "}
          <h1 className="slider_component_h1_username">Hello {userName}</h1>
        </div>
        <div
          onClick={showMyFlights}
          className="slider_component slider_component_hover"
        >
          {" "}
          <AirportSVG className="svg_dashboard"></AirportSVG>
          <h1 className="slider_component_h1">Flights</h1>
        </div>
        <div
          onClick={showSuggestions}
          className="slider_component slider_component_hover"
        >
          {" "}
          <NewMessageSVG className="svg_dashboard"></NewMessageSVG>
          <h1 className="slider_component_h1">Suggestions</h1>
        </div>
        <div
          onClick={showAddAFlight}
          className="slider_component slider_component_hover"
        >
          {" "}
          <AddAFlightSVG className="svg_dashboard"></AddAFlightSVG>
          <h1 className="slider_component_h1">Add Flight</h1>
        </div>
      </div>
      <div className="slider_settings">
        <div
          onClick={showSettingsClick}
          className="slider_component slider_component_settings"
        >
          <h1 className="slider_component_h1">My Profile</h1>
        </div>

        <div
          onClick={showHelpClick}
          className="slider_component slider_component_settings"
        >
          {" "}
          <h1 className="slider_component_h1">Contact</h1>
        </div>
        <div className="logout_component ">
          {" "}
          <button
            onClick={logoutBtn}
            className="singup_button singup_button_dashboard"
          >
            Log out
          </button>
        </div>
        <div className="slider_component_settings rights_reserved">
          {" "}
          All rights reserved By @TomažOvsenjak
        </div>
      </div>
    </div>
  );

  const myFlightDivs = fromToStart.map((el) => (
    <MyFlights
      key={el.flightId}
      flightId={el.flightId}
      createdAt={el.createdAt}
      flightResultsID={el.flightResultsID}
      userID={userId}
      id={el._id}
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
      <div className={slider ? "dashboard" : "dashboard_hide"}>
        {slider ? fatSlider : thinSlider}
        <div className="dashboard_mainInfo">
          {loginSuccessfull ? (
            <LoginSuccess
              message={
                "Log out succesfull, redirecting you to the landing page 😀 "
              }
            />
          ) : null}
          {!loading ? myFlightsShow && myFlightDivs : <Spinner></Spinner>}
          {updateProgramErrorDiv ? (
            <UpdateProgramError></UpdateProgramError>
          ) : null}
          {suggestionsShow && <Suggestions />}

          {addAFlightShow && (
            <AddAFlight
              proProgram={proProgram}
              standardProgram={standardProgram}
              airportsFromDB={airportsFromDB}
              userId={userId}
            />
          )}

          {showSettings && (
            <Settings
              getMeAfterUpdate={getMeAfterUpdate}
              userName={userName}
              userEmail={userEmail}
            />
          )}

          {helpShow && (
            <Help
              getMeAfterUpdate={getMeAfterUpdate}
              userName={userName}
              userEmail={userEmail}
            />
          )}
        </div>
      </div>
    </>
  );
}
