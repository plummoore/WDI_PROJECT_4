import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

import  Auth from '../../lib/Auth';
import  BackButton from '../utility/BackButton';

import GoogleMap from '../google/GoogleMap';
import Youtube from '../youtube/Youtube';

class JourneyShow extends React.Component {
  state = {
    journey: {}
  }

  componentDidMount(){
    Axios
      .get(`/api/journeys/${this.props.match.params.id}`)
      .then(res => {
        this.setState({ journey: res.data});
        console.log(this.state.journey);
      })
      .catch(err => console.log(err));
  }

  handleDelete(){
    console.log(this);

    // <button onClick={() => this.handleModeChange('TRANSIT')}>
    //   <i className="fas fa-subway fa-2x"></i>
    // </button>

    Axios
      .delete(`/api/journeys/${this.state.journey.id}`, {
        // headers: { 'Authorization': `Bearer ${Auth.getToken()}` }
      })
      .then(() => this.props.history.push('/'))
      .catch(err => console.log(err));
  }

  render(){
    return(
      <div>
        {this.state && <BackButton />}
        <h1>{this.state.journey.name}</h1>
        <GoogleMap
          start={this.state.journey.startLocation}
          end={this.state.journey.endLocation}
          mode={this.state.journey.mode}
        />
        <Link to={`/journeys/${this.state.journey.id}/edit`}>
          <button className="btn-form">Edit journey</button>
        </Link>
        <button onClick={() => this.handleDelete(this.state.journey.id)}><i className="far fa-trash-alt"></i></button>
        <Youtube />
      </div>
    );
  }
}

export default JourneyShow;
