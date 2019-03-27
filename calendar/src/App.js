import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import React, { Component } from 'react';
import './App.css';

import home from './home';
import about from './about';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
        <ul className="nav">
          <li className="nav-item">
            <Link className="nav-link active" to="/">Home</Link>            
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about/">About</Link>
          </li>          
        </ul>
          
        <div className="container d-flex">
          <Route path="/" exact component={home} />
        </div>
          <Route path="/about/" component={about} />
          {/* <Route path="/users/" component={Users} /> */}
        </div>
      </Router>
    );
  }
}

export default App;
