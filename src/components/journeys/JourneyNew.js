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
    videosVisible: false,
    videos: []
  }

  componentWillMount() {
    this.handleLocationChange = this.handleLocationChange.bind(this);
  }

  componentDidMount(){}

  handleLocationChange = (location, inputName) => {
    this.setState({ [inputName]: location });
    console.log(this.state);
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
      this.setState({ regular: true, name: e.target.value, image: e.target.value });
  }

  handleImageChange = (e) => {
    const journeyData = e.target.value;
    if(journeyData)
      this.setState({ image: e.target.value });
  }

  handleSave = () => {
    console.log('ON SAVE', this.state);
    const {userId} = Auth.getPayload();
    Axios
      .post(`/api/users/${userId}/journeys`, this.state, {
        // headers: { 'Authorization': `Bearer ${Auth.getToken()}` }
      })
      .then(res => {
        console.log(res.data.id);
        console.log('JOURNEY ID', this.state.id);
        this.props.history.push(`/journeys/${res.data.id}`);
      })
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }

  render(){
    return(
      <div>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <GoogleMap
              start={this.state.start}
              end={this.state.end}
              mode={this.state.mode}
              handleRouteData={this.handleRouteData}
            />
            <GoogleSearchBar
              handleLocationChange={this.handleLocationChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <h4>Mode of travel:</h4>
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
          <div className="journey-data col-lg-2 col-md-2 col-sm-4 col-xs-4">
            <h3>Duration: {this.state.duration} mins</h3>
          </div>
          <div className="journey-data col-lg-2 col-md-2 col-sm-4 col-xs-4">
            <h3>Distance: {this.state.distance} km</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <h4>Journey Name:</h4>
            <input
              name="journeyName"
              id="journeyName"
              type="text"
              placeholder="Enter name"
              onChange={this.handleNameChange}
            />
            <h4>Journey Image:</h4>
            <input
              name="journeyImage"
              id="journeyImage"
              type="text"
              placeholder="Choose image"
              onChange={this.handleImageChange}
            />
            <button className="btn-form save-journey" onClick={this.handleSave}>Save Journey & See Videos</button>
          </div>
        </div>
        {
          this.state.videosVisible
            ? <Youtube />
            : null
        }
      </div>
    );
  }
}

export default JourneyNew;
