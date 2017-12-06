import React from 'react';
import { Link, withRouter}from 'react-router-dom';


const MainNav = () => {
  return(
    <nav>
      <Link to='/register'>Register</Link>
    </nav>
  );
};

export default withRouter(MainNav);
