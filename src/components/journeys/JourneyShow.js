import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import MapContainer from '../google/GoogleMapContainer';

class JourneyShow extends React.Component {
  render(){
    return(
      <div>
        <h1>JOURNEY SHOW</h1>
        <MapContainer />
      </div>
    );
  }
}

export default JourneyShow;
