import React, { useState } from 'react';
import '../../App/App.css';
import axios from 'axios';
import CountriesOption from '../CountriesOption/CountriesOption';
export default function AddAFlight(props) {
  const [flightFrom, setFlightFrom] = useState('');
  const [flightTo, setFlightTo] = useState('');
  const [outboundDate, setOutboundDate] = useState('');
  const [inboundDate, setInboundDate] = useState('');

  const addFlight = async () => {
    //   "flightsData":[{
    //     "flightFrom": "AU-sky",
    //     "flightTo": "DPS",
    //     "outboundDate": "2021",
    //     "inboundDate": "2021"
    // }
    // ],
    // "user":"607077e6fd1b8f0b18608afd"

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
  };
  const changeinboundDate = (e) => {
    setInboundDate(e.target.value);
  };

  return (
    <div className=" dasboard_addAflight">
      <div className="addAFlights_div">
        <div className="from_div">
          <h1></h1>
          <select
            name="flightFrom"
            className="input_addAflight"
            type="text"
            onChange={changeFromFlight}
          >
            <CountriesOption />
          </select>
        </div>
        <div className="to_div">
          <h1></h1>
          <select
            onChange={changeToFlight}
            name="flightTo"
            className="input_addAflight"
            type="text"
          >
            <CountriesOption />
          </select>
        </div>
        <div className="dateFrom_div">
          <h1></h1>
          <input
            onChange={changeoutboundDate}
            type="date"
            id="outboundDate"
            name="outboundDate"
          />
        </div>
        <div className="dateTo_div">
          <h1></h1>
          <input
            onChange={changeinboundDate}
            type="date"
            id="inboundDate"
            name="inboundDate"
          />
        </div>
        <button onClick={addFlight}>add</button>
      </div>
    </div>
  );
}
