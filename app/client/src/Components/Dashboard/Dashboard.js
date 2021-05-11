import React, { useState, useContext } from "react";
import "../../App/App.css";
import BurgerNav from "../BurgerNav/BurgerNav";
import DashboardLogo from "../DashboardLogo/DashboardLogo";
import AuthContextProvider from "../../context/AuthContext";

export default function Dashboard() {
  const { slider, setSlider } = useContext(AuthContextProvider);
  const thinSlider = (
    <div className="dashboard_hide">
      <div className="slider">
        <div className="dashboard_slider_header">
          <DashboardLogo />
          <BurgerNav />
        </div>{" "}
        <div className="slider_mainComponents" style={{ display: "none" }}>
          <div className="slider_component slider_component_hover">
            {" "}
            <h1 className="slider_component_h1">My flights</h1>
          </div>
          <div className="slider_component slider_component_hover">
            {" "}
            <h1 className="slider_component_h1">Suggestions</h1>
          </div>
          <div className="slider_component slider_component_hover">
            {" "}
            <h1 className="slider_component_h1">Add a flight</h1>
          </div>
        </div>
        <div className="slider_settings" style={{ display: "none" }}>
          <div className="slider_component slider_component_settings">
            <h1 className="slider_component_h1">Settings</h1>
          </div>
          <div className="slider_component slider_component_settings">
            {" "}
            <h1 className="slider_component_h1"> Help</h1>
          </div>
          <div className="slider_component_settings">
            {" "}
            All rights reserved By @TomažOvsenjak
          </div>
        </div>
      </div>
    </div>
  );

  const fatSlider = (
    <div className="dashboard">
      <div className="slider">
        <div className="dashboard_slider_header">
          <DashboardLogo />
          <BurgerNav />
        </div>{" "}
        <div className="slider_mainComponents">
          <div className="slider_component slider_component_hover">
            {" "}
            <h1 className="slider_component_h1">My flights</h1>
          </div>
          <div className="slider_component slider_component_hover">
            {" "}
            <h1 className="slider_component_h1">Suggestions</h1>
          </div>
          <div className="slider_component slider_component_hover">
            {" "}
            <h1 className="slider_component_h1">Add a flight</h1>
          </div>
        </div>
        <div className="slider_settings">
          <div className="slider_component slider_component_settings">
            <h1 className="slider_component_h1">Settings</h1>
          </div>
          <div className="slider_component slider_component_settings">
            {" "}
            <h1 className="slider_component_h1"> Help</h1>
          </div>
          <div className="slider_component_settings">
            {" "}
            All rights reserved By @TomažOvsenjak
          </div>
        </div>
      </div>
    </div>
  );
  return <>{slider ? fatSlider : thinSlider}</>;
}
