import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class Youtube extends React.Component {
  state = {
    videos: [],
    savedVideos: []
  }


  componentDidMount() {
    axios
      .get('https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCAuUUnT6oDeKwE6v1NGQxug&maxResults=8&order=viewCount&q=all&type=video&videoDuration=medium&videoEmbeddable=true&fields=items%2CpageInfo%2CprevPageToken%2CregionCode&key=AIzaSyAb3g7hxT7yujlkyViY5Knkk6aTTpRGRhQ')
      .then(res => {
        // console.log(res.data.items);
        this.setState({videos: res.data.items});
        // console.log(this.state.videos);
      })
      .catch(err => this.setState({ error: err.message}));
  }

  handleSave = (e) => {
    console.log('this.state BEFORE', this.state);
    const addedVideos = this.state.savedVideos.slice();
    addedVideos.push(e);
    this.setState({ savedVideos: addedVideos });
    console.log('this.state AFTER',this.state);
    // this.setstate({ savedVideos: e});
    // console.log(this.state.savedVideos);

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
                <button onClick={() => this.handleSave(video.id.videoId)}><i className="fas fa-plus"></i></button>
                {/* <p>{video.snippet.title}</p>
                <p>{video.snippet.description}</p> */}
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
