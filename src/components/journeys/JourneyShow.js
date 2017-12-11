import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

import  Auth from '../../lib/Auth';
import  BackButton from '../utility/BackButton';

import GoogleMap from '../google/GoogleMap';
// import Youtube from '../youtube/Youtube';

class JourneyShow extends React.Component {
  state = {
    journey: {}
  }

  componentDidMount(){
    Axios
      .get(`/api/journeys/${this.props.match.params.id}`)
      .then(res => {
        this.setState({ journey: res.data});
        console.log(this.state.journey);
      })
      .catch(err => console.log(err));
  }

  render(){
    return(
      <div>
        {this.state && <BackButton />}
        <h1>{this.state.journey.name}</h1>
        <GoogleMap
          start={this.state.journey.startLocation}
          end={this.state.journey.endLocation}
          mode={this.state.journey.mode}
        />
      </div>
    );
  }
}

export default JourneyShow;
