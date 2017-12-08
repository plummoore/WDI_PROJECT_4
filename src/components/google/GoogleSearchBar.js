/* global google */
import React from 'react';

import GoogleAutocomplete from './GoogleAutocomplete';

const GoogleSearchBar = ({handleSubmit, handleChange, handleCheck}) => {
  return(
    <form onSubmit={handleSubmit}>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-6">
            <h3>Start Point</h3>
            <div className="form-group">
              <GoogleAutocomplete
                name="start"
                placeholder="start point"
                handleChange={handleChange}
                className="form-control"
              />
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6">
            <h3>End Point</h3>
            <div className="form-group">
              <GoogleAutocomplete
                name="end"
                placeholder="end point"
                handleChange={handleChange}
                className="form-control"
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <h3>mode of travel</h3>
            <li><button><i className="fas fa-subway fa-2x" value="TRANSIT"></i></button></li>
            <li><button><i className="fas fa-car fa-2x" value="DRIVING"></i></button></li>
            <li><button><i className="fas fa-bicycle fa-2x" value="BICYLING"></i></button></li>
            <li><button><i className="fas fa-child fa-2x" value="WALKING"></i></button></li>
            <button className="btn-form">Get Route</button>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <h3>Regular Journey?</h3>
            <input
              name="regular"
              id="regular"
              type="checkbox"
              value="true"
              onChange={handleCheck}
            />
          </div>
        </div>
      </div>
    </form>
  );
};


export default GoogleSearchBar;
