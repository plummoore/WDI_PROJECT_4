import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class Giphy extends React.Component {
  state = {
    gif: [],
    error: null };


  componentDidMount() {
    axios.get('https://api.giphy.com/v1/gifs/search?api_key=aymi41oOEgJ1V44T5KBXPgyeqAe7074O&q=travel&limit=6&offset=6&rating=G&lang=en')
      .then(res => {
        this.setState({ gif: res.data.data });
      })
      .catch(err => this.setState({ error: err.message}));
  }

  render() {
    return (
      <div className="row">
        {this.state.gif.map(giphy =>{
          return(
            <div key={giphy.id} className="col-lg-4 col-md-4 col-sm-6 col-xs-6">
              <img src={giphy.images.downsized.url} height="150" width="150" className="gif"/>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Giphy;
