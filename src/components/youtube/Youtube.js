import React from 'react';
import Axios from 'axios';

import Auth from '../../lib/Auth';

class Youtube extends React.Component {
  state = {
    videos: [],
    savedVideos: this.props.savedVideos,
    videoSearchTerm: this.props.videoSearchTerm,
    numberOfResults: 8,
    numberOfRecalls: 0
  }

  getSearches = () => {
    Axios
      .get(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCAuUUnT6oDeKwE6v1NGQxug&maxResults=${this.state.numberOfResults}&order=viewCount&q=${this.state.videoSearchTerm}&type=video&videoDuration=medium&videoEmbeddable=true&fields=items%2CpageInfo%2CprevPageToken%2CregionCode&key=AIzaSyAb3g7hxT7yujlkyViY5Knkk6aTTpRGRhQ`)
      .then(res => {
        console.log(this.state.savedVideos);
        console.log('SEARCH TERM', this.state.videoSearchTerm);
        const savedVideosIds = this.state.savedVideos.map(video => video.videoId);
        const unduplicateVideos = res.data.items.filter(item => !savedVideosIds.includes(item.id.videoId));
        // if unduplicateVideos are less than 4 && numberOfRecalls < 1,
        // set state.numberOfResults to be this.state.numberOfResults * 2, &&
        // set state.numberOfRecalls to be this.state.numberOfResults + 1
        // then recall this.getSearches() (in callback AFTER setting state) ==>
        // this.setState({videos: unduplicateVideos}, () => {
        //    this.getSearches();
        // });
        // else, just set state like below
        this.setState({videos: unduplicateVideos});
      })
      .catch(err => this.setState({ error: err.message}));
  }

  componentDidMount() {
    console.log('youtube getting mounted');
    this.getSearches();
  }

  handleSave = (videoId) => {
    // console.log('this.state BEFORE', this.state);
    const singleVideo = { videoId, archived: false, journey: this.props.journeyId };
    const savedVideos = this.state.savedVideos.concat({ videoId, archived: false, journey: this.props.journeyId });
    // this.setState({ savedVideos });


    Axios
      .post(`/api/journeys/${this.props.journeyId}`, singleVideo, {
        // headers: { 'Authorization': `Bearer ${Auth.getToken()}` }
      })
      .then(() => {
        this.props.handleAddVideos(savedVideos);
        // console.log(res.data);
      })
      .catch(err => console.log(err));
  }

  render() {
    // console.log(this.state.videos);
    return (
      <div className="container">
        <div className="row">
          <h1>YOUTUBE VIDEOS</h1>
          {this.state.videos.map((video) => {
            return (
              <div key={video.etag} className="col-lg-6 col-md-6 col-sm-6">
                <iframe
                  width="100%"
                  height="315"
                  src={`https://www.youtube.com/embed/${video.id.videoId}`}
                  frameBorder="0"
                  allowFullScreen>
                </iframe>
                <button className="icons" onClick={() =>
                  this.handleSave(video.id.videoId)
                }>
                  <i className="fas fa-plus"></i>
                </button>
              </div>
            );
          })
          }
        </div>
      </div>
    );
  }
}

export default Youtube;
