/* global google */
import React from 'react';

import GoogleAutocomplete from './GoogleAutocomplete';

const GoogleSearchBar = ({ handleLocationChange }) => {
  return(
    <div className="row">
      <div className="col-lg-6 col-md-6 col-sm-6">
        <h3>Start Point</h3>
        <div className="form-group">
          <GoogleAutocomplete
            name="start"
            placeholder="start point"
            handleChange={handleLocationChange}
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
            handleChange={handleLocationChange}
            className="form-control"
          />
        </div>
      </div>
    </div>
  );
};


export default GoogleSearchBar;
