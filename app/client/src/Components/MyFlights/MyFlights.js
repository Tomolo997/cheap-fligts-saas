import React from 'react';
import '../../App/App.css';
export default function MyFlights() {
  return (
    <div className="dashboard_myFlights">
      <div className="myFlights_flight_box">
        <div className="myFlights_flightData_div">
          <div className="flightsData">
            <div className="flightsData_fromToDateCreatedAt">
              <h1 className="flightsData_formToDateCreatedAt_h1">From:</h1>
              <h1 className="flightsData_formToDateCreatedAt_h1_result">
                IT-SKY
              </h1>
            </div>
            <div className="flightsData_fromToDateCreatedAt">
              <h1 className="flightsData_formToDateCreatedAt_h1">To:</h1>
              <h1 className="flightsData_formToDateCreatedAt_h1_result">
                GR-SKY
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
        <div className="myFlights_flightResults_div">
          <div className="myFlights_results">
            <div className="myFlights_fromToDateFromTo">From</div>
            <div className="myFlights_fromToDateFromTo">To</div>
            <div className="myFlights_fromToDateFromTo">Date from:</div>
            <div className="myFlights_fromToDateFromTo">Date to:</div>
            <div className="myFlights_fromToDateFromTo">Price</div>
            <div className="myFlights_fromToDateFromTo_link">
              <h1>link</h1>
              <a
                href="https://www.skyscanner.net/transport/flights/MXP/JTR/210613/210624/"
                target="_blank"
              >
                SkyScanner
              </a>
            </div>
          </div>
          <div className="myFlights_results">21</div>
          <div className="myFlights_results">xxx</div>
          <div className="myFlights_results">xxx</div>
          <div className="myFlights_results">xxx</div>
          <div className="myFlights_results">xxx</div>
          <div className="myFlights_results">xxx</div>
          <div className="myFlights_results">xxx</div>
          <div className="myFlights_results">xxx</div>
          <div className="myFlights_results">xxx</div>
          <div className="myFlights_results">xxx</div>
          <div className="myFlights_results">xxx</div>
          <div className="myFlights_results">xxx</div>
        </div>
      </div>
    </div>
  );
}
