import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Auth from '../../lib/Auth';

import Register from '../auth/Register';
import Login from '../auth/Login';
import UserJourneysIndex from '../journeys/UserJourneysIndex';
import JourneyShow from '../journeys/JourneyShow';
import Homepage from '../Home';
import JourneyNew from '../journeys/JourneyNew';
import JourneyEdit from '../journeys/JourneyEdit';

const Routes = () => {
  return(
    <Switch>
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/users/:id/journeys/new" component={JourneyNew} />
      <Route path="/users/:id" component={UserJourneysIndex} />
      <Route path="/journeys/:id/edit" component={JourneyEdit} />
      <Route path="/journeys/:id" component={JourneyShow} />
      {Auth.isAuthenticated() && <Route exact path="/" component={UserJourneysIndex} />}
      {!Auth.isAuthenticated() && <Route exact path="/" component={Homepage} />}
    </Switch>
  );
};

export default Routes;
