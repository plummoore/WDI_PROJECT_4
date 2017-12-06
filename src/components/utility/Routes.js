import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Register from '../auth/Register';

const Routes = () => {
  return(
    <Switch>
      <Route path="/register" component={Register} />
    </Switch>
  );
};

export default Routes;
