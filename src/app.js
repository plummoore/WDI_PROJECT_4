import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import MainNav from './components/utility/MainNav';
// import Routes from './components/utility/Routes';

import 'bootstrap-css-only';


class App extends React.Component {

  render() {
    return (
      <Router>
        <div className="container">
          <header>
            <h1>WDI Project 4: MERN Stack App</h1>
            <MainNav />
          </header>
          <main>

          </main>
        </div>
      </Router>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
