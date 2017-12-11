/* global google */
import React from 'react';

class GoogleMap extends React.Component {
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer({vsuppressMarkers: true });
  bounds            = new google.maps.LatLngBounds();

  componentWillUpdate(nextProps) {
    if(Object.keys(nextProps.start).length !== 0) this.placeMarker(nextProps.start, this.start);
    if(Object.keys(nextProps.end).length !== 0) this.placeMarker(nextProps.end, this.end);

    if(Object.keys(nextProps.start).length !== 0 && Object.keys(nextProps.end).length !== 0 && nextProps.mode) this.drawRoute(nextProps.mode);
  }

  componentDidMount() {
    this.map = new google.maps.Map(this.mapContainer, {
      center: { lat: 51.51, lng: -0.09 },
      zoom: 12,
      clickableIcons: false
    });

    this.start = new google.maps.Marker({ map: this.map });
    this.end   = new google.maps.Marker({ map: this.map });
  }

  placeMarker(location, marker) {
    this.bounds.extend(location);
    marker.setPosition(location);
    this.map.fitBounds(this.bounds);
  }

  drawRoute(mode) {
    const request = {
      origin: this.props.start,
      destination: this.props.end,
      travelMode: mode
    };

    this.directionsService.route(request, (response, status) => {
      const routeData = response.routes[0].legs.map(leg => {
        return { distance: leg.distance.value, duration: leg.duration.value };
      }).reduce((aggregate, leg) => {
        aggregate.distance += leg.distance;
        aggregate.duration += leg.duration;
        return aggregate;
      }, { distance: 0, duration: 0 });

      const duration = (Math.round(routeData.duration/60));
      const distance = (Math.round((routeData.distance /1000)*100)/100);

      if (status === google.maps.DirectionsStatus.OK) {
        this.directionsDisplay.setDirections(response);
        this.directionsDisplay.setMap(this.map);
        this.directionsDisplay.setOptions( { suppressMarkers: true } );
        this.props.handleRouteData(duration, distance);
      }
    });


  }

  render() {
    return (
      <div>
        <div ref={element => this.mapContainer = element} className="google-map"></div>
      </div>
    );
  }
}

export default GoogleMap;

// handleSubmit = (e) => {
//   e.preventDefault();
//   // console.log(e.target);
//   // var selectedMode = document.getElementById('travelType').value;
//   // console.log('START POINT', this.start);
//   // var request = {
//   //   origin: this.start.getPosition(),
//   //   destination: this.end.getPosition(),
//   //   travelMode: 'WALKING'
//   // };
//
//   const startPositions = {
//     lat: this.start.getPosition().lat(),
//     lng: this.start.getPosition().lng()
//   };
//
//   const endPositions = {
//     lat: this.end.getPosition().lat(),
//     lng: this.end.getPosition().lng()
//   };
//
//   console.log('start marker position:', startPositions);
//   console.log('end marker position:', endPositions);
//
// }

// var selectedMode = document.getElementById('travelType').value;
// console.log('START POINT', this.start);
// var request = {
//   origin: this.start.getPosition(),
//   destination: this.end.getPosition(),
//   travelMode: 'WALKING'
// };

// this.directionsService.route(request, (response, status) => {
//   const routeData = response.routes[0].legs.map(leg => {
//     return { distance: leg.distance.value, duration: leg.duration.value };
//   }).reduce((aggregate, leg) => {
//     aggregate.distance += leg.distance;
//     aggregate.duration += leg.duration;
//     return aggregate;
//   }, { distance: 0, duration: 0 });
//
//
//   const duration = (Math.round(routeData.duration/60));
//   const distance = (Math.round((routeData.distance /1000)*100)/100);
//   this.setState({ distance: distance, duration: duration });
//   // console.log(this.state.distance, this.state.duration);
//   if (status === google.maps.DirectionsStatus.OK) {
//     this.directionsDisplay.setDirections(response);
//     this.directionsDisplay.setMap(this.map);
//   }
// });
