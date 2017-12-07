import React from 'react';
import { Link, withRouter}from 'react-router-dom';

import Auth from '../../lib/Auth';

const MainNav = ({ history }) => {

  function logout(e) {
    e.preventDefault();

    Auth.logout();
    history.push('/');
  }

  return(
    <nav>
      <h1>MAINNAV WORKING</h1>
      { !Auth.isAuthenticated() && <Link to="/register">Register</Link>}
      {' '}
      { !Auth.isAuthenticated() && <Link to="/login">Login</Link>}
      {' '}
      { Auth.isAuthenticated() && <a href="#" onClick={logout}>Logout</a>}
    </nav>
  );
};

export default withRouter(MainNav);
