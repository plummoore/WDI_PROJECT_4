import React from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

class MapContainer extends React.Component {

  render() {
    const style={
      width: '100vh',
      height: '100vh'
    };
    if(!this.props.loaded) {
      return <div>Loading...</div>;
    }
    return(
      <div style={style}>
        <Map google={this.props.google} />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyC9LoktW-gd9soq8XC_xb1mYnsL3SL7-jE'
})(MapContainer);
