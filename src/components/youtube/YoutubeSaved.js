import React from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';

import  Auth from '../../lib/Auth';

class Youtube extends React.Component {
  state = {
    videos: [],
    savedVideos: []
  }

  render() {
    // console.log(this.state.videos);
    return (
      <div className="container">
        <div className="row">
          <h1>YOUTUBE SAVED VIDEOS</h1>
        </div>
      </div>
    );
  }
}

export default Youtube;
