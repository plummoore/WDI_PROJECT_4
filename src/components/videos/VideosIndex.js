import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import  Auth from '../../lib/Auth';
import  BackButton from '../utility/BackButton';

import SearchBar from './VideosSearchBar';

class VideosIndex extends React.Component {
  state = {
    shownVideos: [],
    saved: [],
    archived: [],
    sortBy: 'duration',
    sortDirection: 'asc'
  }

  componentDidMount(){
    Axios
      .get(`/api/users/${this.props.match.params.id}`)
      .then(res => {

        this.setState({ saved: res.data.savedVideos, archived: res.data.archivedVideos, shownVideos: res.data.savedVideos});
        console.log(res);
      })
      .catch(err => console.log(err));
  }

  handleToggleShow = (toggle) => {
    this.setState({ shownVideos: this.state[toggle]});
    console.log(toggle);
  }

  handleSort = (e) => {
    console.log('hitting', e);
    const [sortBy, sortDirection] = e.target.value.split('|');
    console.log(sortBy, sortDirection);
    this.setState({ sortBy, sortDirection});
    console.log(this.state);
  }

  render(){
    const {sortBy, sortDirection} = this.state;
    const orderedVideos = _.orderBy(this.state.shownVideos, [sortBy], [sortDirection]);
    return(
      <div>
        <div className="row">
          <SearchBar
            handleSort={this.handleSort}
            handleToggleShow={this.handleToggleShow}
          />
        </div>
        <div className="row">
          {orderedVideos.map((video) => {
            return (
              <div key={video.id} className="col-lg-6 col-md-6 col-sm-6">
                <iframe
                  width="100%"
                  height="315"
                  src={`https://www.youtube.com/embed/${video.videoId}?modestbranding=1`}
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
