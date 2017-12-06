import React from 'react';
import { Link, withRouter}from 'react-router-dom';


const MainNav = () => {
  return(
    <nav>
      <h1>MAINNAV WORKING</h1>
      <Link to="/register">Register</Link>
    </nav>
  );
};

export default withRouter(MainNav);
