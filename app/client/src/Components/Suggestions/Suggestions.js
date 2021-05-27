import React from 'react';
import '../../App/App.css';
export default function Suggestions() {
  return (
    <div className="suggestions">
      <div className="suggestions_title">
        <h1 className="suggestion_title_h1">
          Suggestions on how to improve the search
        </h1>
      </div>

      <div className="suggestion_mainInfo">
        <div className="suggest_main suggest_left">
          <p className="suggest_main_p">
            <span>1.</span> To get the best results of the flights from
            country/airport to country/airport, the duration of search dates
            should preferably be 1 month.
            <br />
            <br />
            <span>2.</span> the high frequency flying destination may not be
            able to show all of the flights but it will show you the cheapest.
            <br />
            <br />
            <span>3.</span>Choose the same airport to depart from for different
            destinations. Narrow down your search to get more great offers.
            <br />
            <br />
            <span>4.</span> Narrow searches with not much space between the
            outbound and inbound dates get you more results for the desired
            flights.
          </p>
        </div>
      </div>
    </div>
  );
}
