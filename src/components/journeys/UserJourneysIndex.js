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
        <h1>JOURNEYS USER INDEX WOOOOOO!</h1>
        <Link to="/journeys">Add Journey</Link>
        <h1>{this.state.user.username}</h1>
        <div className="show-img" style = {{backgroundImage: `url(${this.state.user.image})`}}></div>
        {this.state.journeys.map(journey =>
          <div key={journey.id}>
            <Link to={`/journeys/${journey.id}`}>
              <h1>{journey.name}</h1>
            </Link>
            <p>{journey.route.mode}</p>
          </div>
        )}
      </section>
    );
  }
}

export default UserJourneysIndex;
