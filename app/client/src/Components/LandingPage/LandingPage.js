import React, { Fragment } from 'react';
import Example from '../Example/Example';
import Pricing from '../Pricing/Pricing';
import AboutSection from '../AboutSection/AboutSection';
import Navbar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import Contact from '../Contact/Contact';
import '../../App/App.css';
const LandingPage = () => {
  return (
    <div className="App">
      <Navbar className="NavBar" />
      <AboutSection className="AboutSection" />
      <Example />
      <Pricing />
      <Contact />
      <Footer />
    </div>
  );
};

export default LandingPage;
