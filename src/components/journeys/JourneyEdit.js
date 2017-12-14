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
    journey: {
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
  }

  componentWillMount() {
    this.handleLocationChange = this.handleLocationChange.bind(this);
  }

  componentDidMount(){
    Axios
      .get(`/api/journeys/${this.props.match.params.id}`)
      .then(res => {
        this.setState({ journey: res.data.journey });
      })
      .catch(err => console.log(err));
  }

  handleLocationChange = (location, inputName) => {
    const journey = Object.assign({}, this.state.journey, { [inputName]: location });
    this.setState({ journey });
  }

  handleModeChange = (value) => {
    const journey = Object.assign({}, this.state.journey, { mode: value });
    this.setState({ journey });
  }

  //GOOGLE MAPS TO UPDATE HERE TO DRAW NEW ROUTE ON MAP...
  // start={this.state.journey.start}
  // end={this.state.journey.end}
  // mode={this.state.journey.mode}


  handleRouteData = (duration, distance) => {
    const journey = Object.assign({}, this.state.journey, { duration: duration, distance: distance });
    this.setState({ journey });
  }

  handleNameChange = (e) => {
    // const journeyData = e.target.value;
    // if(journeyData)
    //   this.setState({ regular: true, name: e.target.value,  videosVisible: true });


    const journey = Object.assign({}, this.state.journey, { name: e.target.value });
    this.setState({ journey });
  }

  handleImageChange = (e) => {
    const journey = Object.assign({}, this.state.journey, { image: e.target.value });
    this.setState({ journey });
  }

  handleSave = () => {
    console.log('ON SAVE', this.state);
    Axios
      .put(`/api/journeys/${this.props.match.params.id}`, this.state.journey, {
        // headers: { 'Authorization': `Bearer ${Auth.getToken()}` }
      })
      .then(() => this.props.history.push('/'))
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }

  render() {
    if (!this.state.journey) return null;
    return(

      <div>
        {this.state && <BackButton />}
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            {this.state && <h1>{this.state.journey.name}</h1>}
            <GoogleMap
              handleRouteData={this.handleRouteData}
              start={this.state.journey.start}
              end={this.state.journey.end}
              mode={this.state.journey.mode}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <h3>Journey Name:
              <input
                name="journeyName"
                id="journeyName"
                type="text"
                value={this.state.journey.name}
                onChange={this.handleNameChange}
              /></h3>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <h3>Journey Image:
              <input
                name="journeyImage"
                id="journeyImage"
                type="text"
                value={`${this.state.journey.image}`}
                onChange={this.handleImageChange}
              /></h3>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <div className="edit-journey-img" style = {{backgroundImage: `url(${this.state.journey.image})`}}>
            </div>
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
