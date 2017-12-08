/* global google */
import React from 'react';

import GoogleAutocomplete from './GoogleAutocomplete';

const GoogleSearchBar = ({handleSubmit, handleChange}) => {
  return(
    <form onSubmit={handleSubmit}>
      <h3>Start Point</h3>
      <div className="form-group">
        <GoogleAutocomplete
          name="start"
          placeholder="start point"
          handleChange={handleChange}
          className="form-control"
        />
      </div>
      <h3>End Point</h3>
      <div className="form-group">
        <GoogleAutocomplete
          name="end"
          placeholder="end point"
          handleChange={handleChange}
          className="form-control"
        />
      </div>
    </form>
  );
};


export default GoogleSearchBar;
