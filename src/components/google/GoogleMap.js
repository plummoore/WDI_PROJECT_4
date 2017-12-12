/* global google */
import React from 'react';

class GoogleMap extends React.Component {
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer({ suppressMarkers: true });
  bounds            = new google.maps.LatLngBounds();
  routeHasBeenDrawn = false;

  componentWillUpdate(nextProps) {
    if(Object.keys(nextProps.start).length !== 0) this.placeMarker(nextProps.start, this.start);
    if(Object.keys(nextProps.end).length !== 0) this.placeMarker(nextProps.end, this.end);
    if(nextProps.mode !== this.props.mode) this.routeHasBeenDrawn = false;
  }

  componentDidUpdate() {
    if(Object.keys(this.props.start).length !== 0 && Object.keys(this.props.end).length !== 0 && this.props.mode && !this.routeHasBeenDrawn) this.drawRoute(this.props.mode);
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

    this.routeHasBeenDrawn = true;

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
        console.log('STATUS', status);
        this.directionsDisplay.setDirections(response);
        this.directionsDisplay.setMap(this.map);
        this.directionsDisplay.setOptions( { suppressMarkers: true } );
        if(this.props.handleRouteData) this.props.handleRouteData(duration, distance);
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
