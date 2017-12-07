import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Register from '../auth/Register';
import Login from '../auth/Login';
import UserJourneysIndex from '../journeys/UserJourneysIndex';
import JourneyShow from '../journeys/JourneyShow';

const Routes = () => {
  return(
    <Switch>
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/users/:id" component={UserJourneysIndex} />
      <Route exact path="/" component={UserJourneysIndex} />
      <Route exact path="/journey/:id" component={JourneyShow} />
    </Switch>
  );
};

export default Routes;
