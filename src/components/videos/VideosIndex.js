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
      .get(`/api/users/${this.props.match.params.id}/allvideos`)
      .then(res => {
        this.setState({ saved: res.data.savedVideos, archived: res.data.archivedVideos });
        console.log(res);
      })
      .catch(err => console.log(err));
  }

  handleToggleShow = (toggle) => {
    this.setState({ shownVideos: this.state[toggle]});
    console.log(toggle);
  }

  handleSort = (e) => {
    console.log(e);
    const [sortBy, sortDirection] = e.target.value.split('|');
    console.log(sortBy, sortDirection);
    this.setState({ sortBy, sortDirection});
    console.log(this.state);
  }

  render(){
    return(
      <div>
        <div className="row">
          {/* <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6"> */}
          <SearchBar
            handleFilter={this.handleSort}
            handleToggleShow={this.handleToggleShow}
          />
          {/* </div> */}
          {/* <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <button className="btn-form" onClick={() => this.toggleShow('saved')}>Saved</button>
            <button className="btn-form" onClick={() => this.toggleShow('archived')}>Archived</button>
          </div> */}
        </div>
        <div className="row">
          {this.state.shownVideos.map((video) => {
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
