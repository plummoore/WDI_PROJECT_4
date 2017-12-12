import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

import  Auth from '../../lib/Auth';
import  BackButton from '../utility/BackButton';

import GoogleMap from '../google/GoogleMap';
import Youtube from '../youtube/Youtube';

class JourneyShow extends React.Component {
  state = {
    journey: {},
    savedVideos: [],
    videosVisible: false
  }

  componentDidMount(){
    Axios
      .get(`/api/journeys/${this.props.match.params.id}`)
      .then(res => {
        this.setState({ journey: res.data, savedVideos: res.data.savedVideos});
        console.log('SHOWPAGE STATE', this.state.journey, this.state.savedVideos);
      })
      .catch(err => console.log(err));
  }

  handleDelete(){
    Axios
      .delete(`/api/journeys/${this.state.journey.id}`, {
        // headers: { 'Authorization': `Bearer ${Auth.getToken()}` }
      })
      .then(() => this.props.history.push('/'))
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }

  handleVideosVisible = () => {
    this.setState({ videosVisible: true });
  }

  render(){
    console.log('STATE JOURNEY ID------>',this.state.journey.id);
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
            <h4>Saved Videos: {this.state.savedVideos.length} </h4>
            {/* <h4>Videos: {`${savedVideos}`.length} </h4> */}
          </div>
          <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
            <Link to={`/journeys/${this.state.journey.id}/edit`}>
              <button><i className="fas fa-edit"></i></button>
            </Link>
            <button onClick={() => this.handleDelete(this.state.journey.id)}><i className="far fa-trash-alt"></i></button>
          </div>
        </div>
        <div>
          <h2>Saved Videos</h2>
          <div className="row">
            {this.state.savedVideos.map((video) => {
              return (
                <div key={video.id} className="col-lg-6 col-md-6 col-sm-6">
                  <iframe
                    width="100%"
                    height="315"
                    src={`https://www.youtube.com/embed/${video.videoId}`}
                    frameBorder="0"
                    allowFullScreen>
                  </iframe>
                </div>
              );
            })
            }
          </div>
        </div>
        <div className="row">
          <button className="btn-form" onClick={this.handleVideosVisible}>Choose more videos</button>
          {
            this.state.videosVisible
              ? <Youtube
                journeyId={this.state.journey.id}
              />
              : null
          }
        </div>
      </div>
    );
  }
}

export default JourneyShow;
