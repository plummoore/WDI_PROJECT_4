import React from 'react';
import Axios from 'axios';
import { Link  } from 'react-router-dom';

import  Auth from '../../lib/Auth';

class UserJourneysIndex extends React.Component {
  state = {
    user: {},
    journeys: []
  }

  componentWillMount() {
    const user = Auth.getPayload();
    Axios
      .get(`/api/users/${user.userId}`)
      .then(res => {
        this.setState({ user: res.data, journeys: res.data.journeys });
      })
      .catch(err => console.log(err));
  }

  render(){
    return(
      <section id="wrapper">
        <div className="row pagebanner">
          <div className="col-sm-6 col-md-6 col-lg-6">
            <div className="show-img" style = {{backgroundImage: `url(${this.state.user.image})`}}></div>
          </div>
          <div className="col-sm-6 col-md-8 col-lg-8">
            <h1>{this.state.user.username}</h1>
            <h1><Link to={`/users/${this.state.user.id}/journeys/new`}>Add Journey</Link></h1>
            <h3><Link to={`/users/${this.state.user.id}/allvideos`}>View all videos</Link></h3>
          </div>
        </div>
        <div className="row">
          {this.state.journeys.map(journey =>
            <div className="col-sm-6 col-md-3 col-lg-3" key={journey.id}>
              <Link to={`/journeys/${journey.id}`}>
                <div className="tile grow" style = {{backgroundImage: `url(${journey.image})`}}>
                  <h2 className="tile-info">{journey.name}</h2>
                </div>
              </Link>
            </div>
          )}
        </div>
      </section>
    );
  }
}

export default UserJourneysIndex;
