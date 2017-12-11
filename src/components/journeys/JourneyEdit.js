import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

import BackButton from '../utility/BackButton';
import GoogleSearchBar from '../google/GoogleSearchBar';
import GoogleMap from '../google/GoogleMap';
import JourneyNew from './JourneyNew';

class JourneyEdit extends React.Component {
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

  render() {
    return(
      <div>
        {this.state && <BackButton />}
        <h1>{this.state.journey.name}</h1>

        <GoogleMap
          start={this.state.journey.startLocation}
          end={this.state.journey.endLocation}
          mode={this.state.journey.mode}
        />

        <h3>Name:
          <input
            name="journeyName"
            id="journeyName"
            type="text"
            placeholder={this.state.journey.name}
            onChange={this.handleNameChange}
          /></h3>

        <h3>Duration: {this.state.journey.duration} mins</h3>
        <h3>Distance: {this.state.journey.distance} km</h3>

        <GoogleSearchBar
          handleLocationChange={this.handleLocationChange}
        />
        {/* <JourneyNew
          start={this.state.journey.startLocation}
          end={this.state.journey.endLocation}
          mode={this.state.journey.mode}/> */}
      </div>
    );
  }

}

export default JourneyEdit;
