import React, { Fragment, useRef } from 'react';
import Example from '../Example/Example';
import Pricing from '../Pricing/Pricing';
import AboutSection from '../AboutSection/AboutSection';
import Navbar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import Contact from '../Contact/Contact';
import '../../App/App.css';
const LandingPage = () => {
  const myRefToAbout = useRef(null);
  const myRefToExample = useRef(null);
  const myRefToPricing = useRef(null);
  const myRefToContact = useRef(null);
  const executeScroll = () =>
    myRefToAbout.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const executeScrollToPricing = () =>
    myRefToPricing.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  const executeScrollToContact = () =>
    myRefToContact.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  return (
    <div className="App">
      <Navbar
        executeScroll={executeScroll}
        executeScrollToPricing={executeScrollToPricing}
        executeScrollToContact={executeScrollToContact}
        className="NavBar"
      />
      <AboutSection myRefToAbout={myRefToAbout} className="AboutSection" />
      <Example />
      <Pricing myRefToPricing={myRefToPricing} />
      <Contact myRefToContact={myRefToContact} />
      <Footer />
    </div>
  );
};

export default LandingPage;
