import React from 'react';

function GoogleSearch({ handleChange }){
  return(
    <div className="form-group">
      <input
        type="text"
        name="start"
        placeholder="starting location"
        className="form-control"
        handleChange={ handleChange }
      />
    </div>
  );
}

export default GoogleSearch;
