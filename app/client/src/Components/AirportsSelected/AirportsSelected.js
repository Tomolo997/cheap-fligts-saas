import React, { useState } from 'react';

export default function AirportsSelected(props) {
  const [airportsFromDB, setAirportsFromDB] = useState([]);

  const airports = props.airportsFromDB.map((el) => (
    <option key={el.id} value={el.id}>
      {el.name} | {el.country}
    </option>
  ));

  return airports;
}
