import React from 'react';
import { Link, withRouter}from 'react-router-dom';

import Auth from '../../lib/Auth';

const MainNav = ({ history, user }) => {

  function logout(e) {
    e.preventDefault();

    Auth.logout();
    history.push('/');
  }

  return(
    <div className="row">
      <nav className="nav-bar">
        { Auth.isAuthenticated() && <Link to="/" className="main-btn">Home</Link>}
        {' '}
        { !Auth.isAuthenticated() && <Link to="/register" className="main-btn">Register</Link>}
        {' '}
        { !Auth.isAuthenticated() && <Link to="/login" className="main-btn">Login</Link>}
        {' '}
        { Auth.isAuthenticated() && <a href="#" className="main-btn" onClick={logout}>Logout</a>}
      </nav>
    </div>
  );
};

export default withRouter(MainNav);
