import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

import  Auth from '../../lib/Auth';
import  BackButton from '../utility/BackButton';

import GoogleMap from '../google/GoogleMap';
// import Youtube from '../youtube/Youtube';

class JourneyShow extends React.Component {
  state = {
    journey: {},
    start: {
      startlat: '',
      startlng: ''
    }
  }

  componentDidMount(){
    Axios
      .get(`/api/journeys/${this.props.match.params.id}`)
      .then(res => {
        this.setState({ journey: res.data});
        this.setState({start: res.data.route.startCO});
        // console.log(res.data);
        // console.log(res.data.route.startCO);
        // console.log(this.state.start.startlat);
        // console.log(this.state.start.startlng);
      })
      .catch(err => console.log(err));
  }

  render(){
    // const startPoint = {lat: this.state.start.startlat, lng: this.state.start.startlng};
    // console.log(startPoint);
    // const center = {lat: 51.534205, lng: -0.103093};
    return(
      <div>
        {this.state && <BackButton />}
        <h1>{this.state.journey.name}</h1>
        { <GoogleMap  />}
        {/* <Youtube /> */}
      </div>
    );
  }
}

export default JourneyShow;
