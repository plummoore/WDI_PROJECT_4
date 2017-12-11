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
        console.log(res.data);
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
          </div>
        </div>
        <div className="row">
          {this.state.journeys.map(journey =>
            <div className="col-sm-6 col-md-4 col-lg-4" key={journey.id}>
              <div className="tile">
                <Link to={`/journeys/${journey.id}`}>
                  <h1>{journey.name}</h1>
                </Link>
                <p>{journey.mode}</p>
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }
}

export default UserJourneysIndex;
