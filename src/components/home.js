import React from 'react';

import Giphy from './giphy/GiphyHome';

function homepage(){
  return(
    <div className="container">
      <div className="row">
        <div className="col-md-12 col-lg-12">
          <h1>{'It\'s not about the destination'}</h1>
          <h1>{'It\'s about the journey'}</h1>
          <Giphy />
        </div>
      </div>
    </div>
  );
}

export default homepage;
