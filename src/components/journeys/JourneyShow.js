import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
// import Container from '../google/GoogleMapContainer';

import GoogleMap from '../google/GoogleMapContainer';

class JourneyShow extends React.Component {
  state = {
    journey: {}
  }

  render(){
    const center = {lat: 48.864716, lng: 2.349014};
    return(
      <div>
        <h1>JOURNEY SHOW</h1>
        { this.state && <GoogleMap center={center} />}
      </div>
    );
  }
}

export default JourneyShow;
