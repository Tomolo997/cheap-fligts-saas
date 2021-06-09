import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import LandingPage from '../Components/LandingPage/LandingPage';
import SignUp from '../Components/SignUp/SignUp';
import Dashboard from '../Components/Dashboard/Dashboard';
import LoginPage from '../Components/LoginPage/LoginPage';
import errorAuthPage from '../Components/errorAuthPage/errorAuthPage';
import AuthContextProvider from '../context/AuthContext';

export default function Router() {
  const { loggedIn } = useContext(AuthContextProvider);
  console.log(loggedIn);
  return (
    <Switch>
      <Route path="/" exact component={LandingPage} />

      {loggedIn === false && (
        <>
          <Route path="/sign-up" exact component={SignUp} />
          <Route path="/login" exact component={LoginPage} />
          <Route path="/dashboard" exact component={errorAuthPage} />
        </>
      )}

      {loggedIn === true && (
        <>
          <Route path="/dashboard" exact component={Dashboard} />
        </>
      )}
    </Switch>
  );
}
