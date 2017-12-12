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
        console.log(this.state.journey)
      })
      .catch(err => console.log(err));
  }

  handleDelete(){
    // <button onClick={() => this.handleModeChange('TRANSIT')}>
    //   <i className="fas fa-subway fa-2x"></i>
    // </button>

    Axios
      .delete(`/api/journeys/${this.state.journey.id}`, {
        // headers: { 'Authorization': `Bearer ${Auth.getToken()}` }
      })
      .then(() => this.props.history.push('/'))
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }

  render(){
    console.log('STATE JOURNEY ID------>',this.state.journey.id);
    const savedVideos = this.state.journey.savedVideos;
    return(
      <div>
        {this.state && <BackButton />}
        <h1>{this.state.journey.name}</h1>

        <GoogleMap
          start={this.state.journey.start}
          end={this.state.journey.end}
          mode={this.state.journey.mode}
        />
        <div className="row">
          <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
            <h4>Travel Mode: {this.state.journey.mode}</h4>
            <h4>Duration: {this.state.journey.duration} mins</h4>
            <h4>Distance: {this.state.journey.distance} km</h4>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
            <h4>Videos: {`${savedVideos}`.length} </h4>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
            <Link to={`/journeys/${this.state.journey.id}/edit`}>
              <button><i className="fas fa-edit"></i></button>
            </Link>
            <button onClick={() => this.handleDelete(this.state.journey.id)}><i className="far fa-trash-alt"></i></button>
          </div>
        </div>




        {/* <Youtube /> */}

      </div>
    );
  }
}

export default JourneyShow;
