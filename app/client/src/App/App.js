import React, { Component, Fragment, useContext } from 'react';
import Router from '../Router/Router';
import axios from 'axios';
import './App.css';
axios.defaults.withCredentials = true;
import { AuthContextProvider } from '../context/AuthContext';

function App() {
  return (
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  );
}

export default App;
