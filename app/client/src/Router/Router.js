import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LandingPage from '../Components/LandingPage/LandingPage';
import SignUp from '../Components/SignUp/SignUp';
import Dashboard from '../Components/Dashboard/Dashboard';
import AuthContextProvider from '../context/AuthContext';

export default function Router() {
  const loggedIn = useContext(AuthContextProvider);
  console.log(loggedIn);
  return (
    <Switch>
      <Route path="/" exact component={LandingPage} />
      <Route path="/sign-up" exact component={SignUp} />
      <Route path="/dashboard" exact component={Dashboard} />
    </Switch>
  );
}
