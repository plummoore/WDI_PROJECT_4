/* global google */
import React from 'react';

class GoogleMap extends React.Component {
  state = {
    start: {
      lat: '',
      lng: ''
    },
    end: {
      lat: '',
      lng: ''
    },
    center: {lat: 48.864716, lng: 2.349014}
  }


  componentDidMount() {
    this.map = new google.maps.Map(this.mapContainer, {
      zoom: 14,
      center: this.props.center
    });

    this.marker = new google.maps.Marker({
      map: this.map,
      position: this.props.center
    });

    this.mapInput = document.getElementById('pac-input');

  }

  componentWillUnmount() {
    this.marker.setMap(null);
    this.marker = null;
    this.map = null;
  }

  render() {
    if (this.mapInput) {
      this.mapInput.addListener('places_changed', function() {
        console.log('ugirjeo');
        console.log(this.mapInput.getPlaces());
      });
    }

    return (
      <div>
        <div ref={element => this.mapContainer = element} className="google-map"></div>
        <input id="pac-input" type="text" placeholder="starting point" />
      </div>
    );
  }
}

export default GoogleMap;
