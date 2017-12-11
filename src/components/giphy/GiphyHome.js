import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class Giphy extends React.Component {
  state = {
    gif: [],
    error: null };


  componentDidMount() {
    axios.get('https://api.giphy.com/v1/gifs/search?api_key=aymi41oOEgJ1V44T5KBXPgyeqAe7074O&q=travel&limit=6&offset=-3&rating=G&lang=en')
      .then(res => {
        this.setState({ gif: res.data.data });
        console.log(this.state.gif);
      })
    // .then( res => console.log(res.data.data))
      .catch(err => this.setState({ error: err.message}));
  }

  render() {
    console.log(this);
    return (
      <div className="container">
        <div className="row">
          {this.state.gif.map(giphy =>{
            return(
              <div key={giphy.id} className="col-lg-4 col-md-4 col-sm-4 col-xs-4 responsive-object">
                <iframe src={giphy.embed_url}></iframe>
              </div>
            );
          })}
        </div>
      </div>

    );
  }
}

export default Giphy;
