import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import '../../App/App.css';
export default function MyFlights(props) {
  const changeDate = (date) => {
    const changed1Date = date.slice(0, 10).split('-');
    return changed1Date[2] + '/' + changed1Date[1];
  };
  const changeDateToDatesFromAndDatesTo = (date) => {
    const dateMili = new Date(date);
    if (dateMili.getDate() == 1 && dateMili.getMonth() == 0) {
      const changeDate = date.slice(0, 10).split('-');
      return 'Year of ' + changeDate[0];
    } else {
      const changed1Date = date.slice(0, 10).split('-');
      return changed1Date[2] + '-' + changed1Date[1] + '-' + changed1Date[0];
    }
  };
  const changeDateToDatesFromAndDatesToTOO = (date) => {
    const dateMili = new Date(date);
    if (dateMili.getDate() == 1 && dateMili.getMonth() == 0) {
      const changeDate = date.slice(0, 10).split('-');
      return 'Year of ' + changeDate[0];
    } else {
      const changed1Date = date.slice(0, 10).split('-');

      const month = [
        '31',
        '28',
        '31',
        '30',
        '31',
        '30',
        '31',
        '31',
        '30',
        '31',
        '30',
        '31',
      ];
      const StringMonth = month[dateMili.getMonth()];
      return StringMonth + '-' + changed1Date[1] + '-' + changed1Date[0];
    }
  };

  const deleteFlight = async (deletedFlightID, deletedflightResultsId) => {
    setTimeout(() => {
      location.reload();
    }, 500);
    const res = await axios.delete(
      'http://localhost:8000/api/v1/flights/deleteFlight',
      {
        data: {
          user: String(props.userID),
          flightID: String(deletedFlightID),
          flightResultsId: String(deletedflightResultsId),
        },
      }
    );
  };

  const results = props.results.map((el, i) => (
    <div key={i} className="myFlights_results">
      <div className="myFlights_fromToDateFromTo">
        <h1 className="myFlights_fromToDateFromTo_h1">From</h1>
        <h2 className="myFlights_fromToDateFromTo_h2">
          {el.fromFlightCountry}
        </h2>
        <h2 className="myFlights_fromToDateFromTo_h2">{el.fromFlight}</h2>
      </div>
      <div className="myFlights_fromToDateFromTo">
        <h1 className="myFlights_fromToDateFromTo_h1">To</h1>
        <h2 className="myFlights_fromToDateFromTo_h2">{el.toFlightCountry}</h2>
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
        <h2 className="myFlights_fromToDateFromTo_h2_price">{el.price} €</h2>
      </div>
      <div className="myFlights_fromToDateFromTo_link_div">
        <p className="myFlights_fromToDateFromTo_link">link:</p>
        <p className="myFlights_fromToDateFromTo_paragraph" value={el.link}>
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
              <h1 className="flightsData_formToDateCreatedAt_h1">Date from:</h1>
              <h1 className="flightsData_formToDateCreatedAt_h1_result_date">
                {changeDateToDatesFromAndDatesTo(props.dateFrom)}
              </h1>
            </div>
            <div className="flightsData_fromToDateCreatedAt">
              <h1 className="flightsData_formToDateCreatedAt_h1">
                Date <br />
                to:
              </h1>
              <h1 className="flightsData_formToDateCreatedAt_h1_result_date">
                {changeDateToDatesFromAndDatesToTOO(props.dateTo)}
              </h1>
            </div>
            <div className="flightsData_fromToDateCreatedAt_createdAt ">
              <h1 className="flightsData_formToDateCreatedAt_h1_createdAt">
                Today found {props.results.length} flights
                <button
                  className="button_delete"
                  onClick={() => {
                    deleteFlight(props.flightId, props.flightResultsID);
                  }}
                >
                  DELETE FLIGHT
                </button>
              </h1>{' '}
            </div>
          </div>
        </div>
        <div className="myFlights_flightResults_div">{results}</div>
      </div>
    </div>
  );
}
