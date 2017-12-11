import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

import  Auth from '../../lib/Auth';
import  BackButton from '../utility/BackButton';

import GoogleMap from '../google/GoogleMap';
import GoogleSearchBar from '../google/GoogleSearchBar';
import Youtube from '../youtube/Youtube';

class JourneyNew extends React.Component {
  state = {
    name: '',
    start: {},
    end: {},
    mode: '',
    distance: '',
    duration: '',
    regular: ''
  }

  componentWillMount() {
    this.handleLocationChange = this.handleLocationChange.bind(this);
  }

  componentDidMount(){}

  handleLocationChange = (location, inputName) => {
    this.setState({ [inputName]: location });
  }

  handleModeChange = (value) => {
    this.setState({ mode: value });
  }

  handleRouteData = (duration, distance) => {
    console.log('handleRouteData');
    console.log(duration, distance);
    console.log(this.state);

    this.setState({ duration: duration, distance: distance });
  }

  handleNameChange = (e) => {
    const journeyData = e.target.value;
    if(journeyData)
      this.setState({ regular: true, name: e.target.value });
    console.log(this.state);
  }

  handleSave = () => {
    const {userId} = Auth.getPayload();
    Axios
      .post(`/api/users/${userId}/journeys`, this.state, {
        // headers: { 'Authorization': `Bearer ${Auth.getToken()}` }
      })
      .then(() => this.props.history.push('/'))
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }

  render(){
    return(
      <div>
        <h1>ADDING A JOURNEY</h1>
        <GoogleMap
          start={this.state.start}
          end={this.state.end}
          mode={this.state.mode}
          handleRouteData={this.handleRouteData}
        />
        <GoogleSearchBar
          handleLocationChange={this.handleLocationChange}
        />
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <h3>Mode of travel</h3>
            <button onClick={() => this.handleModeChange('TRANSIT')}>
              <i className="fas fa-subway fa-2x"></i>
            </button>
            <button onClick={() => this.handleModeChange('DRIVING')}>
              <i className="fas fa-car fa-2x"></i>
            </button>
            <button onClick={() => this.handleModeChange('BICYCLING')}>
              <i className="fas fa-bicycle fa-2x"></i>
            </button>
            <button onClick={() => this.handleModeChange('WALKING')}>
              <i className="fas fa-child fa-2x"></i>
            </button>
          </div>
        </div>
        <div className="row">
          {this.state.duration && <h3>{this.state.duration} mins</h3>}
          {this.state.distance && <h3>{this.state.distance} km</h3>}
        </div>
        <div className="row">
          <h3>Regular Journey?</h3>
          <input
            name="regular"
            id="regular"
            type="checkbox"
            value="true"
          />
          <input
            name="journeyName"
            id="journeyName"
            type="text"
            placeholder="Journey Name"
            onChange={this.handleNameChange}
          />
          <button className="btn-form" onClick={this.handleSave}>Save Journey</button>
        </div>
        <Youtube />
      </div>
    );
  }
}

export default JourneyNew;
