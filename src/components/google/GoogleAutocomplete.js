/* global google */
import React from 'react';

class GoogleAutocomplete extends React.Component {

  componentDidMount() {
    this.autocomplete = new google.maps.places.Autocomplete(this.input);

    this.autocomplete.addListener('place_changed', () => {
      // console.log('autocomplete', this.autocomplete.getPlace());
      const place = this.autocomplete.getPlace();

      // console.log(place);

      // const address = place.adr_address.replace(/<\/?[^>]+(>|$)/g, '');
      const location = place.geometry.location.toJSON();

      // console.log(address);
      console.log(location);
      // const address = this.autocomplete.formatted_address

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
