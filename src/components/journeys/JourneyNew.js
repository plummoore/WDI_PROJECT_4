import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

import  Auth from '../../lib/Auth';
import  BackButton from '../utility/BackButton';

import GoogleMap from '../google/GoogleMap';
import GoogleSearchBar from '../google/GoogleSearchBar';

class JourneyNew extends React.Component {
  state = {
    start: {},
    end: {},
    mode: '',
    distance: '',
    duration: '',
    regular: ''
  }

  componentWillMount() {
    this.handleLocationChange = this.handleLocationChange.bind(this);
  }

  componentDidMount(){
    // Axios
    //   .post(`/api/journeys/${this.props.match.params.id}`)
    //   .then(res => {
    //     console.log('Journey New request');
    //     // this.setState({ journey: res.data});
    //     // this.setState({start: res.data.route.startCO});
    //   })
    //   .catch(err => console.log(err));
  }

  handleLocationChange = (location, inputName) => {
    this.setState({ [inputName]: location });
  }

  handleModeChange = (value) => {
    this.setState({ mode: value });
  }

  handleRouteData = (duration, distance) => {
    console.log(duration, distance);

    // this.setState({ duration: duration });
    // this.setState({ distance: distance });
  }

  // handleNameChange = (e) => {
  //   const journeyData = e.target.value;
  //   if(journeyData) {
  //     this.setState({ regular: true, name: e.target.value });
  //     console.log(this.state.regular, this.state.name);
  //   }
  // }

  // handleSave = () => {
  //   console.log('hitting save');
  //   // Axios
  //   //   .post('/api/journeys', this.state, {
  //   //   })
  //   //   .then(() => this.props.history.push('/'))
  //   //   .catch(err => this.setState({ errors: err.response.data.errors }));
  // }

  render(){
    return(
      <div>
        <h1>ADDING A JOURNEY</h1>
        <GoogleMap
          start={this.state.start}
          end={this.state.end}
          mode={this.state.mode}
          handleRouteData={this.handleRouteData}
        />
        <GoogleSearchBar
          handleLocationChange={this.handleLocationChange}
        />
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <h3>Mode of travel</h3>
            <button onClick={() => this.handleModeChange('TRANSIT')}>
              <i className="fas fa-subway fa-2x"></i>
            </button>
            <button onClick={() => this.handleModeChange('DRIVING')}>
              <i className="fas fa-car fa-2x"></i>
            </button>
            <button onClick={() => this.handleModeChange('BICYCLING')}>
              <i className="fas fa-bicycle fa-2x"></i>
            </button>
            <button onClick={() => this.handleModeChange('WALKING')}>
              <i className="fas fa-child fa-2x"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default JourneyNew;
