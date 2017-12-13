import React from 'react';

import Giphy from './giphy/GiphyHome';

function homepage(){
  return(
    <div className="container home">
      <div className="row">
        <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12">
          <h1>{'It\'s not about the destination'}</h1>
          <h1>{'It\'s about the journey'}</h1>
        </div>
      </div>
      <Giphy />
    </div>
  );
}

export default homepage;
