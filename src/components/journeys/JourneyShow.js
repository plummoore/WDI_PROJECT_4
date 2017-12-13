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
    loading: false,
    videoSearchTerm: ''
  }


  fetchData() {
    Axios
      .get(`/api/journeys/${this.props.match.params.id}`)
      .then(res => {
        this.setState({ journey: res.data.journey, savedVideos: res.data.savedVideos});
      })
      .catch(err => console.log(err));
  }

  componentDidMount(){

    this.fetchData();
  }

  handleJourneyDelete(){
    Axios
      .delete(`/api/journeys/${this.state.journey.id}`, {
        // headers: { 'Authorization': `Bearer ${Auth.getToken()}` }
      })
      .then(() => this.props.history.push('/'))
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }

  handleVideoDelete = (video) => {
    Axios
      .delete(`/api/videos/${video.id}`)
      .then(() => this.fetchData())
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }

  handleVideoArchive = (video) => {
    Axios
      .put(`/api/videos/${video.id}`, {archived: true})
      .then(() => {
        // this.setState({ archived: true });
        this.fetchData();
      })
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }

  handleVideosVisible = () => {
    if (this.state.videosVisible) {
      this.setState({ videosVisible: false, loading: true }, () => {
        setTimeout(() => {
          this.setState({ videosVisible: true, loading: false });
        }, 50);
      });

    } else {
      this.setState({ videosVisible: true });
    }
  }

  handleAddVideos = (savedVideos) => {
    this.setState({ savedVideos });
  }

  handleVideoSearchChange = ({ target: { value }}) => {
    this.setState({ videoSearchTerm: value });
  }

  handleVideoSearchTerms = (e) => {
    e.preventDefault();
    this.handleVideosVisible();
  }


  handleSearchTag = (videoTag) => {
    this.handleVideosVisible();
    this.setState({videoSearchTerm: videoTag});
  }

  render(){
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
          <div className="col-lg-3 col-md-3 col-sm-3 col-xs-2">
            <h4><strong>Mode:</strong> {this.state.journey.mode}</h4>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
            <h4><strong>Duration:</strong> {this.state.journey.duration} mins</h4>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
            <h4><strong>Distance:</strong> {this.state.journey.distance} km</h4>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-3 col-xs-4">
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
                <div key={video.videoId} className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                  <iframe
                    width="100%"
                    height="315"
                    src={`https://www.youtube.com/embed/${video.videoId}`}
                    frameBorder="0"
                    allowFullScreen>
                  </iframe>
                  <button className="icons" onClick={() => this.handleVideoDelete(video)}><i className="far fa-trash-alt"></i></button>
                  <button className="icons" onClick={() => this.handleVideoArchive(video)}><i className="fas fa-caret-square-up"></i></button>
                </div>
              );
            })
            }
          </div>
        </div>
        <div>
          <h2>Search for videos</h2>
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 video-search">
              <form onSubmit={this.handleVideoSearchTerms}>
                <div className="row">
                  <div className="col-xs-10">
                    <input
                      name="YoutubeSearch"
                      id="YoutubeSearch"
                      type="text"
                      placeholder="search for videos..."
                      onChange={this.handleVideoSearchChange}
                    />
                  </div>
                  <div className="col-xs-2">
                    <button className="search-btn">SEARCH</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <h2>Popluar tags</h2>
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 video-tag-row">
              <button className="video-tag form-btn" onClick={() => this.handleSearchTag('science')}>
                science
              </button>
              <button className="video-tag form-btn" onClick={() => this.handleSearchTag('education')}>
                education
              </button>
              <button className="video-tag form-btn" onClick={() => this.handleSearchTag('comedy')}>
                comedy
              </button>
              <button className="video-tag form-btn" onClick={() => this.handleSearchTag('technology')}>
                tech
              </button>
              <button className="video-tag form-btn" onClick={() => this.handleSearchTag('ecology')}>
                ecology
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 col-md-12">
            {
              this.state.videosVisible
                ? <Youtube
                  journeyId={this.state.journey.id}
                  savedVideos={this.state.savedVideos}
                  handleAddVideos={this.handleAddVideos}
                  videoSearchTerm={this.state.videoSearchTerm}
                  journeyDuration={this.state.journey.duration}
                />
                : null
            }
            { this.state.loading && <div className="loading">Loading...</div>}
          </div>
        </div>
      </div>
    );
  }
}

export default JourneyShow;
