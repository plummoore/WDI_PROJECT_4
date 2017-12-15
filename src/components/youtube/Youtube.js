import React from 'react';
import Axios from 'axios';

import Auth from '../../lib/Auth';

class Youtube extends React.Component {
  state = {
    youtubeSearchResults: [],
    videos: this.props.videos,
    allChosenVideos: [],
    videoSearchTerm: this.props.videoSearchTerm,
    numberOfResults: 50,
    numberOfRecalls: 0,
    message: null,
    videoDuration: '',
    displayedVideos: 12
  }

  checkDuration = () => {
    if (this.props.journeyDuration < 4 ) {
      return 'short';
    } else if (this.props.journeyDuration > 4 && this.props.journeyDuration < 20) {
      return 'medium';
    } else if (this.props.journeyDuration > 20){
      return 'long';
    }
  }

  getSearches = () => {
    Axios
      .get(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCAuUUnT6oDeKwE6v1NGQxug&maxResults=${this.state.numberOfResults}&videoDuration=${this.state.videoDuration}&q=${this.state.videoSearchTerm}&type=video&videoEmbeddable=true&fields=items%2CpageInfo%2CprevPageToken&key=AIzaSyAb3g7hxT7yujlkyViY5Knkk6aTTpRGRhQ`)
      .then(res => {
        console.log(this.state.videoSearchTerm);
        const videosIds = this.state.videos.map(video => video.videoId);
        const unduplicateVideos = res.data.items.filter(item => !videosIds.includes(item.id.videoId));

        this.setState({youtubeSearchResults: unduplicateVideos}, () => {

          if (this.state.youtubeSearchResults.length === 0) {
            this.setState({message: 'no results from this search, please try again'});
          } else {
            this.setState({message: '' });
          }
        });
      })
      .catch(err => this.setState({ error: err.message}));
  }

  componentDidMount() {
    const videoDuration = this.checkDuration();

    this.setState({ videoDuration  }, () => {
      this.getSearches();
    });
  }

  handleSave = (videoId) => {
    const chosenVideo = { videoId, archived: false, journey: this.props.journeyId, duration: this.state.videoDuration };
    const allChosenVideos = this.state.videos.concat([chosenVideo]);

    const allChosenVideosIds = allChosenVideos.map(video => video.videoId);
    const youtubeSearchResults = this.state.youtubeSearchResults.filter(video => !allChosenVideosIds.includes(video.id.videoId));

    console.log('ALL OF THE CHOSEN VIDEOS', allChosenVideos);

    this.setState({allChosenVideos, youtubeSearchResults});

    Axios
      .post(`/api/journeys/${this.props.journeyId}`, chosenVideo, {
        headers: { 'Authorization': `Bearer ${Auth.getToken()}` }
      })
      .then(res => {
        console.log('whats the response', res.data);
        const videos = this.props.videos.concat(res.data);
        console.log('these are the videos we send back to journey', videos);
        this.props.handleAddVideos(videos);
      })
      .catch(err => console.log(err));
  }

  handleLoadMore = () => {
    const displayedVideos = this.state.displayedVideos + 12;
    this.setState({ displayedVideos });
  }

  render() {
    console.log('THIS.PROPS.VIDEOS', this.props.videos);
    const showableVideos = this.state.youtubeSearchResults.slice(0, this.state.displayedVideos);

    let loadMore = false;
    if (this.state.youtubeSearchResults.length > this.state.displayedVideos) loadMore = true;

    return (
      <div className="row youtube-row">
        {showableVideos.map((video) => {
          return (
            <div key={video.etag} className="col-lg-6 col-md-6 col-sm-6">
              <iframe
                width="100%"
                height="315"
                src={`https://www.youtube.com/embed/${video.id.videoId}`}
                frameBorder="0"
                allowFullScreen>
              </iframe>
              <button className="icons-add" onClick={() =>
                this.handleSave(video.id.videoId)
              }>
                <i className="fas fa-plus"></i>
              </button>
            </div>
          );
        })
        }
        {this.state.message && <h2 className="search-message">{this.state.message}</h2>}
        {loadMore && <button className="loadmore-btn" onClick={this.handleLoadMore}>Load More</button>}

      </div>
    );
  }
}

export default Youtube;
