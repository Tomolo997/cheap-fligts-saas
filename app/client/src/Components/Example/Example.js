import React from 'react';
import '../../App/App.css';

export default function Example() {
  return (
    <div className="Example">
      <h1 className="example_h1">See how it works</h1>
      <div className="example_cube example_first_cube">
        <h2 className="example_h2">Step 1</h2>
        <h2 className="example_h3">
          Choose your{' '}
          <span className="example_span example_span_from">FROM - TO pair</span>{' '}
          of destinations
        </h2>
        <div className="example_from_to">
          <div className="example_from">
            <label className="example_label" htmlFor="from">
              From{' '}
            </label>
            <input
              className="example_input"
              type="text"
              id="from"
              disabled="true"
              placeholder="IT-sky"
            />
          </div>
          <div className="example_to">
            <label className="example_label" htmlFor="to">
              To{' '}
            </label>
            <input
              className="example_input"
              type="text"
              id="to"
              disabled="true"
              placeholder="GR-sky"
            />
          </div>
          <div className="example_date">
            <label className="example_label" htmlFor="date">
              Date{' '}
            </label>
            <input
              className="example_input"
              type="text"
              id="date"
              disabled="true"
              placeholder="2021-2021"
            />
          </div>
        </div>
        <div className="example_add">
          Add the{' '}
          <span className="example_span example_span_from">FROM - TO pair</span>{' '}
          to get daily results{' '}
        </div>
        <button className="example_add example_add_button">+</button>
      </div>
      <div className="example_cube example_second_cube">
        <h2 className="example_h2">Step 2</h2>
        <h2 className="example_h3">
          Get your daily{' '}
          <span className="example_span example_span_from">FROM - TO pair</span>{' '}
          destinations
        </h2>
        <div className="example_results">
          <div className="example_from">
            <label className="example_label_results " htmlFor="from">
              From{' '}
            </label>
            <input
              className="example_input_results"
              type="text"
              id="from"
              disabled="true"
              placeholder="TSF"
            />
          </div>
          <div className="example_to">
            <label className="example_label_results" htmlFor="to">
              To{' '}
            </label>
            <input
              className="example_input_results"
              type="text"
              id="to"
              disabled="true"
              placeholder="KGS"
            />
          </div>
          <div className="example_date">
            <label className="example_label_results" htmlFor="date">
              Date{' '}
            </label>
            <input
              className="example_input_results"
              type="text"
              id="date"
              disabled="true"
              placeholder="23-06 to 30-06"
            />
          </div>
          <div className="example_date">
            <label className="example_label_results" htmlFor="Price">
              Price{' '}
            </label>
            <input
              className="example_input_results"
              type="text"
              id="Price"
              disabled="true"
              placeholder="23"
            />
          </div>
          <div className="example_date">
            <label className="example_label_results" htmlFor="Link">
              Link{' '}
            </label>
            <input
              className="example_input_results"
              type="text"
              id="Link"
              disabled="true"
              placeholder="https://www.skyscanner.net/transport/flights/TSF/KGS/210623/210630/"
            />
          </div>
        </div>
        <div className="example_results">
          <div className="example_from">
            <label className="example_label_results" htmlFor="from">
              From{' '}
            </label>
            <input
              className="example_input_results"
              type="text"
              id="from"
              disabled="true"
              placeholder="CIA"
            />
          </div>
          <div className="example_to">
            <label className="example_label_results" htmlFor="to">
              To{' '}
            </label>
            <input
              className="example_input_results"
              type="text"
              id="to"
              disabled="true"
              placeholder="SKG"
            />
          </div>
          <div className="example_date">
            <label className="example_label_results" htmlFor="date">
              Date{' '}
            </label>
            <input
              className="example_input_results"
              type="text"
              id="date"
              disabled="true"
              placeholder="29-06 till 15-07"
            />
          </div>
          <div className="example_date">
            <label className="example_label_results" htmlFor="Price">
              Price{' '}
            </label>
            <input
              className="example_input_results"
              type="text"
              id="Price"
              disabled="true"
              placeholder="26"
            />
          </div>
          <div className="example_date">
            <label className="example_label_results" htmlFor="Link">
              Link{' '}
            </label>
            <input
              className="example_input_results"
              type="text"
              id="Link"
              disabled="true"
              placeholder="https://www.skyscanner.net/transport/flights/CIA/SKG/210629/210715/"
            />
          </div>
        </div>
        <div className="example_results">
          <div className="example_from">
            <label className="example_label_results" htmlFor="from">
              From{' '}
            </label>
            <input
              className="example_input_results"
              type="text"
              id="from"
              disabled="true"
              placeholder="BGY"
            />
          </div>
          <div className="example_to">
            <label className="example_label_results" htmlFor="to">
              To{' '}
            </label>
            <input
              className="example_input_results"
              type="text"
              id="to"
              disabled="true"
              placeholder="JTR"
            />
          </div>
          <div className="example_date">
            <label className="example_label_results" htmlFor="date">
              Date{' '}
            </label>
            <input
              className="example_input_results"
              type="text"
              id="date"
              disabled="true"
              placeholder="15-07 till 25-07"
            />
          </div>
          <div className="example_date">
            <label className="example_label_results" htmlFor="Price">
              Price{' '}
            </label>
            <input
              className="example_input_results"
              type="text"
              id="Price"
              disabled="true"
              placeholder="26"
            />
          </div>
          <div className="example_date">
            <label className="example_label_results" htmlFor="Link">
              Link{' '}
            </label>
            <input
              className="example_input_results"
              type="text"
              id="Link"
              disabled="true"
              placeholder="https://www.skyscanner.net/transport/flights/BGY/JTR/210715/210725/"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
