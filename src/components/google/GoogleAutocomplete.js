/* global google */
import React from 'react';

class GoogleAutocomplete extends React.Component {

  componentDidMount() {
    this.autocomplete = new google.maps.places.Autocomplete(this.input);

    this.autocomplete.addListener('place_changed', () => {
      // console.log('autocomplete', this.autocomplete.getPlace());
      const place = this.autocomplete.getPlace();
      const location = place.geometry.location.toJSON();

      this.props.handleChange(location, this.props.name);
    });
  }

  render() {
    return(
      <input ref={element => this.input = element} />
    );
  }
}


export default GoogleAutocomplete;
