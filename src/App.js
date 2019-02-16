import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const one = () => <div>One</div>;
const two = () => <div>two</div>;
const three = () => <div>three</div>;

class App extends Component {
  render() {
    return (
      <Router>
        <div className="">
          <header className="container py-4 bg-grey-light">
            <div className="flex justify-between ">
              <div>Logo</div>
              <div>
                <Link to="/one">
                  <div className="inline-block">One</div>
                </Link>
                <Link to="/two">
                  <div className="inline-block">Two</div>
                </Link>
                <Link to="/three">
                  <div className="inline-block">Three</div>
                </Link>
                <button>Login</button>
              </div>
            </div>
          </header>
          <Route path="/one" component={one} />
          <Route path="/two" component={two} />
          <Route path="/three" component={three} />
        </div>
      </Router>
    );
  }
}

export default App;
