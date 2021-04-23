import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from '../Components/NavBar/NavBar';
import AboutSection from "../Components/AboutSection/AboutSection"
import Footer from "../Components/Footer/Footer"
import Example from "../Components/Example/Example"
import Pricing from "../Components/Pricing/Pricing"
import Contact from "../Components/Contact/Contact"
import axios from 'axios';
import Logo from '../../public/logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <AboutSection /> 
        <Example/>
        <Pricing/>
        <Contact/>
        <Footer/>
      </div>

    );
  }
}

export default App;
