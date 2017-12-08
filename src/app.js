import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import MainNav from './components/utility/MainNav';
import Routes from './components/utility/Routes';

import 'bootstrap-css-only';
import './scss/style.scss';


class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="container">
          <header>
            <MainNav />
          </header>
          <main>
            <Routes />
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
