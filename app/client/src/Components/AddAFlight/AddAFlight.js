import React, { useState, useEffect } from 'react';
import '../../App/App.css';
import axios from 'axios';
import AirportsSelected from '../AirportsSelected/AirportsSelected';
import CountriesOption from '../CountriesOption/CountriesOption';
export default function AddAFlight(props) {
  const [flightFrom, setFlightFrom] = useState('');
  const [flightTo, setFlightTo] = useState('');
  const [outboundDate, setOutboundDate] = useState('2021');
  const [inboundDate, setInboundDate] = useState('2021');
  const [countrySelected, setCountrySelected] = useState(true);
  const [countrySelectedFrom, setCountrySelectedFrom] = useState(true);
  const [addAFlightError, setAddAFlightError] = useState(false);
  const [minMonth, setMinMonth] = useState(1);
  const [showMonth, setShowMonth] = useState(false);
  const [addAFlightCongrats, setAddAFlightCongrats] = useState(false);
  const addFlight = async () => {
    //   "flightsData":[{
    //     "flightFrom": "AU-sky",
    //     "flightTo": "DPS",
    //     "outboundDate": "2021",
    //     "inboundDate": "2021"
    // }
    // ],
    // "user":"607077e6fd1b8f0b18608afd"
    if (
      flightFrom.length > 1 &&
      flightTo.length > 1 &&
      outboundDate.length > 1 &&
      inboundDate.length > 1
    ) {
      const data = {
        flightsData: [
          {
            flightFrom: flightFrom,
            flightTo: flightTo,
            outboundDate: outboundDate,
            inboundDate: inboundDate,
          },
        ],
        user: props.userId,
      };
      await axios.post('http://localhost:8000/api/v1/flights/addFlight', data);

      setAddAFlightCongrats(true);
      setAddAFlightError(false);
      setTimeout(() => {
        setAddAFlightCongrats(false);
        location.reload();
      }, 1500);
    } else {
      setAddAFlightError(true);
    }
  };

  const countrySelectedClick = (e) => {
    setCountrySelected(true);
  };
  const airportSelectedClick = (e) => {
    setCountrySelected(false);
  };

  const countrySelectedClickFrom = (e) => {
    setCountrySelectedFrom(true);
  };
  const airportSelectedClickFrom = (e) => {
    setCountrySelectedFrom(false);
  };
  // const changeDateToBeSuitable = (date) => {
  //   const firsSplti = date.split('-');
  //   var b = firsSplti[0];
  //   firsSplti[0] = firsSplti[2];
  //   firsSplti[2] = b;
  //   return firsSplti.join('-');
  // };

  const changeFromFlight = (e) => {
    setFlightFrom(e.target.value);
  };
  const changeToFlight = (e) => {
    setFlightTo(e.target.value);
  };
  const changeoutboundDate = (e) => {
    setOutboundDate(e.target.value);
    const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const year = Number(e.target.value.split('-')[0]);
    const initMonth = Number(e.target.value.split('-')[1]);
    console.log(initMonth);
    const finalMonth = initMonth + 1;
    if (finalMonth > 9) {
      if (initMonth === 11) {
        return setInboundDate(String(year + '-12'));
      }
      if (initMonth === 12) {
        return setInboundDate(String(year + '-01'));
      }
      setInboundDate(String(year + '-' + finalMonth));
    } else {
      setInboundDate(String(year + '-0' + finalMonth));
    }
  };
  const changeToYear = (e) => {
    const date = new Date();
    const thisYear = date.getFullYear();
    setOutboundDate(String(thisYear));
    setInboundDate(String(thisYear));
    setShowMonth(false);
  };
  const changeToMonth = () => {
    setShowMonth(true);
  };

  const monthDiv = (
    <>
      {' '}
      <h1 className="addAFlight_h1">Two months</h1>
      <input
        onChange={changeoutboundDate}
        type="month"
        className="input_date"
        id="outboundDate"
        name="outboundDate"
      />
    </>
  );

  const fromMonth = (
    <h1 className="addAFlight_h1_twomonth">
      From start of <br /> {outboundDate}
    </h1>
  );
  const toMonth = (
    <h1 className="addAFlight_h1_twomonth">
      To end of <br /> {inboundDate}
    </h1>
  );

  return (
    <div className="dasboard_addAflight">
      <div className="addAFlights_div">
        <div
          onClick={countrySelectedClickFrom}
          className={
            countrySelectedFrom
              ? ['addAFlight_Country_div active_selected']
              : ['addAFlight_Country_div']
          }
        >
          Country
        </div>
        <div
          onClick={airportSelectedClickFrom}
          className={
            !countrySelectedFrom
              ? ['addAFlight_Airport_div active_selected']
              : ['addAFlight_Airport_div']
          }
        >
          Top Cities
        </div>
        <div
          onClick={countrySelectedClick}
          className={
            countrySelected
              ? [
                  'addAFlight_Country_div addAFlight_Country_div_to  active_selected',
                ]
              : ['addAFlight_Country_div addAFlight_Country_div_to']
          }
        >
          Country
        </div>
        <div
          onClick={airportSelectedClick}
          className={
            !countrySelected
              ? [
                  'addAFlight_Airport_div addAFlight_Airport_div_to active_selected',
                ]
              : ['addAFlight_Airport_div addAFlight_Airport_div_to']
          }
        >
          Top Cities
        </div>
        <div className="from_div">
          <h1 className="addAFlight_h1">Fly from</h1>
          <select
            name="flightFrom"
            className="input_addAflight"
            type="text"
            onChange={changeFromFlight}
          >
            {countrySelectedFrom ? (
              <CountriesOption />
            ) : (
              <AirportsSelected airportsFromDB={props.airportsFromDB} />
            )}
          </select>
        </div>
        <div className="to_div">
          <h1 className="addAFlight_h1">Fly to</h1>
          <select
            onChange={changeToFlight}
            name="flightTo"
            className="input_addAflight"
            type="text"
          >
            {countrySelected ? (
              <CountriesOption />
            ) : (
              <AirportsSelected airportsFromDB={props.airportsFromDB} />
            )}
          </select>
        </div>
        <div className="dateTo_div">
          {showMonth ? (
            monthDiv
          ) : (
            <h1 className="addAFlight_h1 alingText_h1">
              You choose the whole Year of 2021
            </h1>
          )}
        </div>
        <div className="dateFrom_div">
          <h1 className="addAFlight_h1"></h1>
          <button onClick={() => changeToYear()} className="button_thisyear">
            For whole year
          </button>
          <button onClick={() => changeToMonth()} className="button_thisyear">
            Choose 2 months
          </button>
        </div>
        <button className="addAFlight_addButton" onClick={addFlight}>
          Add Flight
        </button>
        <div className="addAFlight_toMonth">
          {showMonth ? fromMonth : null}
          {showMonth ? toMonth : null}
        </div>
        <h1 className="addAFlight_h1_error">
          {addAFlightError ? 'Please fill out all of the fields' : null}
          {addAFlightCongrats
            ? `Congrats your flight from ${flightFrom} to ${flightTo} has been added. 🥳`
            : null}
        </h1>
      </div>
    </div>
  );
}
