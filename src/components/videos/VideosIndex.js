import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

import  Auth from '../../lib/Auth';
import  BackButton from '../utility/BackButton';

import Youtube from '../youtube/Youtube';

class VideosIndex extends React.Component {
  state = {
    savedVideos: []
  }

  componentDidMount(){
    Axios
      .get(`/api/users/${this.props.match.params.id}/allvideos`)
      .then(res => {
        this.setState({ savedVideos: res.data });
        console.log(res.data);
      })
      .catch(err => console.log(err));


    const allVideos = this.state.savedVideos.map(video => video.archived);
    const archived = allVideos.filter(video => !allVideos.includes(video.archived.true));
    const saved = allVideos.filter(video => !allVideos.includes(video.archived.false));
  }

  handleFilterSaved = () => {
    console.log('FILTER SAVED');
  }

  handleFilterArchived = () => {
    console.log('FILTER ARCHIVED');
  }

  render(){
    return(
      <div>
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <h1>SAVED VIDEOS</h1>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <button className="btn-form" onClick={this.handleFilterSaved}>Saved</button>
            <button className="btn-form" onClick={this.handleFilterArchived}>Archived</button>
          </div>
        </div>
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
    );
  }
}

export default VideosIndex;
