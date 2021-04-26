import React, { Component, Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import LandingPage from '../Components/LandingPage/LandingPage';
import SignUp from '../Components/SignUp/SignUp';
import axios from 'axios';
import Logo from '../../public/logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/sign-up" exact component={SignUp} />
        </Switch>
      </Fragment>
    );
  }
}

export default App;
