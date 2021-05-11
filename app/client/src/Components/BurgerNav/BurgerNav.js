import React, { useState } from 'react';
import '../../App/App.css';
export default function BurgerNav() {
  const [burger, setBurger] = useState(true);
  const [hamburgerClass, setHamburgerClass] = useState(['container']);
  function toggleBurger() {
    if (burger) {
      let container = 'container change';
      setHamburgerClass((hamburgerClass) => [...hamburgerClass, container]);
    } else {
      let container = 'container ';
      setHamburgerClass((hamburgerClass) => [...hamburgerClass, container]);
    }

    setBurger(!burger);
  }
  return (
    <div className="slider_hamburger">
      <div className={hamburgerClass} onClick={toggleBurger}>
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
      </div>
    </div>
  );
}
