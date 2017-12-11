import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class Youtube extends React.Component {
  state = {
    videos: []
  }


  componentDidMount() {
    axios
    .get('https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCAuUUnT6oDeKwE6v1NGQxug&maxResults=16&order=viewCount&q=comedy&type=video&videoDuration=medium&videoEmbeddable=true&fields=items%2CpageInfo%2CprevPageToken%2CregionCode&key=AIzaSyAb3g7hxT7yujlkyViY5Knkk6aTTpRGRhQ')
      .then(res => {
        console.log(res.data.items);
        this.setState({videos: res.data.items});
        console.log(this.state.videos);
      })
      .catch(err => this.setState({ error: err.message}));
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
