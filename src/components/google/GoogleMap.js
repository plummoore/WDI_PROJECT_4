import React from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

import MapContainer from '../google/GoogleMap';

class Map extends React.Component {

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.google !== this.props.google) {
      this.loadMap();
    }
  }

  loadMap(){
    if(this.props && this.props.google) {
      const {google} = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapref);

    }
  }
  render() {
    return(
      <div>
        <h1>test</h1>
      </div>
    );
  }
}

export default Map;
