/* global google */

import React from 'react';
import ReactDOM from 'react-router-dom';
import Axios from 'axios';

class GoogleMatrix extends React.Component {
  state = {

  }

  componentDidMount() {
    Axios
      .get(`https://maps.googleapis.com/maps/api/distancematrix/json
        ?origins:Angel
        &destinations:Putney
        &key:AIzaSyDcAnLwgGqXetMzxyFULz7UksH91R_OMUs`)
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  }

  render() {

    return()
  }
}

export default GoogleMatrix;

// https://maps.googleapis.com/maps/api/distancematrix/json?origins=Seattle&destinations=San+Francisco&key=YOUR_API_KEY
