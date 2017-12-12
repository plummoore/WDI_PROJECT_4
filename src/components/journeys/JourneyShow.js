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
    videosVisible: false,
    videoSearchTerm: ''
  }

  componentDidMount(){
    console.log('componentDidMount mounting');
    Axios
      .get(`/api/journeys/${this.props.match.params.id}`)
      .then(res => {
        // console.log(res.data);
        this.setState({ journey: res.data, savedVideos: res.data.savedVideos});
        // console.log('SHOWPAGE STATE', this.state.journey, this.state.savedVideos);
      })
      .catch(err => console.log(err));
  }

  handleJourneyDelete(){
    Axios
      .delete(`/api/journeys/${this.state.journey.id}`, {
        // headers: { 'Authorization': `Bearer ${Auth.getToken()}` }
      })
      .then(() => this.props.history.push('/'))
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }

  handleVideoDelete(video){
    console.log(video);

    Axios
      .delete(`/api/videos/${video.id}`)
      .then((res) => console.log(res))
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }

  handleVideosVisible = () => {
    this.setState({ videosVisible: true });
  }

  handleAddVideos = (savedVideos) => {
    this.setState({ savedVideos });
  }

  handleVideoSearchTerms = (e) => {
    e.preventDefault();
    this.setState({videoSearchTerm: e.target.value});
    console.log(this.state.videoSearchTerm);
    this.handleVideosVisible();
    console.log(this.state.videosVisible);
  }

  render(){
    // console.log('STATE JOURNEY ID------>',this.state.journey.id);
    return(
      <div>
        <BackButton />
        <h1>{this.state.journey.name}</h1>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <GoogleMap
              start={this.state.journey.start}
              end={this.state.journey.end}
              mode={this.state.journey.mode}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
            <h4><strong>Mode:</strong> {this.state.journey.mode}</h4>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
            <h4><strong>Duration:</strong> {this.state.journey.duration} mins</h4>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
            <h4><strong>Distance:</strong> {this.state.journey.distance} km</h4>
            {/* <h4>Saved Videos: {this.state.savedVideos.length} </h4> */}
            {/* <h4>Videos: {`${savedVideos}`.length} </h4> */}
          </div>
          <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
            <button className="icons" onClick={() => this.handleJourneyDelete(this.state.journey.id)}><i className="far fa-trash-alt"></i></button>
            <Link to={`/journeys/${this.state.journey.id}/edit`}>
              <button className="icons"><i className="fas fa-edit"></i></button>
            </Link>
          </div>
        </div>
        <div>
          <h2>Saved Videos</h2>
          <div className="row">
            {this.state.savedVideos.map((video) => {
              return (
                <div key={video.videoId} className="col-lg-6 col-md-6 col-sm-6">
                  <iframe
                    width="100%"
                    height="315"
                    src={`https://www.youtube.com/embed/${video.videoId}`}
                    frameBorder="0"
                    allowFullScreen>
                  </iframe>
                  <button className="icons"onClick={() => this.handleVideoDelete(video)}><i className="far fa-trash-alt"></i></button>
                  <button className="icons"><i className="fas fa-caret-square-up"></i></button>
                </div>
              );
            })
            }
          </div>
        </div>
        <div className="row">
          {/* <button className="btn-form" onClick={this.handleVideosVisible}>Choose more videos</button> */}
          <form >
            <input
              name="YoutubeSearch"
              id="YoutubeSearch"
              type="text"
              placeholder="search for videos..."
              onChange={this.handleVideoSearchTerms}
            />
          </form>
          {
            this.state.videosVisible
              ? <Youtube
                journeyId={this.state.journey.id}
                savedVideos={this.state.savedVideos}
                handleAddVideos={this.handleAddVideos}
                videoSearchTerm={this.state.videoSearchTerm}
              />
              : null
          }
        </div>
      </div>
    );
  }
}

export default JourneyShow;
