import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../App/App.css';
export default function MyFlights(props) {
  const results = props.results.map((el) => (
    <div className="myFlights_results">
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
          {el.formDate.slice(0, 10)}
        </h2>
      </div>
      <div className="myFlights_fromToDateFromTo">
        <h1 className="myFlights_fromToDateFromTo_h1">Date to</h1>
        <h2 className="myFlights_fromToDateFromTo_h2">
          {el.toDate.slice(0, 10)}
        </h2>
      </div>
      <div className="myFlights_fromToDateFromTo">
        <h1 className="myFlights_fromToDateFromTo_h1">Price</h1>
        <h2 className="myFlights_fromToDateFromTo_h2">{el.price}€</h2>
      </div>
      <div className="myFlights_fromToDateFromTo_link_div">
        <a
          href={el.link}
          target="_blank"
          className="myFlights_fromToDateFromTo_link"
        >
          SkyScanner
        </a>
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
                Created at:
              </h1>{' '}
            </div>
          </div>
        </div>
        <div className="myFlights_flightResults_div">{results}</div>
      </div>
    </div>
  );
}
