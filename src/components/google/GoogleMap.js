/* global google */
import React from 'react';

import Axios from 'axios';

import GoogleSearchBar from './GoogleSearchBar';

class GoogleMap extends React.Component {
  state = {
    start: '',
    end: '',
    regular: ''
  }

  componentWillMount() {
    this.bounds = new google.maps.LatLngBounds();
    this.handleChange = this.handleChange.bind(this);
    this.directionsService = new google.maps.DirectionsService();
    this.directionsDisplay = new google.maps.DirectionsRenderer({
      suppressMarkers: true
    });
    this.map;
    this.mapOptions = {
      mapTypeId: 'roadmap'
    };
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
    this[name] = new google.maps.Marker({
      map: this.map,
      position: location,
      animation: google.maps.Animation.DROP
    });
    console.log(`marker func this.${name} ------>`, this[name]);
  }


  handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
    // var selectedMode = document.getElementById('travelType').value;
    var request = {
      origin: this.start.getPosition(),
      destination: this.end.getPosition(),
      travelMode: 'DRIVING'
    };
    this.directionsService.route(request, (response, status) => {
      const routeData = response.routes[0].legs.map(leg => {
        return { distance: leg.distance.value, duration: leg.duration.value };
      }).reduce((aggregate, leg) => {
        aggregate.distance += leg.distance;
        aggregate.duration += leg.duration;
        return aggregate;
      }, { distance: 0, duration: 0 });

      console.log(routeData);
      if (status === google.maps.DirectionsStatus.OK) {
        this.directionsDisplay.setDirections(response);
        this.directionsDisplay.setMap(this.map);
      }
    });

  }

  componentDidMount() {
    this.map = new google.maps.Map(this.mapContainer, {
      center: { lat: 51.51, lng: -0.09 },
      zoom: 12,
      clickableIcons: false
    });
  }

  handleCheck = (e) => {
    const regular = e.target.checked;
    // console.log(regular);
    if(regular) {
      console.log('SAVE ME', regular);
      this.setState({ regular: regular });
      console.log(this.state);
      // Axios
      //   .get(`/api/journeys/${this.props.match.params.id}`)
      //   .then(res => this.setState({ quote: res.data }))
      //   .catch(err => console.log(err));
    }
  }


  render() {
    return (
      <div>
        <div ref={element => this.mapContainer = element} className="google-map"></div>
        <GoogleSearchBar
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          handleCheck={this.handleCheck}
        />
      </div>
    );
  }
}

export default GoogleMap;
