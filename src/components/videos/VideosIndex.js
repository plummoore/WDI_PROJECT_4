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
  }

  render(){
    return(
      <div className="row">
        <h1>SAVED VIDEOS</h1>
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
    );
  }
}

export default VideosIndex;
