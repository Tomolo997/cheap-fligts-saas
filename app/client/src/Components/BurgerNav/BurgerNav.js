import React, { useState, useContext } from 'react';
import '../../App/App.css';
import AuthContextProvider from '../../context/AuthContext';

export default function BurgerNav() {
  const [burger, setBurger] = useState(false);
  const [hamburgerClass, setHamburgerClass] = useState(['container']);
  const { slider, setSlider } = useContext(AuthContextProvider);

  function toggleBurger() {
    if (burger) {
      let container = 'container change';
      setHamburgerClass((hamburgerClass) => [...hamburgerClass, container]);
    } else {
      let container = 'container';
      setHamburgerClass((hamburgerClass) => [...hamburgerClass, container]);
    }

    setBurger(!burger);
    setSlider(!slider);
  }
  const thinSlider = (
    <div className="thin_slider_hamburger">
      <div className={hamburgerClass} onClick={toggleBurger}>
        <div className="bar4"></div>
        <div className="bar5"></div>
        <div className="bar6"></div>
      </div>
    </div>
  );

  const fatSlider = (
    <div className="slider_hamburger">
      <div className={hamburgerClass} onClick={toggleBurger}>
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
      </div>
    </div>
  );
  return <>{slider ? null : null}</>;
}
