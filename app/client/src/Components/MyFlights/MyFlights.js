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
            </div>
            <div className="flightsData_fromToDateCreatedAt_createdAt ">
              <h1 className="flightsData_formToDateCreatedAt_h1_createdAt">
                Created at:
              </h1>{' '}
            </div>
          </div>
        </div>
        <div className="myFlights_flightResults_div">flight results</div>
      </div>
    </div>
  );
}
