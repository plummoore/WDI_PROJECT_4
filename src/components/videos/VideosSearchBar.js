import React from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';

const SearchBar = ({ handleToggleShow, handleSort }) => {
  return(
    <div>
      <h1>VIDEO SEARCH BAR</h1>
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
          <FormGroup>
            <h2>SAVED VIDEOS</h2>
            {/* <button className="btn-form" onClick={handleToggleShow} value={'saved'}>Saved</button> */}
            <button className="btn-form" onClick={() => handleToggleShow('saved')}>Saved</button>
            <button className="btn-form" onClick={() => handleToggleShow('archived')}>Archived</button>
            {/* <button className="btn-form" onClick={handleToggleShow} value={'archived'}>Archived</button> */}
          </FormGroup>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
          <FormGroup>
            <h2>SORT</h2>
            <FormControl componentClass="select" onChange={ handleSort }>
              <option value="duration|asc">Length (short-long)</option>
              <option value="duration|desc">Length (long-short)</option>
            </FormControl>
          </FormGroup>
        </div>



      </div>



    </div>
  );
};

export default SearchBar;