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
    regular: '',
    videosVisible: false
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
    this.setState({ duration: duration, distance: distance });
  }

  handleNameChange = (e) => {
    const journeyData = e.target.value;
    if(journeyData)
      this.setState({ regular: true, name: e.target.value,  videosVisible: true });
  }

  handleSave = () => {
    console.log('ON SAVE', this.state);
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
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <h4>Mode of travel</h4>
            <button className="travel-mode" onClick={() => this.handleModeChange('TRANSIT')}>
              <i className="fas fa-subway fa-2x"></i>
            </button>
            <button className="travel-mode" onClick={() => this.handleModeChange('DRIVING')}>
              <i className="fas fa-car fa-2x"></i>
            </button>
            <button className="travel-mode" onClick={() => this.handleModeChange('BICYCLING')}>
              <i className="fas fa-bicycle fa-2x"></i>
            </button>
            <button className="travel-mode" onClick={() => this.handleModeChange('WALKING')}>
              <i className="fas fa-child fa-2x"></i>
            </button>
          </div>
        </div>
        <div className="row">
          <div className="journey-data col-lg-4 col-md-4 col-sm-5 col-xs-5">
            <h3>Duration: {this.state.duration} mins</h3>
          </div>
          <div className="journey-data col-lg-4 col-md-4 col-sm-5 col-xs-5">
            <h3>Distance: {this.state.distance} km</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <h4>Journey name</h4>
            <input
              name="journeyName"
              id="journeyName"
              type="text"
              placeholder="Enter name"
              onChange={this.handleNameChange}
            />
            <button className="btn-form save-journey" onClick={this.handleSave}>Save Journey</button>
          </div>
        </div>
        {/* {
          this.state.videosVisible
            ? <Youtube />
            : null
        } */}
      </div>
    );
  }
}

export default JourneyNew;
