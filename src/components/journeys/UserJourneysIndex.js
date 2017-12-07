import React from 'react';
import Axios from 'axios';
import { Link  } from 'react-router-dom';

import  Auth from '../../lib/Auth';

class UserJourneysIndex extends React.Component {
  state = {
    user: {}
  }

  componentWillMount() {
    const user = Auth.getPayload();
    Axios
      .get(`/api/users/${user.userId}`)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  }

  render(){
    return(
      <section id="wrapper">
        <h1>JOURNEYS USER INDEX WOOOOOO!</h1>
        <Link to="/journeys">Add Journey</Link>
      </section>
    );
  }
}

export default UserJourneysIndex;
