import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../../App/App.css';
export default function MyFlights(props) {
  const changeDate = (date) => {
    const changed1Date = date.slice(0, 10).split('-');
    return changed1Date[2] + '/' + changed1Date[1];
  };
  const textAreaRef = useRef(null);
  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand('copy');
    // This is just personal preference.
    // I prefer to not show the whole text area selected.
    e.target.focus();
    setCopySuccess('Copied!');
  }

  const results = props.results.map((el, i) => (
    <div key={i} className="myFlights_results">
      <div className="myFlights_fromToDateFromTo">
        <h1 className="myFlights_fromToDateFromTo_h1">From</h1>
        <h2 className="myFlights_fromToDateFromTo_h2">{el.fromFlight}</h2>
      </div>
      <div className="myFlights_fromToDateFromTo">
        <h1 className="myFlights_fromToDateFromTo_h1">To</h1>
        <h2 className="myFlights_fromToDateFromTo_h2">{el.toFlight}</h2>
      </div>
      <div className="myFlights_fromToDateFromTo">
        <h1 className="myFlights_fromToDateFromTo_h1">Date from</h1>
        <h2 className="myFlights_fromToDateFromTo_h2">
          {changeDate(el.formDate)}
        </h2>
      </div>
      <div className="myFlights_fromToDateFromTo">
        <h1 className="myFlights_fromToDateFromTo_h1">Date to</h1>
        <h2 className="myFlights_fromToDateFromTo_h2">
          {changeDate(el.toDate)}
        </h2>
      </div>
      <div className="myFlights_fromToDateFromTo">
        <h1 className="myFlights_fromToDateFromTo_h1">Price</h1>
        <h2 className="myFlights_fromToDateFromTo_h2">{el.price}€</h2>
      </div>
      <div className="myFlights_fromToDateFromTo_link_div">
        <p
          className="myFlights_fromToDateFromTo_link"
          onClick={copyToClipboard}
        >
          link:
        </p>
        <p
          className="myFlights_fromToDateFromTo_paragraph"
          value={el.link}
          ref={textAreaRef}
        >
          {el.link}
        </p>
      </div>
    </div>
  ));

  return (
    <div className="dashboard_myFlights">
      <div className="myFlights_flight_box">
        <div className="myFlights_flightData_div">
          <div className="flightsData">
            <div className="flightsData_fromToDateCreatedAt">
              <h1 className="flightsData_formToDateCreatedAt_h1">From:</h1>
              <h1 className="flightsData_formToDateCreatedAt_h1_result">
                {props.from}
              </h1>
            </div>
            <div className="flightsData_fromToDateCreatedAt">
              <h1 className="flightsData_formToDateCreatedAt_h1">To:</h1>
              <h1 className="flightsData_formToDateCreatedAt_h1_result">
                {props.to}
              </h1>
            </div>
            <div className="flightsData_fromToDateCreatedAt">
              <h1 className="flightsData_formToDateCreatedAt_h1">Date:</h1>
              <h1 className="flightsData_formToDateCreatedAt_h1_result_date">
                2021-2021
              </h1>
            </div>
            <div className="flightsData_fromToDateCreatedAt_createdAt ">
              <h1 className="flightsData_formToDateCreatedAt_h1_createdAt">
                Today found {props.results.length} results
              </h1>{' '}
            </div>
          </div>
        </div>
        <div className="myFlights_flightResults_div">{results}</div>
      </div>
    </div>
  );
}
