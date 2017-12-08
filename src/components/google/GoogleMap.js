/* global google */
import React from 'react';

import GoogleSearchBar from './GoogleSearchBar';

class GoogleMap extends React.Component {
  constructor() {
    super();

    this.state = {
      start: {},
      end: {}
    };

    this.bounds = new google.maps.LatLngBounds();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(location, inputName) {
    // if this.start && this.end
      // envoke function to draw route between two markers





    if (this[inputName]) {
      this.bounds.extend(location);
      this[inputName].setPosition(location);
      return this.map.fitBounds(this.bounds);
    }

    this.setState({ [inputName]: location });
    this.bounds.extend(location);

    inputName === 'start' ?
      this.placeMarker(this.state.start, inputName)
      :
      this.placeMarker(this.state.end, inputName);

    this.map.fitBounds(this.bounds);
  }

  placeMarker(location, name) {
    if (name === 'start') {
      this.start = new google.maps.Marker({
        map: this.map,
        position: location,
        animation: google.maps.Animation.DROP
      });
    } else {
      this.end = new google.maps.Marker({
        map: this.map,
        position: location,
        animation: google.maps.Animation.DROP
      });
    }
  }


  handleSubmit() {

  }

  componentDidMount() {
    this.map = new google.maps.Map(this.mapContainer, {
      center: { lat: 51.51, lng: -0.09 },
      zoom: 14,
      clickableIcons: false
    });
  }

  render() {
    return (
      <div>
        <div ref={element => this.mapContainer = element} className="google-map"></div>
        <GoogleSearchBar
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

export default GoogleMap;
