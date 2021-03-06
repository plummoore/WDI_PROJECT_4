import React from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';

const SearchBar = ({ handleToggleShow, handleSort }) => {
  return(
    <div>
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 video-search-left">
          <FormGroup>
            <h2>VIDEOS</h2>
            <button className="btn-form" onClick={() => handleToggleShow('saved')}>Saved</button>
            <button className="btn-form" onClick={() => handleToggleShow('archived')}>Archived</button>
          </FormGroup>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 video-search-right">
          <FormGroup>
            <h2>SORT</h2>
            <FormControl componentClass="select" onChange={ handleSort }>
              <option value="duration|asc">Length (long-short)</option>
              <option value="duration|desc">Length (short-long)</option>
            </FormControl>
          </FormGroup>
        </div>



      </div>



    </div>
  );
};

export default SearchBar;
