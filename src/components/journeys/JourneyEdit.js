/* global google */
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

  componentWillMount() {
    this.handleLocationChange = this.handleLocationChange.bind(this);
  }

  componentDidMount(){
    Axios
      .get(`/api/journeys/${this.props.match.params.id}`)
      .then(res => {
        console.log('RES DATA--->', res.data);
        this.setState({ journey: res.data });
      })
      .catch(err => console.log(err));
  }

  handleLocationChange = (location, inputName) => {
    this.setState({ [inputName]: location });
    console.log('HANDLE LOCATION CHANGE--->', this.state);
  }

  handleModeChange = (value) => {
    this.setState({ mode: value });
    console.log('HANDLE MODE CHANGE--->', this.state);
  }

  //GOOGLE MAPS TO UPDATE HERE TO DRAW NEW ROUTE ON MAP...
  // start={this.state.journey.start}
  // end={this.state.journey.end}
  // mode={this.state.journey.mode}

  handleRouteData = (duration, distance) => {
    this.setState({ duration: duration, distance: distance });
  }

  handleNameChange = (e) => {
    const journeyData = e.target.value;
    if(journeyData)
      this.setState({ regular: true, name: e.target.value,  videosVisible: true });
    console.log('HANDLE NAME CHANGE--->', this.state);
  }

  handleSave = () => {
    console.log('ON SAVE', this.state);
    Axios
      .put(`/api/journeys/${this.props.match.params.id}`, this.state, {
        // headers: { 'Authorization': `Bearer ${Auth.getToken()}` }
      })
      .then(() => this.props.history.push('/'))
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }

  render() {
    console.log('IN RENDER', this.state.journey);
    return(
      <div>
        {this.state && <BackButton />}
        <h1>{this.state.journey.name}</h1>

        <GoogleMap
          start={this.state.journey.start}
          end={this.state.journey.end}
          mode={this.state.journey.mode}
        />
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <h3>Name:
              <input
                name="journeyName"
                id="journeyName"
                type="text"
                placeholder={this.state.journey.name}
                onChange={this.handleNameChange}
              /></h3>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <GoogleSearchBar
              handleLocationChange={this.handleLocationChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <h3>Duration: {this.state.journey.duration} mins</h3>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <h3>Distance: {this.state.journey.distance} km</h3>
          </div>
        </div>
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
        <button className="btn-form save-journey" onClick={this.handleSave}>Save Journey</button>
      </div>
    );
  }
}

export default JourneyEdit;
