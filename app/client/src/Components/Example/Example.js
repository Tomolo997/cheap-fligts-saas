import React from "react";
import "../../App/App.css";

export default function Example() {
  return (
    <div className="Example">
      <h1 className="example_h1">See how it works</h1>
      <div className="example_cube example_first_cube">
        <div>
          <h1>Step 1</h1>
        </div>
      </div>
      <div className="example_cube example_second_cube">
        <div>
          <h1>Step 2</h1>
        </div>
        <div></div>
      </div>
      <div className="example_cube example_third_cube">
        <div>
          <h1>Step 3</h1>
        </div>
      </div>
    </div>
  );
}
