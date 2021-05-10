import React, { Component, Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LandingPage from '../Components/LandingPage/LandingPage';
import SignUp from '../Components/SignUp/SignUp';
import Dashboard from '../Components/Dashboard/Dashboard';
import axios from 'axios';
import './App.css';
axios.defaults.withCredentials = true;
class App extends Component {
  render() {
    return (
      <Fragment>
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/sign-up" exact component={SignUp} />
          <Route path="/dashboard" exact component={Dashboard} />
        </Switch>
      </Fragment>
    );
  }
}

export default App;
