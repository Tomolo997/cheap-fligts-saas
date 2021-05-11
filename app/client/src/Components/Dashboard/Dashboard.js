import React, { useState } from 'react';
import '../../App/App.css';
import BurgerNav from '../BurgerNav/BurgerNav';
import DashboardLogo from '../DashboardLogo/DashboardLogo';
export default function Dashboard() {
  return (
    <div className="dashboard">
      <div className="slider">
        <div className="dashboard_slider_header">
          <DashboardLogo />
          <BurgerNav />
        </div>{' '}
        <div className="slider_mainComponents">
          <div>my flights</div>
          <div>Suggestions</div>
          <div>Add a flight</div>
        </div>
        <div className="slider_settings">
          <div>Settings</div>
          <div>Help</div>
          <div>Copyright</div>
        </div>
      </div>
    </div>
  );
}
